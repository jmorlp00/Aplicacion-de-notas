
import React, {Component} from 'react';
import './Notes.css'
import '../component/formulario/form';

import { naxios } from '../utilities';

import Note from '../component/notas/notas';
import NoteForm from '../component/formulario/form';

class notes extends Component {
    
    constructor() {
        super();
        this.state = {
            notes: []
        };

        
        this.addNota = this.addNota.bind(this);

    }

    componentWillMount() {
        var URLactual = window.location;
        console.log(URLactual);
        var usuario = URLactual.pathname.substring(URLactual.pathname.indexOf('/')+1, URLactual.pathname.lastIndexOf('/'))
        console.log(usuario);
        naxios.get("/api/students/"+usuario+"/Note")
        .then(data => {
            let { notes } = this.state;
            for(var i = 0; i < data.data.length; i++){
                    notes.push({
                        noteContent: data.data[i].description,
                        noteTitle: data.data[i].title,
                        noteID: data.data[i]._id
                    });
            
                    
            }
            console.log(data.data);
            this.setState({ notes });
        })
        .catch( (err) =>{console.log(err)});
    }
    eliminarNota=id=>{
        const notes  = this.state.notes.filter(notas=>notas.noteID !== id);
        this.setState({notes:notes});
        
        var URLactual = window.location;
        var usuario = URLactual.pathname.substring(URLactual.pathname.indexOf('/')+1, URLactual.pathname.lastIndexOf('/'));
        console.log(id);
        naxios.delete("/api/students/" + usuario + "/Note/" + id)

    }


    addNota(title,note){
        let { notes } = this.state;
        

        var URLactual = window.location;
        var usuario = URLactual.pathname.substring(URLactual.pathname.indexOf('/')+1, URLactual.pathname.lastIndexOf('/'));
        var description = note;
        naxios.post("/api/students/"+usuario+"/Note", {Note:[{
            "title": title, 
            "description": description}]})
            .then(data => {
                console.log(data.data)
                notes.push({

                    noteID: data.data,
                    noteContent: note,
                    noteTitle: title
                });
        
                this.setState({ notes });
            })

            
    }
    render () {
        return (
            <div className='notasContainer'>
                <div className='notasSuperior'>
                <div className='notasHeader'>
                    <h1>Aplicación de notas</h1>
                    
                </div>
                <div className='notasFormulario'>
                    <NoteForm addNota={this.addNota}/>
                </div>
                </div>
                <div className='notasBody'>
                    
                    {
                        this.state.notes.map(note => {
                            return(
                                <Note 
                                noteContent={note.noteContent} 
                                noteID={note.noteID}
                                noteTitle={note.noteTitle}
                                key={note.noteID}
                                onDelete={this.eliminarNota}
                                />
                            );
                        })
                    }
                    
                </div>
                
            </div>
        );
    }
}

export default notes;