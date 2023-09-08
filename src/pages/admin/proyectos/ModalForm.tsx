import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Grid
} from '@mui/material';
import { Uploader } from "uploader";
import { useFormik } from 'formik';

interface Project {
  id: string | null;
  description: string;
  area: string;
  location: string;
  client: string;
  architect: string;
  mutua: string;
  employee: string;
  company: string;
  year: string;
  photography: string;
  images: string[] | null;
}

interface ModalFormProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSubmit: (data: Project) => void;
}

const uploader = Uploader({
  apiKey: "free",
});

const ModalForm: React.FC<ModalFormProps> = ({ open, project, onClose, onSubmit }) => {
  const [files, setFiles] = useState<string[]>([]);

  const formik = useFormik<Project>({
    initialValues: {
      id: '',
      description: '',
      area: '',
      location: '',
      client: '',
      architect: '',
      mutua: '',
      employee: '',
      company: '',
      year: '',
      photography: '',
      images: [] as string[],
    },
    validate: (values) => {
      const errors: Partial<Record<keyof Project, string>> = {};

      if (!values.description) {
        errors.description = 'Campo obligatorio';
      }

      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  const uploadFiles = () => {
    uploader.open({ multi: true }).then(
      (selectedFiles) => {
        if (selectedFiles.length) {
          const fileUrls = selectedFiles.map((file) => file.fileUrl);
          setFiles(fileUrls);
        }
      },
      (error) => alert(error)
    );
  }

  useEffect(() => {
    if (files) {
      formik.values.images = files;
    }
  }, [files])

  useEffect(() => {
    if (project !== null) {
      formik.setValues(project);
    }
  }, [project]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 400,
        }}
      >
        <Typography
          variant="h6"
          style={{ marginBottom: '25px' }}>
            Agregar Proyecto
          </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="description"
                label="Descripción"
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
                error={!!formik.errors.description}
                helperText={formik.errors.description}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="area"
                label="Área"
                fullWidth
                value={formik.values.area || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="location"
                label="Locación"
                fullWidth
                value={formik.values.location || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="client"
                label="Cliente"
                fullWidth
                value={formik.values.client || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="architect"
                label="Arquitecto"
                fullWidth
                value={formik.values.architect || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="mutua"
                label="Mutua"
                fullWidth
                value={formik.values.mutua || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="employee"
                label="Empleado"
                fullWidth
                value={formik.values.employee || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="company"
                label="Compañía"
                fullWidth
                value={formik.values.company || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="year"
                label="Año"
                fullWidth
                value={formik.values.year || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="photography"
                label="Fotografía"
                fullWidth
                value={formik.values.photography || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            <Button
              onClick={uploadFiles}
              style={{ marginLeft: '10px', marginTop: '25px'}}>
              Añadir Imágenes
            </Button>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ backgroundColor: '#1976D2', marginTop: '45px' }}>
            Agregar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
