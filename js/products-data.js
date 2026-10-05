const productsData = {
    "producto_1": {
        id: "producto_1",
        name: "Ruscus",
        category: "Follajes Ornamentales",
        scientificName: "Ruscus aculeatus",
        description: "Follaje de larga duración ideal para arreglos florales de lujo y decoración premium.",
        detailedDescription: "El Ruscus es nuestro producto estrella, cultivado en condiciones controladas para garantizar la máxima calidad y durabilidad. Con hojas verde intenso y tallos robustos, es perfecto para arreglos florales de alta gama.",
        image: "img/Productos/1.webp",
        gallery: ["img/Productos/1.webp", "img/Productos/2.webp", "img/Productos/3.webp"],
        characteristics: {
            durability: "14-21 días",
            height: "40-60 cm",
            color: "Verde intenso",
            texture: "Lisa y brillante",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "40-60 cm",
            packaging: "Cajas de 10 tallos",
            weight: "250-300g por tallo",
            temperature: "2-5 °C",
            humidity: "85-90%"
        },
        uses: ["Arreglos florales premium", "Decoración de eventos", "Bodas y ceremonias", "Floristería de lujo"],
        advantages: ["Larga duración", "Sin espinas", "Fácil manejo", "Disponible todo el año"],
        markets: ["Estados Unidos", "Europa", "Canadá", "Australia"],
        priceRange: "Premium",
        popularity: 5,
        featured: true
    },
    "producto_2": {
        id: "producto_2",
        name: "Pino",
        category: "Follajes Ornamentales",
        scientificName: "Pinus spp.",
        description: "Follaje de pino fresco, ideal para decoración natural y arreglos rústicos.",
        detailedDescription: "El Pino destaca por su aroma característico y su textura única. Perfecto para decoración estacional, arreglos rústicos y eventos que buscan un toque natural auténtico.",
        image: "img/Productos/2.webp",
        gallery: ["img/Productos/2.webp", "img/Productos/3.webp", "img/Productos/4.webp"],
        characteristics: {
            durability: "10-14 días",
            height: "50-70 cm",
            color: "Verde oscuro",
            texture: "Agujas suaves",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "50-70 cm",
            packaging: "Cajas de 8 tallos",
            weight: "180-220g por tallo",
            temperature: "2-5 °C",
            humidity: "80-85%"
        },
        uses: ["Decoración rústica", "Arreglos naturales", "Eventos temáticos", "Decoración navideña"],
        advantages: ["Aroma natural", "Textura distintiva", "Versátil", "Popular"],
        markets: ["Estados Unidos", "Europa", "Canadá", "México"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    },
    "producto_3": {
        id: "producto_3",
        name: "Palma",
        category: "Follajes Tropicales",
        scientificName: "Chamaedorea elegans",
        description: "Follaje de palma elegante, ideal para proyectos paisajísticos y decoración tropical.",
        detailedDescription: "La Palma es un follaje tropical que aporta elegancia y frescura a cualquier espacio. Sus hojas arqueadas y textura única la convierten en una pieza perfecta para eventos y decoración de lujo.",
        image: "img/Productos/3.webp",
        gallery: ["img/Productos/3.webp", "img/Productos/4.webp", "img/Productos/6.webp"],
        characteristics: {
            durability: "7-10 días",
            height: "80-120 cm",
            color: "Verde bosque",
            texture: "Frondosa y arqueada",
            season: "Primavera-Otono"
        },
        specifications: {
            stemLength: "80-120 cm",
            packaging: "Cajas de 5 unidades",
            weight: "400-600g por unidad",
            temperature: "8-12 °C",
            humidity: "90-95%"
        },
        uses: ["Paisajismo premium", "Hoteles de lujo", "Eventos corporativos", "Instalaciones artísticas"],
        advantages: ["Impacto visual dramático", "Textura única", "Gran tamaño", "Exclusividad"],
        markets: ["Brasil", "Australia", "Estados Unidos", "Reino Unido"],
        priceRange: "Premium Plus",
        popularity: 4,
        featured: true
    },
    "producto_4": {
        id: "producto_4",
        name: "Palma Rivelina",
        category: "Follajes Tropicales",
        scientificName: "Chamaedorea seifrizii",
        description: "Palma decorativa de alta calidad, perfecta para arreglos tropicales sofisticados.",
        detailedDescription: "La Palma Rivelina es conocida por sus frondas elegantes y delicadas. Su textura única y movimiento natural la hacen ideal para arreglos florales y decoración que requieren un toque tropical sofisticado.",
        image: "img/Productos/4.webp",
        gallery: ["img/Productos/4.webp", "img/Productos/6.webp", "img/Productos/7.webp"],
        characteristics: {
            durability: "8-12 días",
            height: "30-50 cm",
            color: "Verde tropical",
            texture: "Delicada y elegante",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "30-50 cm",
            packaging: "Cajas de 10 tallos",
            weight: "80-120g por tallo",
            temperature: "10-15 °C",
            humidity: "85%"
        },
        uses: ["Arreglos tropicales", "Decoración de eventos", "Bodas", "Fotografía"],
        advantages: ["Textura única", "Elegancia tropical", "Versátil", "Alta demanda"],
        markets: ["Estados Unidos", "Europa", "Canadá", "Asia"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    },
    "producto_5": {
        id: "producto_5",
        name: "Brillantina",
        category: "Follajes Ornamentales",
        scientificName: "Pilea microphylla",
        description: "Follaje delicado y brillante, ideal para arreglos florales finos y decoración elegante.",
        detailedDescription: "La Brillantina se distingue por su textura delicada y brillo natural. Es perfecta para crear arreglos con estilo elegante y aporta un toque de sofisticación a cualquier diseño floral.",
        image: "img/Productos/6.webp",
        gallery: ["img/Productos/6.webp", "img/Productos/7.webp", "img/Productos/8.webp"],
        characteristics: {
            durability: "6-10 días",
            height: "20-35 cm",
            color: "Verde brillante",
            texture: "Delicada y fina",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "20-35 cm",
            packaging: "Cajas de 20 tallos",
            weight: "30-50g por tallo",
            temperature: "5-10 °C",
            humidity: "90%"
        },
        uses: ["Arreglos finos", "Decoración elegante", "Ramos de novia", "Eventos especiales"],
        advantages: ["Textura delicada", "Brillo natural", "Elegante", "Versátil"],
        markets: ["Estados Unidos", "Europa", "Canadá", "Australia"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    },
    "producto_6": {
        id: "producto_6",
        name: "Helecho",
        category: "Helechos",
        scientificName: "Nephrolepis exaltata",
        description: "Helecho clásico de alta calidad, ideal para decoración natural y eventos elegantes.",
        detailedDescription: "El Helecho ofrece frondas elegantes y distintivas que aportan un toque natural y fresco a cualquier espacio. Perfecto para crear ambientes naturales y sofisticados.",
        image: "img/Productos/7.webp",
        gallery: ["img/Productos/7.webp", "img/Productos/8.webp", "img/Productos/9.webp"],
        characteristics: {
            durability: "8-12 días",
            height: "40-60 cm",
            color: "Verde medio",
            texture: "Frondosa y arqueada",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "40-60 cm",
            packaging: "Cajas de 8 tallos",
            weight: "150-200g por tallo",
            temperature: "8-12 °C",
            humidity: "90%"
        },
        uses: ["Decoración natural", "Eventos elegantes", "Arreglos clásicos", "Interiores"],
        advantages: ["Clásico atemporal", "Natural", "Elegante", "Versátil"],
        markets: ["Estados Unidos", "Europa", "Canadá", "Australia"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    },
    "producto_7": {
        id: "producto_7",
        name: "Eucalipto",
        category: "Eucaliptos",
        scientificName: "Eucalyptus cinerea",
        description: "Eucalipto premium con aroma distintivo, ideal para arreglos modernos y decoración.",
        detailedDescription: "El Eucalipto es un clásico muy valorado por su aroma característico y color plateado. Su versatilidad lo hace ideal para una amplia gama de aplicaciones decorativas y arreglos florales.",
        image: "img/Productos/8.webp",
        gallery: ["img/Productos/8.webp", "img/Productos/9.webp", "img/Productos/10.webp"],
        characteristics: {
            durability: "10-14 días",
            height: "50-70 cm",
            color: "Verde plateado",
            texture: "Aromática y suave",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "50-70 cm",
            packaging: "Cajas de 10 tallos",
            weight: "180-220g por tallo",
            temperature: "2-8 °C",
            humidity: "80-85%"
        },
        uses: ["Arreglos modernos", "Bodas", "Decoración spa", "Eventos elegantes"],
        advantages: ["Aroma relajante", "Color único", "Muy popular", "Versátil"],
        markets: ["Estados Unidos", "Europa", "Australia", "Canadá"],
        priceRange: "Medio",
        popularity: 5,
        featured: true
    },
    "producto_8": {
        id: "producto_8",
        name: "Coculus",
        category: "Follajes Ornamentales",
        scientificName: "Cocculus laurifolius",
        description: "Follaje ornamental de hojas redondas, favorito para arreglos florales y decoración.",
        detailedDescription: "El Coculus es extremadamente popular por sus hojas redondas y brillantes. Es el favorito para arreglos florales y decoración de eventos por su elegancia y durabilidad.",
        image: "img/Productos/9.webp",
        gallery: ["img/Productos/9.webp", "img/Productos/10.webp", "img/Productos/1.webp"],
        characteristics: {
            durability: "12-16 días",
            height: "40-60 cm",
            color: "Verde intenso",
            texture: "Redonda y brillante",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "40-60 cm",
            packaging: "Cajas de 10 tallos",
            weight: "180-220g por tallo",
            temperature: "5-10 °C",
            humidity: "85%"
        },
        uses: ["Arreglos florales", "Decoración de eventos", "Bodas", "Centros de mesa"],
        advantages: ["Muy popular", "Duradero", "Elegante", "Versátil"],
        markets: ["Estados Unidos", "Europa", "Canadá", "Asia"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    },
    "producto_9": {
        id: "producto_9",
        name: "Cinta Liriope",
        category: "Follajes Ornamentales",
        scientificName: "Liriope muscari",
        description: "Follaje lineal elegante, ideal para arreglos contemporáneos y decoración moderna.",
        detailedDescription: "La Cinta Liriope ofrece una textura lineal única que añade líneas elegantes y movimiento a cualquier arreglo. Su apariencia moderna la hace perfecta para diseños contemporáneos y sofisticados.",
        image: "img/Productos/10.webp",
        gallery: ["img/Productos/10.webp", "img/Productos/1.webp", "img/Productos/2.webp"],
        characteristics: {
            durability: "10-14 días",
            height: "30-50 cm",
            color: "Verde oscuro",
            texture: "Lineal y elegante",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "30-50 cm",
            packaging: "Cajas de 15 tallos",
            weight: "60-90g por tallo",
            temperature: "5-10 °C",
            humidity: "80-85%"
        },
        uses: ["Arreglos modernos", "Decoración contemporánea", "Eventos", "Diseño floral"],
        advantages: ["Líneas elegantes", "Moderna", "Duradero", "Versátil"],
        markets: ["Estados Unidos", "Europa", "Canadá", "Asia"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    }
};
