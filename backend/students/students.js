const express = require("express");

const router = express.Router();
router.use(express.json());





const Note = require("../models/Note");
const User = require("../models/User");

router.get("/", async function(req, res){
    const usuarios = await User.find();
    console.log(usuarios);
    return res.status(200).json(usuarios);
});

/*router.get("/", function(req,res){
    let newStudent = req.body.student;
    newStudent.id = Date.now();
    students.push(newStudent);

    return res.json(students);
});*/

router.post("/", async function(req,res){
    var user_name = req.body.name;
    var user_pass = req.body.password;

    const usuario = await User.find({"name": user_name}).limit(1);
    if(usuario.length === 0){
        return res.status(400).json("No existe ese usuario");
    }
    if(usuario[0].password === user_pass){
        return res.status(200).json(usuario[0]);
    }else{
        return res.status(400).json("La contraseña es incorrecta");
    }


});

router.get("/:name", async function(req,res){
    var user_name = req.params.name;

    var passwords = [];
    const usuario = await User.find({"name": user_name});
    if(usuario.length === 0){
        return res.status(400).json("No existe ese usuario");
    }
    for(var i = 0; i < usuario.length; i++){

        passwords[i] = usuario[i].password;
    }
    console.log(passwords);
    return res.status(200).json(passwords);
});
router.get("/:name/Note", async function(req,res){
    
    const notasBaseDeDatos = await Note.find({"usuario":req.params.name});
    if(notasBaseDeDatos.length === 0){
        return res.status(400).json("No existe ese usuario");
    }
    console.log(notasBaseDeDatos)
    return res.status(200).json(notasBaseDeDatos);
});

router.post("/:name/Note", async function(req,res){

    var user_note = req.body.Note;
    var usuario = req.params.name;
 



                const {title, description} = req.body.Note[0];
                const newNota = new Note({ title, description, usuario});
                await newNota.save();
                console.log(newNota);

            return res.status(200).json(newNota._id);

});

router.put("/:name/Note/:note", async function(req,res){
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.note, {title, description});
    return res.status(200).json("Todo correcto");
    
});

router.delete("/:name/Note/:note", async function(req,res){
    await Note.findByIdAndDelete(req.params.note);
    return res.status(200).json("Todo correcto");
});

module.exports = router;