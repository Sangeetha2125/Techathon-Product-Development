import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Button, Stack } from '@mui/material';

function MemoryCard({memory}){
    const username = JSON.parse(localStorage.getItem('current_user')).name

    return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="recipe">
            {username[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <DeleteIcon />
          </IconButton>
        }
        title={memory.name}
        subheader={memory.date}
      />
      <CardMedia
        component="img"
        height="194"
        image={memory.image_path}
        alt={memory.name}
      />
      <CardContent>
      <Typography>
        {(memory.description).length > 220 ? (memory.description).slice(0, 220) + '...' : (memory.description).slice(0, 100)}
        {(memory.description).length > 220 && <Button variant="text">Read More</Button>}
      </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack direction="row" spacing={1}>
            <LocationOnIcon />
            <Typography>{memory.location}</Typography>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default MemoryCard