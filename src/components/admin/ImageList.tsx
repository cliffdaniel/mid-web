import React from 'react';
import { Grid, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImageListProps {
  images: string[];
  onDelete: (index: number) => void;
}

const ImageList: React.FC<ImageListProps> = ({ images, onDelete }) => {
  return (
    <Grid container spacing={2}>
      {images?.map((image, index) => (
        <Grid item key={index}>
          <Paper elevation={3} className='h-[100px] w-[100px]' style={{ position: 'relative' }}>
            <img src={image} alt={image} className='object-contain w-full h-full' />
            <IconButton
              onClick={() => onDelete(index)}
              style={{ position: 'absolute', top: 5, right: 5, color: '#1976D2' }}
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageList;
