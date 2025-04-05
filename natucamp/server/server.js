const express= require('express');
const app= express();
const mysql= require('mysql');

const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'NatuCamp'
});

app.post('/create',(req,res)=>{
    const idUsuario= req.body.idUsuario;
    const nombre= req.body.nombre;
    const primerAp= req.body.apellido;
    const segundoAp= req.body.segundoApellido;
    const fechaNac= req.body.fechaNacimiento;
    const correo= req.body.correo;
    const celular= req.body.celular;
    const usuario= req.body.usuario;
    const contraseña= req.body.contraseña;
    db.query('INSERT INTO usuario (idUsuario,nombre,primerAp,segundoAp,fechaNac,correo,celular,usuario,contraseña) VALUES (?,?,?,?,?,?,?,?,?)',
    [idUsuario,nombre,primerAp,segundoAp,fechaNac,correo,celular,usuario,contraseña], (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Usuario creado');
        }
    });
})

app.listen(3001,()=>{
    console.log('corriendo loco en 3000')
}); 
