// Base de datos de productos para la galería de Prime Green
const productsData = {
    "ruscus_premium": {
        id: "ruscus_premium",
        name: "Ruscus Premium",
        category: "Follajes Ornamentales",
        scientificName: "Ruscus aculeatus",
        description: "Follaje de larga duración ideal para arreglos florales de lujo y decoración premium.",
        detailedDescription: "El Ruscus Premium es nuestro producto estrella, cultivado en condiciones controladas para garantizar la máxima calidad y durabilidad. Con hojas verde intenso y tallos robustos, es perfecto para arreglos florales de alta gama.",
        image: "img/DSC00592.png",
        gallery: ["img/DSC00592.png", "img/DSC00551.JPG", "img/DSC00565.JPG"],
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
            temperature: "2-5°C",
            humidity: "85-90%"
        },
        uses: ["Arreglos florales premium", "Decoración de eventos", "Bodas y ceremonias", "Floristería de lujo"],
        advantages: ["Larga duración", "Sin espinas", "Fácil manejo", "Disponible todo el año"],
        markets: ["Estados Unidos", "Europa", "Canadá", "Australia"],
        priceRange: "$$$",
        popularity: 5,
        featured: true
    },
    "eucalipto_baby_blue": {
        id: "eucalipto_baby_blue",
        name: "Eucalipto Baby Blue",
        category: "Eucaliptos",
        scientificName: "Eucalyptus pulverulenta",
        description: "Eucalipto de tonos azulados únicos, perfecto para arreglos modernos y minimalistas.",
        detailedDescription: "El Eucalipto Baby Blue destaca por sus hojas de color azul grisáceo único. Su aroma distintivo y forma redonda lo convierten en el favorito para diseños contemporáneos y arreglos minimalistas.",
        image: "img/DSC00633.JPG",
        gallery: ["img/DSC00633.JPG", "img/DSC00660.JPG", "img/DSC00567.JPG"],
        characteristics: {
            durability: "10-14 días",
            height: "50-70 cm",
            color: "Azul grisáceo",
            texture: "Aterciopelada",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "50-70 cm",
            packaging: "Cajas de 8 tallos",
            weight: "180-220g por tallo",
            temperature: "2-5°C",
            humidity: "80-85%"
        },
        uses: ["Decoración moderna", "Arreglos minimalistas", "Spa y wellness", "Fotografía floral"],
        advantages: ["Aroma relajante", "Color único", "Textura suave", "Efecto visual impactante"],
        markets: ["Japón", "Singapur", "Francia", "España"],
        priceRange: "$$",
        popularity: 4,
        featured: true
    },
    "tree_fern_premium": {
        id: "tree_fern_premium",
        name: "Tree Fern Premium",
        category: "Helechos Arbóreos",
        scientificName: "Cyathea cooperi",
        description: "Helecho arbóreo de gran formato, ideal para proyectos paisajísticos y decoración de lujo.",
        detailedDescription: "El Tree Fern Premium es un helecho arbóreo espectacular que aporta elegancia natural a cualquier espacio. Sus frondas arqueadas y textura única lo convierten en una pieza central perfecta.",
        image: "img/DSC00963.JPG",
        gallery: ["img/DSC00963.JPG", "img/DSC00996.JPG", "img/DSC00598.JPG"],
        characteristics: {
            durability: "7-10 días",
            height: "80-120 cm",
            color: "Verde bosque",
            texture: "Frondosa y arqueada",
            season: "Primavera-Otoño"
        },
        specifications: {
            stemLength: "80-120 cm",
            packaging: "Cajas de 5 unidades",
            weight: "400-600g por unidad",
            temperature: "8-12°C",
            humidity: "90-95%"
        },
        uses: ["Paisajismo premium", "Hoteles de lujo", "Eventos corporativos", "Instalaciones artísticas"],
        advantages: ["Impacto visual dramático", "Textura única", "Gran tamaño", "Exclusividad"],
        markets: ["Brasil", "Australia", "Estados Unidos", "Reino Unido"],
        priceRange: "$$$$",
        popularity: 4,
        featured: true
    },
    "helecho_maidenhair": {
        id: "helecho_maidenhair",
        name: "Helecho Maidenhair",
        category: "Helechos Delicados",
        scientificName: "Adiantum raddianum",
        description: "Helecho delicado de textura fina, perfecto para arreglos florales sofisticados.",
        detailedDescription: "El Helecho Maidenhair es conocido por sus frondas delicadas y elegantes. Su textura etérea y movimiento natural lo hacen ideal para arreglos florales que requieren un toque de sofisticación.",
        image: "img/DSC00551.JPG",
        gallery: ["img/DSC00551.JPG", "img/DSC00565.JPG", "img/DSC00567.JPG"],
        characteristics: {
            durability: "5-8 días",
            height: "25-40 cm",
            color: "Verde claro",
            texture: "Delicada y etérea",
            season: "Primavera-Verano"
        },
        specifications: {
            stemLength: "25-40 cm",
            packaging: "Cajas de 15 tallos",
            weight: "50-80g por tallo",
            temperature: "5-8°C",
            humidity: "95%"
        },
        uses: ["Arreglos florales finos", "Ramos de novia", "Decoración de mesa", "Fotografía macro"],
        advantages: ["Textura única", "Movimiento natural", "Elegancia sutil", "Versatilidad"],
        markets: ["Francia", "Italia", "Japón", "Canadá"],
        priceRange: "$$",
        popularity: 3,
        featured: false
    },
    "eucalipto_gunni": {
        id: "eucalipto_gunni",
        name: "Eucalipto Gunni",
        category: "Eucaliptos",
        scientificName: "Eucalyptus gunnii",
        description: "Eucalipto resistente con hojas plateadas, ideal para climas fríos y arreglos rústicos.",
        detailedDescription: "El Eucalipto Gunni es una variedad resistente conocida por su adaptabilidad a climas fríos. Sus hojas plateadas y aroma suave lo hacen perfecto para arreglos rústicos y naturales.",
        image: "img/DSC00660.JPG",
        gallery: ["img/DSC00660.JPG", "img/DSC00633.JPG", "img/DSC00592.png"],
        characteristics: {
            durability: "12-16 días",
            height: "45-65 cm",
            color: "Verde plateado",
            texture: "Lisa y aromática",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "45-65 cm",
            packaging: "Cajas de 10 tallos",
            weight: "200-250g por tallo",
            temperature: "2-6°C",
            humidity: "80-85%"
        },
        uses: ["Decoración rústica", "Arreglos naturales", "Coronas navideñas", "Ambientación spa"],
        advantages: ["Resistente al frío", "Aroma suave", "Larga duración", "Versátil"],
        markets: ["Canadá", "Alemania", "Reino Unido", "Escandinavia"],
        priceRange: "$$",
        popularity: 4,
        featured: false
    },
    "ruscus_italiano": {
        id: "ruscus_italiano",
        name: "Ruscus Italiano",
        category: "Follajes Ornamentales",
        scientificName: "Ruscus hypoglossum",
        description: "Variedad italiana de ruscus con hojas más anchas, perfecto para arreglos mediterráneos.",
        detailedDescription: "El Ruscus Italiano se distingue por sus hojas más anchas y su origen mediterráneo. Es perfecto para crear arreglos con estilo europeo clásico y aporta elegancia tradicional.",
        image: "img/DSC00598.JPG",
        gallery: ["img/DSC00598.JPG", "img/DSC00596.JPG", "img/DSC00551.JPG"],
        characteristics: {
            durability: "16-20 días",
            height: "35-50 cm",
            color: "Verde mediterráneo",
            texture: "Ancha y resistente",
            season: "Todo el año"
        },
        specifications: {
            stemLength: "35-50 cm",
            packaging: "Cajas de 12 tallos",
            weight: "200-280g por tallo",
            temperature: "3-6°C",
            humidity: "85-90%"
        },
        uses: ["Arreglos mediterráneos", "Decoración clásica", "Eventos formales", "Restaurantes"],
        advantages: ["Muy duradero", "Estilo clásico", "Hojas anchas", "Resistente"],
        markets: ["Italia", "España", "Francia", "Grecia"],
        priceRange: "$$$",
        popularity: 3,
        featured: false
    }
};

// Configuración de categorías
const productCategories = {
    "Follajes Ornamentales": {
        icon: "fas fa-leaf",
        color: "#2E7D32",
        description: "Follajes de larga duración para decoración premium"
    },
    "Eucaliptos": {
        icon: "fas fa-tree",
        color: "#388E3C",
        description: "Variedades aromáticas de eucalipto"
    },
    "Helechos Arbóreos": {
        icon: "fas fa-spa",
        color: "#43A047",
        description: "Helechos de gran formato para impacto visual"
    },
    "Helechos Delicados": {
        icon: "fas fa-seedling",
        color: "#4CAF50",
        description: "Helechos finos para arreglos sofisticados"
    }
};

// Funciones auxiliares
function getProductById(productId) {
    return productsData[productId] || null;
}

function getProductsByCategory(category) {
    return Object.values(productsData).filter(product => product.category === category);
}

function getFeaturedProducts() {
    return Object.values(productsData).filter(product => product.featured);
}

function getProductsByPopularity() {
    return Object.values(productsData).sort((a, b) => b.popularity - a.popularity);
}

function getAllCategories() {
    return Object.keys(productCategories);
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return Object.values(productsData).filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.scientificName.toLowerCase().includes(searchTerm)
    );
}
