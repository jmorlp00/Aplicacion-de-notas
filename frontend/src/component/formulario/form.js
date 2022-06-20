import { Construction } from '@mui/icons-material';
import React, {Component} from 'react';
import './form.css'

class NoteForm extends Component{
    constructor(){
        super();
        this.addNote = this.addNote.bind(this);
    }

    addNote(){
        this.props.addNota(this.titleInput.value, this.textInput.value);
        this.textInput.value = '';
        this.titleInput.value = '';
        this.textInput.focus();
    }

    render(){
        return (
            <div className='Padre'>
            
            <div className='NoteFormInput'>
                <input 
                ref={input => {this.titleInput = input;}}
                placeholder='Añade el titulo de la nota'
                
                type='text'/>
                <p></p>
                <input 
                ref={input => {this.textInput = input;}}
                placeholder='Añade una nota'
                
                type='text'/>
            </div>
            <div className='NoteForm'>
                <button
                onClick={this.addNote}
                >
                    Add
                </button>
            </div>
            </div>
        );
    }
}

export default NoteForm;