import imgBrawnie from '../../assets/img/Brawnie sin gluten.webp';
import imgCheesecake from '../../assets/img/Cheesecake Sin Azucar.jpg';
import imgEmpanada from '../../assets/img/Empanada de Manzana.jpg';
import imgGalletas from '../../assets/img/Galletas veganas de avena.webp';
import imgMousse from '../../assets/img/Mausse de chocolate.jpg';
import imgPan from '../../assets/img/Pan Sin Gluten.jpg';
import imgTartaSantiago from '../../assets/img/Tarta de santiago.jpg';
import imgTartaVegana from '../../assets/img/tarta vegana de chocolate.jpg';
import imgTiramisu from '../../assets/img/Tiramisu clasico.jpg';
import imgTortaManjar from '../../assets/img/Torta Circular de Manjar.webp';
import imgTortaChocCuad from '../../assets/img/Torta cuadrada de chocolate.jpg';
import imgTortaFrutas from '../../assets/img/Torta cuadrada de frutas.jpg';
import imgTortaNaranja from '../../assets/img/Torta de naranja sin azucar.webp';
import imgTortaVainilla from '../../assets/img/Torta de vainilla.webp';
import imgTortaBoda from '../../assets/img/Torta Especial de Boda.webp';
import imgTortaCumple from '../../assets/img/Torta Especial de Cumpleanos.jpg';

export const inventario = [
    { 
        id: "TC001", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Chocolate", forma: "Cuadrada", tamano: "Familiar", precio: 45000, imagen: imgTortaChocCuad, 
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.",
        historia: "Inspirada en los grandes banquetes europeos del siglo XIX. Nuestra pasteleria adopto la tecnica del ganache de cacao para crear bizcochos de capas cuadradas."
    },
    { 
        id: "TC002", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Frutas", forma: "Cuadrada", tamano: "Mediano", precio: 50000, imagen: imgTortaFrutas, 
        descripcion: "Una mezcla de frutas frescas y crema chantilly sobre bizcocho de vainilla.",
        historia: "Nacida de la celebracion de las cosechas primaverales en el valle central de Chile, combinando frutas de estacion con crema chantilly."
    },
    { 
        id: "TT001", categoria: "Tortas Circulares", nombre: "Torta Circular de Vainilla", forma: "Circular", tamano: "Familiar", precio: 40000, imagen: imgTortaVainilla, 
        descripcion: "Bizcocho de vainilla clasico relleno con crema pastelera y glaseado dulce.",
        historia: "La receta de bizcocho clasico de vainilla ha sido el pilar fundamental de nuestra pasteleria desde su fundacion hace 50 anos."
    },
    { 
        id: "TT002", categoria: "Tortas Circulares", nombre: "Torta Circular de Manjar", forma: "Circular", tamano: "Mediano", precio: 42000, imagen: imgTortaManjar, 
        descripcion: "Torta tradicional chilena con manjar y nueces, un deleite clasico.",
        historia: "El manjar es un pilar de la identidad repostera chilena desde la epoca colonial. Rinde homenaje a las recetas de los antiguos conventos."
    },
    { 
        id: "PI001", categoria: "Postres Individuales", nombre: "Mousse de Chocolate", forma: "Circular", tamano: "Individual", precio: 5000, imagen: imgMousse, 
        descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad.",
        historia: "Derivado del clasico mousse frances del siglo XVIII, adaptado en porciones individuales para ofrecer una experiencia intensa de cacao."
    },
    { 
        id: "PI002", categoria: "Postres Individuales", nombre: "Tiramisu Clasico", forma: "Cuadrada", tamano: "Individual", precio: 5500, imagen: imgTiramisu, 
        descripcion: "Un postre italiano individual con capas de cafe, mascarpone y cacao.",
        historia: "Originario de la region del Veneto en Italia. Elaborado con cafe tostado local y queso mascarpone de textura artesanal."
    },
    { 
        id: "PSA001", categoria: "Productos Sin Azucar", nombre: "Torta Sin Azucar de Naranja", forma: "Circular", tamano: "Mediano", precio: 48000, imagen: imgTortaNaranja, 
        descripcion: "Torta ligera y deliciosa, endulzada naturally.",
        historia: "Desarrollada en colaboracion con estudiantes de nutricion para rescatar los aceites esenciales citricos sin azucares refinados."
    },
    { 
        id: "PSA002", categoria: "Productos Sin Azucar", nombre: "Cheesecake Sin Azucar", forma: "Circular", tamano: "Familiar", precio: 47000, imagen: imgCheesecake, 
        descripcion: "Suave y cremoso, este cheesecake es una opcion perfecta sin culpa.",
        historia: "Inspirado en las tartas de queso americanas pero reformulado con endulzantes naturales para disfrutar por igual."
    },
    { 
        id: "PT001", categoria: "Pasteleria Tradicional", nombre: "Empanada de Manzana", forma: "Circular", tamano: "Individual", precio: 3000, imagen: imgEmpanada, 
        descripcion: "Pasteleria tradicional rellena de manzanas especiadas.",
        historia: "Representa la fusion entre empanadas tradicionales y los abundantes manzanos del sur de Chile, horneada con canela."
    },
    { 
        id: "PT002", categoria: "Pasteleria Tradicional", nombre: "Tarta de Santiago", forma: "Circular", tamano: "Familiar", precio: 6000, imagen: imgTartaSantiago, 
        descripcion: "Tradicional tarta espanola hecha con almendras, azucar y huevos.",
        historia: "Receta gallega con mas de 500 anos de historia. Destaca por su masa de almendras molidas y la silueta de la Cruz de Santiago."
    },
    { 
        id: "PG001", categoria: "Productos Sin Gluten", nombre: "Brownie Sin Gluten", forma: "Cuadrada", tamano: "Individual", precio: 4000, imagen: imgBrawnie, 
        descripcion: "Rico y denso, este brownie es perfecto para quienes evitan el gluten.",
        historia: "Evolucion del brownie de Boston de 1893, adaptado mediante harinas alternas de frutos secos para mantener su interior humedo."
    },
    { 
        id: "PG002", categoria: "Productos Sin Gluten", nombre: "Pan Sin Gluten", forma: "Cuadrada", tamano: "Mediano", precio: 3500, imagen: imgPan, 
        descripcion: "Suave y esponjoso, ideal para acompanar cualquier comida.",
        historia: "Receta artesanal desarrollada para ofrecer la corteza dorada y la miga esponjosa del pan tradicional sin trigo."
    },
    { 
        id: "PV001", categoria: "Productos Vegana", nombre: "Torta Vegana de Chocolate", forma: "Circular", tamano: "Familiar", precio: 50000, imagen: imgTartaVegana, 
        descripcion: "Torta de chocolate humeda hecha sin productos de origen animal.",
        historia: "Formula contemporanea que sustituye lacteos y huevos por aceites vegetales prensados en frio y manteca de cacao pura."
    },
    { 
        id: "PV002", categoria: "Productos Vegana", nombre: "Galletas Veganas de Avena", forma: "Circular", tamano: "Individual", precio: 4500, imagen: imgGalletas, 
        descripcion: "Crujientes y sabrosas galletas ideales para un snack saludable.",
        historia: "Basadas en los snacks energeticos campestres, utilizando avena integral en hojuelas y miel de cana vegetal."
    },
    { 
        id: "TE001", categoria: "Tortas Especiales", nombre: "Torta Especial de Cumpleanos", forma: "Circular", tamano: "Familiar", precio: 55000, imagen: imgTortaCumple, 
        descripcion: "Disenada especialmente para celebraciones con decoraciones unicas.",
        historia: "Un modelo festivo atemporal creado para conmemorar las reuniones familiares que han marcado medio siglo de historia."
    },
    { 
        id: "TE002", categoria: "Tortas Especiales", nombre: "Torta Especial de Boda", forma: "Circular", tamano: "Familiar", precio: 60000, imagen: imgTortaBoda, 
        descripcion: "Elegante y deliciosa, disenada para ser el centro de atencion.",
        historia: "Inspirada en las construcciones con las que la pasteleria participo en el Record Guinness de la torta mas grande de Chile en 1995."
    }
];