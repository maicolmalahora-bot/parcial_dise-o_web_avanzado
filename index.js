import express from 'express';
//Llamamos el archivo que se encuentra en lcarpeta de rutas
import router from './routes/index.js';


//Configuramos la base de datos


//conectar la base de datos
//db.authenticate()
   // .then( () => console.log('Base de datos conectada'))
    //.catch( error => console.log(error));

//const app = express();

//app.use(express.urlencoded({ extended: true }));

//const port = process.env.PORT || 3000;


/*app.get ('/', (req, res ) => {
    res.send ('Bienvenido a la pagina principal');
}) */
//habilitamos pug
app.set('view engine', 'pug');

app.use ((req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});
app.use(express.static('public'));
//Agregar Router
//soporta GET POST DELETE PUT
//Agrega las diagonales en las rutas que usemos
app.use('/', router); 
//AGREGAR VARIABLES DE AMBIENTE EN DEPLOYMENT 
//Definir la carpeta publica


//app.listen(port, () => {
    //console.log(`El servidor está funcionando en el puerto ${port}`);
//});



app.set('view engine', 'pug');