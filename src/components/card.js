
import React from 'react';
import './card.css'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export default function CardComponent(props) {

  const [state, setState] = React.useState({
    open: false,
  });

  const { open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
    navigator.clipboard.writeText(props.image)
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Card>
      <CardHeader
        title={ props.title }
      />
      <CardMedia
        component="img"
        height={ 0.250*window.innerWidth }
        image={ props.image }
      />
      <CardActions>
        <Checkbox
            icon={<FavoriteBorder style={{ color:'white' }}/>} 
            checkedIcon={<Favorite style={{ color:'#e31b23' }}/>}/>
        <IconButton         
          onClick={ handleClick()} 
          aria-label="share"
        >
          <ContentCopyIcon />
        </IconButton>
        <Snackbar
          className="Snackbar"
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
          message="Copied image link!"
          
        >
          <SnackbarContent 
            style={{color:'white', backgroundColor: 'rgba(255, 255, 255, 0.05)'}}
            message={<span id="client-snackbar"> Copied image link! 🤍</span>}
          />
        </Snackbar>
      </CardActions>
      <CardContent>
        <div style={{ fontSize: '15px', marginBottom: '5px', color:'#dd361cf' }}>
            { props.desc }
        </div>
        <Typography 
            gutterBottom 
            variant="body2" 
            component="div" 
            color="#105bd8">
            { props.name === undefined ? "Public" : props.name } - { props.date }
        </Typography>
      </CardContent>
    </Card>
  );
}
