import imgVainilla from '../assets/img/Torta de vainilla.webp';
import imgManjar from '../assets/img/Torta Circular de Manjar.webp';
import imgBoda from '../assets/img/Torta Especial de Boda.webp';

export const blogs = [
  {
    id: 1,
    titulo: '5 claves para un bizcocho esponjoso',
    categoria: 'Consejos',
    autor: 'Valentina Soto, estudiante de Gastronomía Duoc UC',
    fecha: '2026-09-28',
    imagen: imgVainilla,
    resumen: 'Los errores más comunes al hornear un bizcocho y cómo evitarlos.',
    contenido: 'Usa huevos a temperatura ambiente porque incorporan más aire. Tamiza la harina y agrégala de forma envolvente sin batir de más. Precalienta el horno al menos 15 minutos y no lo abras durante los primeros 20 minutos. Por último, deja enfriar el bizcocho sobre una rejilla antes de rellenarlo.',
  },
  {
    id: 2,
    titulo: 'Receta: manjar casero',
    categoria: 'Recetas',
    autor: 'Equipo Mil Sabores',
    fecha: '2026-09-14',
    imagen: imgManjar,
    resumen: 'El relleno estrella de la repostería chilena hecho en casa.',
    contenido: 'Necesitas 2 litros de leche, 500 g de azúcar, una cucharadita de vainilla y una pizca de bicarbonato. Cocina la leche con el azúcar a fuego medio-bajo revolviendo seguido. Después de unas dos horas tomará color caramelo y espesará. Agrega la vainilla y deja enfriar.',
  },
  {
    id: 3,
    titulo: 'Nuestra historia: el récord Guinness de 1995',
    categoria: 'Historia',
    autor: 'Equipo Mil Sabores',
    fecha: '2026-08-30',
    imagen: imgBoda,
    resumen: 'Cómo participamos en la creación de la torta más grande del mundo.',
    contenido: 'En 1995 Pastelería Mil Sabores participó junto a cientos de reposteros en la creación de la torta más grande del mundo, un hito registrado en el libro Guinness. Esa experiencia nos enseñó a trabajar tortas de varios pisos, técnica que hoy usamos en nuestras tortas de boda.',
  },
];
