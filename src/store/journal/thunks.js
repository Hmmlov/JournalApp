import {collection, deleteDoc, doc, setDoc} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNote } from '../../helpers';
import { addNewEmptyNote, deleteNodeById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNotes } from './journalSlice';

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

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) );
        await setDoc( newDoc, newNote );

        newNote.id= newDoc.id;


        /* console.log({newDoc, setDocResp}); */

        //dispatch
        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );

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

export const startSaveNote = () => {
    return async(dispatch, getState)=> {

        dispatch(setSaving() );

        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${ note.id }`);
        await setDoc(docRef, noteToFireStore, {merge: true});

        dispatch(updateNotes( note ) );


    }
}

export const startUploadingFiles = (files = []) => {

    return async(dispatch) =>{

        dispatch(setSaving() );

        /* files.forEach(async(file)=> {
            await fileUpload(file);
        }) */
        //todas la imagenes se disparen en secuencia 
        const fileUploadPromises = [];
        /* creando el arreglo de promesas */
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls) );
        
        /* establecerlo en la nota activa  */

        /* await fileUpload( files[0]);       */  

    }

}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {


        const {uid} = getState().auth;
        const {active: note} = getState().journal;
        /* console.log({uid, note}); */

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` );

        await deleteDoc(docRef);

        dispatch( deleteNodeById(note.id) );
    }
}