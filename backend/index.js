
const express = require("express");
const cors = require("cors");



const path = require("path");

const connectDB = require("./config/db");

var app = express();
app.use(express.json());
connectDB();

app.get("/api/", function(req, res){
    return res.send("students");
});

app.use("/api/students", require("./students/students"));

app.get("/api/", function(req, res){
    return res.send("Hola Mundo");
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static("../frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, function(){
    console.log("App escuchando puerto " + PORT);
        
});