import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
/* Iconos Material */
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
/* Materials */
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles, updateNotes } from "../../store/journal";
/* Componentes Journal */
import { JournalImageGallery } from "../components";

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector(state => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota Actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles( target.files ) );

  };

  const onDelete = () => {
    dispatch( startDeletingNote() );
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        {/* El InputRef - hace referencia al input para tomar el tipo file */}
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          
          <UploadOutlined />
        </IconButton>
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un Titulo"
          label="Título"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió hoy?"
          name="body"
          value={body}
          onChange={onInputChange}
          minRows={5}
        />
      </Grid>

      <Grid container justifyContent='end'>
          <Button
            onClick={onDelete}
            sx={{mtr:2}}
            color="error"
          >
            <DeleteOutline/>
            Delete
          </Button>
      </Grid>
      {/* Galeria de imagenes */}

      <JournalImageGallery images={note.imageUrls}/>
    </Grid>
  );
};
