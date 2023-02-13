import {collection, doc, setDoc} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNote } from '../../helpers';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './journalSlice';

// start new note : function
export const startNewNote = () => {
    return async( dispatch, getState) => {
        /* Todo: tarea dispatch */
        dispatch(savingNewNote() );
        const {uid} = getState().auth
        //vamos a guardar el uid del usuario

        const newNote ={
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) )
        const setDocResp = await setDoc( newDoc, newNote );

        newNote.id= newDoc.id;


        /* console.log({newDoc, setDocResp}); */

        //dispatch
        dispatch ( addNewEmptyNote(newNote) );
        dispatch ( setActiveNote(newNote) );

        //dispatch ( activarNote )
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth
        if (!uid) throw new Error('El uid del usuario no Existe');
        const notes = await loadNote( uid );

        dispatch(setNotes(notes) );
    }
}

