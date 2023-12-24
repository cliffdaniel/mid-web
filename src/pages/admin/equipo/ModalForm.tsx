import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  LinearProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import ImageList from '../../../components/admin/ImageList';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireStoreStorage } from "./../../../config/firebase";

interface Member {
  id: string | null;
  name: string;
  lastName: string;
  position: string;
  images: string[]
  createdAt: any;
}

interface ModalFormProps {
  open: boolean;
  member: Member | null;
  onClose: () => void;
  onSubmit: (data: Member) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ open, member, onClose, onSubmit }) => {
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

  const formik = useFormik<Member>({
    initialValues: {
      id: '',
      name: '',
      lastName: '',
      position: '',
      images: [] as string[],
      createdAt: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof Member, string>> = {};

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
    if (member !== null) {
      formik.setValues(member);
      setFiles(member.images);
    }
  }, [member]);

  useEffect(() => {
    if (files) {
      formik.values.images = files;
    }
  }, [files])

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
