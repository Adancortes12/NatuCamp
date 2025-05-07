const express= require('express');
const app= express();
const mysql= require('mysql');
const cors= require('cors');

app.use(cors());
app.use(express.json());    

const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'natucamp'
});

app.post('/create',(req,res)=>{
    const nombre= req.body.nombre;
    const primerAp= req.body.primerAp;
    const segundoAp= req.body.segundoAp;
    const correo= req.body.correo;
    const celular= req.body.celular;
    const usuario= req.body.usuario;
    const contraseña= req.body.contraseña;
    db.query('INSERT INTO usuario (nombre,primerAp,segundoAp,correo,celular,usuario,contraseña) VALUES (?,?,?,?,?,?,?)',
    [nombre,primerAp,segundoAp,correo,celular,usuario,contraseña], (err)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Usuario creado');
        }
    });
})
app.post('/especie',(req,res)=>{
    const IdTipo= req.body.IdTipo;
    const idOrden= req.body.idOrden;
    const idFamilia= req.body.idFamilia;
    const nombreCientifico= req.body.nombreCientifico;
    const nombreVulgar= req.body.nombreVulgar;
    const idCategoria= req.body.idCategoria;
    const idNom= req.body.idNom;
    db.query('INSERT INTO especie(IdTipo,idOrden,idFamilia,nombreCientifico,nombreComun,idCategoria,idNom) VALUES(?,?,?,?,?,?,?,?)',
        [IdTipo,idOrden,idFamilia,nombreCientifico,nombreVulgar,idCategoria,idNom],(err)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Animal Registrado');
        }
    });
})  
app.get('/especie',(req,res)=>{
    const IdTipo= req.body.IdTipo;
    const idOrden= req.body.idOrden;
    const idFamilia= req.body.idFamilia;
    const idCategoria= req.body.idCategoria;
    const idNom= req.body.idNom;
    db.query('SELECT IdTipo,idOrden,idFamilia,idCategoria,idNom',(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
})  


app.listen(3001,()=>{
    console.log('corriendo loco en 3001')
}); 
