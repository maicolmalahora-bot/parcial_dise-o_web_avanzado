import express from 'express';
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaDetalleViaje,
    paginaTestimoniales,
    guardarTestimonial  // ✅ AGREGAR ESTA IMPORTACIÓN
} from '../controllers/paginasController.js';

// ❌ ELIMINAR ESTA LÍNEA:
// import { guardarTestimonial } from '../controllers/testimonialesController.js';

//crear una instancia del enrutador de Express.
const router = express.Router();

//=============== rutas tipo get =================//
//ruta inicio
router.get('/', paginaInicio);
// ruta para la parte de "Nosotros"
router.get('/nosotros', paginaNosotros); // ✅ Cambiar "Nosotros" por "nosotros"

//Ruta para mostrar todos los viajes disponibles 
router.get('/viajes', paginaViajes);

//Ruta para mostrar el detall de un viaje en específico 
//ejemplo de URL: '/viajes/aventura-en-peru'
router.get('/viajes/:slug', paginaDetalleViaje);

//Ruta para mostrar las testimoniales existentes.
router.get('/testimoniales', paginaTestimoniales);

//==========================RUTA TIPO POST==============================//
//Esta ruta se activa cuando un formulario de testimoniales es enviado.
//usa el método post porque se están enviando datos dsde el cliente al servidor.
//La función 'guardarTestimonial' procesa y guarda esos datos.
router.post('/testimoniales', guardarTestimonial); // ✅ Ahora usa la función de paginasController

//==========================EXPORTACIÓN===============//
//exporta el router para que pueda ser usado en el archivo principal
//de la aplicación (por ejemplo, en 'app.js')
//esto permite integrar todas estas rutas en la aplicación principal.
export default router;