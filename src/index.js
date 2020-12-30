const app = require('./app');


const PORT = process.env.PORT || 3000;
//CONEXION A PUERTO
app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`);
});