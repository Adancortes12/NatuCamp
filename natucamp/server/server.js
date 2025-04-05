const express= require('express');
const app= express();
const mysql= require('mysql');

const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'NatuCamp'
});

app.listen(3001,()=>{
    console.log('corriendo loco en 3000')
}); 
