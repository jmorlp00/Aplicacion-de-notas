import React, {Component} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { naxios } from '../../utilities';

import './notas.css';




class Note extends Component{
    constructor(props){
        super(props);
        this.noteID = props.noteID;
        this.noteContent = props.noteContent;
        this.noteTitle = props.noteTitle;
        this.state = {
            open: false
        }
        this.handleClose = this.handleClose.bind(this);
    }
    

    handleClickOpen = () => {
        this.setState({open: true});
      };
      
    handleClose = () => {
      var URLactual = window.location;
      var usuario = URLactual.pathname.substring(URLactual.pathname.indexOf('/')+1, URLactual.pathname.lastIndexOf('/'));

      var id = this.noteID;

      var title = this.noteTitle;
      var description = this.noteContent;

      console.log(this.state.noteID);

      naxios.put("/api/students/" + usuario + "/Note/" + id, {
        "title": title, 
        "description": description
      });
      this.setState({open: false});
      };

      handleChange= e =>{
        this.noteContent=e.target.value;
      }

      handleChangeTitle= e =>{
        this.noteTitle=e.target.value;
      }
    

    render() {
        return(
            <div className='Note'>
              <h2>{this.noteTitle}</h2>
                <p>{this.noteContent}</p>
                <button onClick={() => this.props.onDelete(this.noteID)}>Delete </button>
                <button onClick={this.handleClickOpen}>Modify</button>
                <Dialog open={this.state.open}  onClose={this.handleClose}>
                <DialogTitle>Modificar nota</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escriba el titulo de la nota
          </DialogContentText>
          <TextField
            
            autoFocus
            margin="dense"
            id="name"
            label="Nota"
            type="email"
            fullWidth
            variant="standard"
            
				    onChange={this.handleChangeTitle}
          />
          <DialogContentText>
            Escriba el contenido de la nota
          </DialogContentText>
          <TextField
            
            margin="dense"
            id="name"
            label="Nota"
            type="email"
            fullWidth
            variant="standard"
            
				    onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Aceptar</Button>
          
        </DialogActions>
      </Dialog>
            </div>
        );
    }
}
/**/
export default Note;