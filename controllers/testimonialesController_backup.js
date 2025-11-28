import { Testimonial } from "../models/Testimonial.js";


// Array para almacenar testimonios temporales en memoria
let testimoniosTemporales = [];

const guardarTestimonial = async (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if (!nombre) {
        errores.push({ 'mensaje': 'Agrega tu nombre'});
    }
    if (!correo) {
        errores.push({'mensaje': 'Tu correo es obligatorio'});
    }
    if (!mensaje) {
        errores.push({'mensaje': 'Un testimonial no puede ir vacío'});
    }

    if (errores.length > 0) {
        // Obtener testimonios actuales (fijos + temporales)
        const todosTestimoniales = [
            ...datos.testimoniales,  // Los testimonios fijos del archivo de datos
            ...testimoniosTemporales // Los testimonios temporales
        ];

        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales: todosTestimoniales,
            pagina: 'Testimoniales'
        });
    } else {
        try {
            // Crear nuevo testimonio temporal
            const nuevoTestimonio = {
                id: Date.now(), // ID único basado en timestamp
                nombre,
                correo,
                mensaje,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Agregar al array temporal (en lugar de la base de datos)
            testimoniosTemporales.push(nuevoTestimonio);

            // Redirigir para mostrar el testimonio agregado
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
};

export {
    guardarTestimonial
}