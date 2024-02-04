import React from 'react';
import { Grid, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';

interface ImageListProps {
  images: string[];
  onDelete: (index: number) => void;
}

const ImageList: React.FC<ImageListProps> = ({ images, onDelete }) => {
  return (
    <Grid container spacing={2} style={{ display: 'flex' }}>
      {images?.map((image, index) => (
        <Grid item key={image} xs={4} sm={2} md={2} lg={2} xl={2}>
          <Paper elevation={3} className='h-[100px] flex-1' style={{ position: 'relative' }}>
            <Image src={image} alt={image} layout="fill" objectFit="cover" />
            <div style={{ position: 'absolute', top: 5, right: 5, borderRadius: '50%', backgroundColor: '#FFFFFF' }}>
              <IconButton
                onClick={() => onDelete(index)}
                style={{ color: '#D21919', padding: '4px' }}
                title='Eliminar'
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageList;
