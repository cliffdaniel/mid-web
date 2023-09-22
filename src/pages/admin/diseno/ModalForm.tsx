import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  LinearProgress,
  InputLabel,
  FormControl,
  MenuItem,
  Select
} from '@mui/material';
import { useFormik } from 'formik';
import ImageList from '../../../components/admin/ImageList';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireStoreStorage } from "./../../../config/firebase";
import Project from '@/models/project';

interface ModalFormProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSubmit: (data: Project) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ open, project, onClose, onSubmit }) => {
  const [images, setImages] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (images.length === 0) return;

    setIsUploading(true);

    const uploadedImages: string[] = [];

    for (const image of images) {
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}_${image.name}`;
      const storageRef = ref(fireStoreStorage, `images/${uniqueFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          setIsUploading(false);
        },
        async () => {
          setIsUploading(false);
          const downloadUrl = await getDownloadURL(storageRef);
          uploadedImages.push(downloadUrl);

          if (uploadedImages.length === images.length) {
            console.log('Todas las imágenes se han subido:', uploadedImages);
            setFiles((prevFiles) => (prevFiles ? [...prevFiles, ...uploadedImages] : uploadedImages));
            setImages([]);
          }
        }
      );
    }
  };

  const handleDeleteImage = (indexToDelete: number) => {
    const updatedImages = files?.filter((_, index) => index !== indexToDelete);
    if (updatedImages) {
      setFiles(updatedImages);
    }
  };

  const formik = useFormik<Project>({
    initialValues: {
      id: '',
      name: '',
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
      type: '',
      createdAt: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof Project, string>> = {};

      if (!values.name) {
        errors.name = 'Campo obligatorio';
      }

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

  useEffect(() => {
    if (files) {
      formik.values.images = files;
    }
  }, [files])

  useEffect(() => {
    if (project !== null) {
      formik.setValues(project);
      setFiles(project.images);
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
          minWidth: 600,
          maxHeight: '95vh',
          overflow: 'auto',
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="type">Tipo</InputLabel>
                <Select
                  name="type"
                  label="Tipo"
                  id="type"
                  value={formik.values.type || ''}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="mobiliario">Mobiliario</MenuItem>
                  <MenuItem value="interiores">Interiores</MenuItem>
                  <MenuItem value="stands">Stands</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginBottom: '15px' }}>
                {files && <ImageList images={files} onDelete={handleDeleteImage} />}
              </div>
              <div>
                <input type="file" multiple onChange={handleChangeFile} disabled={isUploading} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={images.length === 0 || isUploading}
                  style={{ backgroundColor: "#1976D2", color: "#fff" }}
                >
                  Subir Imagen
                </Button>
                {isUploading && <LinearProgress variant="determinate" value={progress} style={{ marginTop: '15px' }} />}
              </div>
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
