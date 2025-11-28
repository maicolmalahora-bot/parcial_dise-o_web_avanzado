// DATOS LOCALES - Reemplazar la base de datos
const datos = {
  viajes: [
    {
      id: 1,
      titulo: "Board GIGABYTE A520M",
      precio: "89.99",
      garantia: "3 años",
      imagen: "boarda520",
      descripcion: "Placa madre GIGABYTE A520M con socket AM4, PCIe 3.0, perfecta para builds económicas",
      disponibles: 8,
      slug: "board_gigabyte_a520"
    },
    {
      id: 2,
      titulo: "Procesador AMD Ryzen 5 5600", 
      precio: "149.99",
      garantia: "3 años",
      imagen: "Ryzen5",
      descripcion: "Procesador AMD Ryzen 5 5600, 6 núcleos 12 hilos, 4.4GHz Max Boost, socket AM4",
      disponibles: 12,
      slug: "amd_ryzen5_5600"
    },
    {
      id: 3,
      titulo: "SSD Kingston 480GB",
      precio: "34.99",
      garantia: "5 años",
      imagen: "disco400k",
      descripcion: "Disco sólido SSD Kingston 480GB, SATA III, 10x más rápido que HDD tradicional",
      disponibles: 15,
      slug: "ssd_kingston_480gb"
    },
    {
      id: 4,
      titulo: "Monitor Dell 24\"",
      precio: "179.99",
      garantia: "2 años",
      imagen: "Escritorio",
      descripcion: "Monitor Dell 24 pulgadas Full HD, 75Hz, IPS, ideal para oficina y gaming casual",
      disponibles: 6,
      slug: "monitor_dell_24"
    },
    {
      id: 5,
      titulo: "SSD ADATA SU850 480GB",
      precio: "39.99",
      garantia: "3 años",
      imagen: "adata480",
      descripcion: "SSD ADATA Ultimate SU850 480GB, 3D NAND, SATA III, alto rendimiento y confiabilidad",
      disponibles: 10,
      slug: "ssd_adata_480gb"
    },
    {
      id: 6,
      titulo: "Memoria ADATA DDR5 4800MHz",
      precio: "129.99",
      garantia: "Vitalicia",
      imagen: "memoria_adata_ln",
      descripcion: "Memoria RAM ADATA DDR5 16GB 4800MHz, perfecta para gaming y aplicaciones exigentes",
      disponibles: 7,
      slug: "memoria_adata_ddr5"
    },
    {
      id: 7,
      titulo: "Tarjeta MSI RTX 3050",
      precio: "249.99",
      garantia: "2 años",
      imagen: "rtx3050",
      descripcion: "Tarjeta de video MSI GeForce RTX 3050, 8GB GDDR6, arquitectura Ampere, Ray Tracing",
      disponibles: 4,
      slug: "msi_rtx_3050"
    }
  ],
  testimoniales: [
    {
      id: 1,
      nombre: "Carlos Rodríguez",
      correo: "carlos@email.com",
      mensaje: "Excelente calidad en los componentes. El Ryzen 5 superó mis expectativas de rendimiento!"
    },
    {
      id: 2, 
      nombre: "Ana García",
      correo: "ana@email.com",
      mensaje: "El SSD Kingston hizo que mi PC arranque en segundos. Muy recomendado para mejorar cualquier equipo."
    },
    {
      id: 3,
      nombre: "Miguel Torres", 
      correo: "miguel@email.com",
      mensaje: "La RTX 3050 es perfecta para gaming en 1080p. Gran relación calidad-precio y entrega rápida."
    },
    {
      id: 4,
      nombre: "Laura Martínez",
      correo: "laura@email.com", 
      mensaje: "El combo board A520 + Ryzen 5 transformó mi PC. Servicio técnico muy profesional y atención excelente."
    }
  ]
};

// ✅ ARRAY PARA TESTIMONIOS TEMPORALES
let testimoniosTemporales = [];

const paginaInicio = async (req, res) => {
    try {
        // Usar datos locales en lugar de la base de datos
        const viajes = datos.viajes.slice(0, 3);
        const testimoniales = datos.testimoniales.slice(0, 3);

        res.render('inicio', {
            viajes: viajes,
            testimoniales: testimoniales,
            clase: 'home',
            page: 'Inicio',
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    // Usar datos locales
    const viajes = datos.viajes;

    res.render('viajes', {
        pagina: 'Todos nuestros productos',
        viajes,
    });
}

const paginaTestimoniales = async (req, res) => {
    try {
        // Combinar testimonios fijos + temporales
        const todosTestimoniales = [
            ...datos.testimoniales,
            ...testimoniosTemporales
        ];

        res.render('testimoniales', {
            testimoniales: todosTestimoniales,
            page: 'Testimoniales'
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        // Buscar en datos locales
        const viaje = datos.viajes.find(viaje => viaje.slug === slug);

        if (!viaje) {
            return res.status(404).render('404', {
                pagina: 'Producto no encontrado'
            });
        }

        res.render('viaje', {
            pagina: 'Información del Producto',
            viaje
        });
    } catch (error) {
        console.log(error);
    }
}

// ✅ FUNCIÓN COMPLETA PARA GUARDAR TESTIMONIOS TEMPORALES
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
        // Obtener testimonios actuales
        const todosTestimoniales = [
            ...datos.testimoniales,
            ...testimoniosTemporales
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
                id: Date.now(),
                nombre,
                correo,
                mensaje,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Agregar al array temporal
            testimoniosTemporales.push(nuevoTestimonio);

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje,
    guardarTestimonial
};