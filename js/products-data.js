const productsData = {
    "producto_1": {
        id: "producto_1",
        name: "Ruscus",
        category: "Follajes Ornamentales",
        scientificName: "Ruscus aculeatus",
        description: "Follaje de larga duracion ideal para arreglos florales de lujo y decoracion premium.",
        detailedDescription: "El Ruscus es nuestro producto estrella, cultivado en condiciones controladas para garantizar la maxima calidad y durabilidad. Con hojas verde intenso y tallos robustos, es perfecto para arreglos florales de alta gama.",
        image: "img/Productos/1.png",
        gallery: ["img/Productos/1.png", "img/Productos/2.png", "img/Productos/3.png"],
        characteristics: {
            durability: "14-21 dias",
            height: "40-60 cm",
            color: "Verde intenso",
            texture: "Lisa y brillante",
            season: "Todo el ano"
        },
        specifications: {
            stemLength: "40-60 cm",
            packaging: "Cajas de 10 tallos",
            weight: "250-300g por tallo",
            temperature: "2-5 C",
            humidity: "85-90%"
        },
        uses: ["Arreglos florales premium", "Decoracion de eventos", "Bodas y ceremonias", "Floristeria de lujo"],
        advantages: ["Larga duracion", "Sin espinas", "Facil manejo", "Disponible todo el ano"],
        markets: ["Estados Unidos", "Europa", "Canada", "Australia"],
        priceRange: "Premium",
        popularity: 5,
        featured: true
    },
    "producto_2": {
        id: "producto_2",
        name: "Pino",
        category: "Follajes Ornamentales",
        scientificName: "Pinus spp.",
        description: "Follaje de pino fresco, ideal para decoracion natural y arreglos rusticos.",
        detailedDescription: "El Pino destaca por su aroma caracteristico y su textura unica. Perfecto para decoracion estacional, arreglos rusticos y eventos que buscan un toque natural autentico.",
        image: "img/Productos/2.png",
        gallery: ["img/Productos/2.png", "img/Productos/3.png", "img/Productos/4.png"],
        characteristics: {
            durability: "10-14 dias",
            height: "50-70 cm",
            color: "Verde oscuro",
            texture: "Agujas suaves",
            season: "Todo el ano"
        },
        specifications: {
            stemLength: "50-70 cm",
            packaging: "Cajas de 8 tallos",
            weight: "180-220g por tallo",
            temperature: "2-5 C",
            humidity: "80-85%"
        },
        uses: ["Decoracion rustica", "Arreglos naturales", "Eventos tematicos", "Decoracion navideña"],
        advantages: ["Aroma natural", "Textura distintiva", "Versatil", "Popular"],
        markets: ["Estados Unidos", "Europa", "Canada", "Mexico"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    },
    "producto_3": {
        id: "producto_3",
        name: "Palma",
        category: "Follajes Tropicales",
        scientificName: "Chamaedorea elegans",
        description: "Follaje de palma elegante, ideal para proyectos paisajisticos y decoracion tropical.",
        detailedDescription: "La Palma es un follaje tropical que aporta elegancia y frescura a cualquier espacio. Sus hojas arqueadas y textura unica la convierten en una pieza perfecta para eventos y decoracion de lujo.",
        image: "img/Productos/3.png",
        gallery: ["img/Productos/3.png", "img/Productos/4.png", "img/Productos/6.png"],
        characteristics: {
            durability: "7-10 dias",
            height: "80-120 cm",
            color: "Verde bosque",
            texture: "Frondosa y arqueada",
            season: "Primavera-Otono"
        },
        specifications: {
            stemLength: "80-120 cm",
            packaging: "Cajas de 5 unidades",
            weight: "400-600g por unidad",
            temperature: "8-12 C",
            humidity: "90-95%"
        },
        uses: ["Paisajismo premium", "Hoteles de lujo", "Eventos corporativos", "Instalaciones artisticas"],
        advantages: ["Impacto visual dramatico", "Textura unica", "Gran tamano", "Exclusividad"],
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
        detailedDescription: "La Palma Rivelina es conocida por sus frondas elegantes y delicadas. Su textura unica y movimiento natural la hacen ideal para arreglos florales y decoracion que requieren un toque tropical sofisticado.",
        image: "img/Productos/4.png",
        gallery: ["img/Productos/4.png", "img/Productos/6.png", "img/Productos/7.png"],
        characteristics: {
            durability: "8-12 dias",
            height: "30-50 cm",
            color: "Verde tropical",
            texture: "Delicada y elegante",
            season: "Todo el ano"
        },
        specifications: {
            stemLength: "30-50 cm",
            packaging: "Cajas de 10 tallos",
            weight: "80-120g por tallo",
            temperature: "10-15 C",
            humidity: "85%"
        },
        uses: ["Arreglos tropicales", "Decoracion de eventos", "Bodas", "Fotografia"],
        advantages: ["Textura unica", "Elegancia tropical", "Versatil", "Alta demanda"],
        markets: ["Estados Unidos", "Europa", "Canada", "Asia"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    },
    "producto_5": {
        id: "producto_5",
        name: "Brillantina",
        category: "Follajes Ornamentales",
        scientificName: "Pilea microphylla",
        description: "Follaje delicado y brillante, ideal para arreglos florales finos y decoracion elegante.",
        detailedDescription: "La Brillantina se distingue por su textura delicada y brillo natural. Es perfecta para crear arreglos con estilo elegante y aporta un toque de sofisticacion a cualquier diseño floral.",
        image: "img/Productos/6.png",
        gallery: ["img/Productos/6.png", "img/Productos/7.png", "img/Productos/8.png"],
        characteristics: {
            durability: "6-10 dias",
            height: "20-35 cm",
            color: "Verde brillante",
            texture: "Delicada y fina",
            season: "Todo el ano"
        },
        specifications: {
            stemLength: "20-35 cm",
            packaging: "Cajas de 20 tallos",
            weight: "30-50g por tallo",
            temperature: "5-10 C",
            humidity: "90%"
        },
        uses: ["Arreglos finos", "Decoracion elegante", "Ramos de novia", "Eventos especiales"],
        advantages: ["Textura delicada", "Brillo natural", "Elegante", "Versatil"],
        markets: ["Estados Unidos", "Europa", "Canada", "Australia"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    },
    "producto_6": {
        id: "producto_6",
        name: "Helecho",
        category: "Helechos",
        scientificName: "Nephrolepis exaltata",
        description: "Helecho clasico de alta calidad, ideal para decoracion natural y eventos elegantes.",
        detailedDescription: "El Helecho ofrece frondas elegantes y distintivas que aportan un toque natural y fresco a cualquier espacio. Perfecto para crear ambientes naturales y sofisticados.",
        image: "img/Productos/7.png",
        gallery: ["img/Productos/7.png", "img/Productos/8.png", "img/Productos/9.png"],
        characteristics: {
            durability: "8-12 dias",
            height: "40-60 cm",
            color: "Verde medio",
            texture: "Frondosa y arqueada",
            season: "Todo el ano"
        },
        specifications: {
            stemLength: "40-60 cm",
            packaging: "Cajas de 8 tallos",
            weight: "150-200g por tallo",
            temperature: "8-12 C",
            humidity: "90%"
        },
        uses: ["Decoracion natural", "Eventos elegantes", "Arreglos clasicos", "Interiores"],
        advantages: ["Clasico atemporal", "Natural", "Elegante", "Versatil"],
        markets: ["Estados Unidos", "Europa", "Canada", "Australia"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    },
    "producto_7": {
        id: "producto_7",
        name: "Eucalipto",
        category: "Eucaliptos",
        scientificName: "Eucalyptus cinerea",
        description: "Eucalipto premium con aroma distintivo, ideal para arreglos modernos y decoracion.",
        detailedDescription: "El Eucalipto es un clasico muy valorado por su aroma caracteristico y color plateado. Su versatilidad lo hace ideal para una amplia gama de aplicaciones decorativas y arreglos florales.",
        image: "img/Productos/8.png",
        gallery: ["img/Productos/8.png", "img/Productos/9.png", "img/Productos/10.png"],
        characteristics: {
            durability: "10-14 dias",
            height: "50-70 cm",
            color: "Verde plateado",
            texture: "Aromatica y suave",
            season: "Todo el ano"
        },
        specifications: {
            stemLength: "50-70 cm",
            packaging: "Cajas de 10 tallos",
            weight: "180-220g por tallo",
            temperature: "2-8 C",
            humidity: "80-85%"
        },
        uses: ["Arreglos modernos", "Bodas", "Decoracion spa", "Eventos elegantes"],
        advantages: ["Aroma relajante", "Color unico", "Muy popular", "Versatil"],
        markets: ["Estados Unidos", "Europa", "Australia", "Canada"],
        priceRange: "Medio",
        popularity: 5,
        featured: true
    },
    "producto_8": {
        id: "producto_8",
        name: "Coculus",
        category: "Follajes Ornamentales",
        scientificName: "Cocculus laurifolius",
        description: "Follaje ornamental de hojas redondas, favorito para arreglos florales y decoracion.",
        detailedDescription: "El Coculus es extremadamente popular por sus hojas redondas y brillantes. Es el favorito para arreglos florales y decoracion de eventos por su elegancia y durabilidad.",
        image: "img/Productos/9.png",
        gallery: ["img/Productos/9.png", "img/Productos/10.png", "img/Productos/1.png"],
        characteristics: {
            durability: "12-16 dias",
            height: "40-60 cm",
            color: "Verde intenso",
            texture: "Redonda y brillante",
            season: "Todo el ano"
        },
        specifications: {
            stemLength: "40-60 cm",
            packaging: "Cajas de 10 tallos",
            weight: "180-220g por tallo",
            temperature: "5-10 C",
            humidity: "85%"
        },
        uses: ["Arreglos florales", "Decoracion de eventos", "Bodas", "Centros de mesa"],
        advantages: ["Muy popular", "Duradero", "Elegante", "Versatil"],
        markets: ["Estados Unidos", "Europa", "Canada", "Asia"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    },
    "producto_9": {
        id: "producto_9",
        name: "Cinta Liriope",
        category: "Follajes Ornamentales",
        scientificName: "Liriope muscari",
        description: "Follaje lineal elegante, ideal para arreglos contemporaneos y decoracion moderna.",
        detailedDescription: "La Cinta Liriope ofrece una textura lineal unica que anade lineas elegantes y movimiento a cualquier arreglo. Su apariencia moderna la hace perfecta para diseños contemporaneos y sofisticados.",
        image: "img/Productos/10.png",
        gallery: ["img/Productos/10.png", "img/Productos/1.png", "img/Productos/2.png"],
        characteristics: {
            durability: "10-14 dias",
            height: "30-50 cm",
            color: "Verde oscuro",
            texture: "Lineal y elegante",
            season: "Todo el ano"
        },
        specifications: {
            stemLength: "30-50 cm",
            packaging: "Cajas de 15 tallos",
            weight: "60-90g por tallo",
            temperature: "5-10 C",
            humidity: "80-85%"
        },
        uses: ["Arreglos modernos", "Decoracion contemporanea", "Eventos", "Diseño floral"],
        advantages: ["Lineas elegantes", "Moderna", "Duradero", "Versatil"],
        markets: ["Estados Unidos", "Europa", "Canada", "Asia"],
        priceRange: "Medio",
        popularity: 4,
        featured: true
    }
};
