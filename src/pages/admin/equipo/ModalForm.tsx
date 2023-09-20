import React, { useEffect } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';

interface Project {
  id: string | null;
  name: string;
  lastName: string;
  position: string;
  createdAt: any;
}

interface ModalFormProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSubmit: (data: Project) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ open, project, onClose, onSubmit }) => {
   const formik = useFormik<Project>({
    initialValues: {
      id: '',
      name: '',
      lastName: '',
      position: '',
      createdAt: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof Project, string>> = {};

      if (!values.name) {
        errors.name = 'Campo obligatorio';
      }

      if (!values.lastName) {
        errors.lastName = 'Campo obligatorio';
      }

      if (!values.position) {
        errors.position = 'Campo obligatorio';
      }

      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  useEffect(() => {
    if (project !== null) {
      formik.setValues(project);
    }
  }, [project]);

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
          Agregar Miembro
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="name"
                label="Nombre"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Apellidos"
                fullWidth
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={!!formik.errors.lastName}
                helperText={formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="position"
                label="Cargo"
                fullWidth
                value={formik.values.position}
                onChange={formik.handleChange}
                error={!!formik.errors.position}
                helperText={formik.errors.position}
              />
            </Grid>
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
