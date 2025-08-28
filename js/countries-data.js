// Base de datos de países para el mapa interactivo de Prime Green
const countriesData = {
    "usa": {
        name: "Estados Unidos",
        region: "América del Norte",
        coordinates: [39.8283, -98.5795],
        topProducts: ["Ruscus Premium", "Eucalipto Baby Blue", "Tree Fern"],
        mainProduct: {
            name: "Ruscus Premium",
            description: "Follaje de larga duración ideal para arreglos florales de lujo",
            image: "img/DSC00592.png",
            demandLevel: "Muy Alto",
            exportVolume: "2,500 kg/mes"
        },
        marketInfo: {
            clients: "150+ floristerías premium",
            growthRate: "+25% anual",
            mainCities: ["Nueva York", "Los Ángeles", "Miami"]
        },
        icon: "fas fa-leaf",
        color: "#2E7D32"
    },
    "canada": {
        name: "Canadá",
        region: "América del Norte",
        coordinates: [56.1304, -106.3468],
        topProducts: ["Eucalipto Gunni", "Helecho Boston", "Ruscus Italiano"],
        mainProduct: {
            name: "Eucalipto Gunni",
            description: "Eucalipto resistente al frío con aroma distintivo",
            image: "img/DSC00551.JPG",
            demandLevel: "Alto",
            exportVolume: "1,800 kg/mes"
        },
        marketInfo: {
            clients: "80+ centros de jardinería",
            growthRate: "+18% anual",
            mainCities: ["Toronto", "Vancouver", "Montreal"]
        },
        icon: "fas fa-leaf",
        color: "#388E3C"
    },
    "mexico": {
        name: "México",
        region: "América del Norte",
        coordinates: [23.6345, -102.5528],
        topProducts: ["Ruscus Tropical", "Eucalipto Citriodora", "Helecho Maidenhair"],
        mainProduct: {
            name: "Ruscus Tropical",
            description: "Variedad tropical adaptada al clima cálido mexicano",
            image: "img/DSC00565.JPG",
            demandLevel: "Alto",
            exportVolume: "2,200 kg/mes"
        },
        marketInfo: {
            clients: "120+ distribuidores",
            growthRate: "+22% anual",
            mainCities: ["Ciudad de México", "Guadalajara", "Monterrey"]
        },
        icon: "fas fa-seedling",
        color: "#43A047"
    },
    "brazil": {
        name: "Brasil",
        region: "América del Sur",
        coordinates: [-14.2350, -51.9253],
        topProducts: ["Tree Fern Brasileño", "Eucalipto Robusta", "Ruscus Amazónico"],
        mainProduct: {
            name: "Tree Fern Brasileño",
            description: "Helecho arbóreo nativo con propiedades únicas",
            image: "img/DSC00567.JPG",
            demandLevel: "Muy Alto",
            exportVolume: "3,500 kg/mes"
        },
        marketInfo: {
            clients: "200+ empresas paisajísticas",
            growthRate: "+30% anual",
            mainCities: ["São Paulo", "Río de Janeiro", "Brasilia"]
        },
        icon: "fas fa-tree",
        color: "#4CAF50"
    },
    "colombia": {
        name: "Colombia",
        region: "América del Sur",
        coordinates: [4.5709, -74.2973],
        topProducts: ["Ruscus Andino", "Eucalipto Colombiano", "Helecho Culantrillo"],
        mainProduct: {
            name: "Ruscus Andino",
            description: "Follaje de alta montaña con resistencia excepcional",
            image: "img/DSC00598.JPG",
            demandLevel: "Extremo",
            exportVolume: "4,200 kg/mes"
        },
        marketInfo: {
            clients: "Producción local - Centro de distribución",
            growthRate: "+35% anual",
            mainCities: ["Bogotá", "Medellín", "Cali"]
        },
        icon: "fas fa-spa",
        color: "#66BB6A"
    },
    "argentina": {
        name: "Argentina",
        region: "América del Sur",
        coordinates: [-38.4161, -63.6167],
        topProducts: ["Eucalipto Patagónico", "Ruscus Templado", "Helecho Austral"],
        mainProduct: {
            name: "Eucalipto Patagónico",
            description: "Variedad resistente al frío de la Patagonia argentina",
            image: "img/DSC00633.JPG",
            demandLevel: "Alto",
            exportVolume: "1,900 kg/mes"
        },
        marketInfo: {
            clients: "90+ viveros especializados",
            growthRate: "+20% anual",
            mainCities: ["Buenos Aires", "Córdoba", "Rosario"]
        },
        icon: "fas fa-seedling",
        color: "#81C784"
    },
    "spain": {
        name: "España",
        region: "Europa",
        coordinates: [40.4637, -3.7492],
        topProducts: ["Ruscus Mediterráneo", "Eucalipto Español", "Helecho Real"],
        mainProduct: {
            name: "Ruscus Mediterráneo",
            description: "Follaje clásico mediterráneo de máxima calidad",
            image: "img/DSC00660.JPG",
            demandLevel: "Muy Alto",
            exportVolume: "2,800 kg/mes"
        },
        marketInfo: {
            clients: "180+ floristerías europeas",
            growthRate: "+28% anual",
            mainCities: ["Madrid", "Barcelona", "Valencia"]
        },
        icon: "fas fa-leaf",
        color: "#A5D6A7"
    },
    "france": {
        name: "Francia",
        region: "Europa",
        coordinates: [46.6034, 1.8883],
        topProducts: ["Ruscus Francés", "Eucalipto Provence", "Tree Fern Elegante"],
        mainProduct: {
            name: "Ruscus Francés",
            description: "Follaje de lujo para la alta floristería francesa",
            image: "img/DSC00963.JPG",
            demandLevel: "Premium",
            exportVolume: "2,400 kg/mes"
        },
        marketInfo: {
            clients: "120+ ateliers florales",
            growthRate: "+24% anual",
            mainCities: ["París", "Lyon", "Marsella"]
        },
        icon: "fas fa-spa",
        color: "#C8E6C9"
    },
    "germany": {
        name: "Alemania",
        region: "Europa",
        coordinates: [51.1657, 10.4515],
        topProducts: ["Eucalipto Nórdico", "Ruscus Alemán", "Helecho Germánico"],
        mainProduct: {
            name: "Eucalipto Nórdico",
            description: "Eucalipto adaptado para climas templados del norte",
            image: "img/DSC00996.JPG",
            demandLevel: "Alto",
            exportVolume: "2,100 kg/mes"
        },
        marketInfo: {
            clients: "95+ centros de distribución",
            growthRate: "+19% anual",
            mainCities: ["Berlín", "Múnich", "Hamburgo"]
        },
        icon: "fas fa-tree",
        color: "#E8F5E8"
    },
    "japan": {
        name: "Japón",
        region: "Asia-Pacífico",
        coordinates: [36.2048, 138.2529],
        topProducts: ["Ruscus Zen", "Eucalipto Japonés", "Tree Fern Bonsái"],
        mainProduct: {
            name: "Ruscus Zen",
            description: "Follaje minimalista para arreglos estilo japonés",
            image: "img/DSC00551.JPG",
            demandLevel: "Premium",
            exportVolume: "1,600 kg/mes"
        },
        marketInfo: {
            clients: "70+ estudios de ikebana",
            growthRate: "+26% anual",
            mainCities: ["Tokio", "Osaka", "Kioto"]
        },
        icon: "fas fa-spa",
        color: "#2E7D32"
    },
    "australia": {
        name: "Australia",
        region: "Asia-Pacífico",
        coordinates: [-25.2744, 133.7751],
        topProducts: ["Eucalipto Nativo", "Tree Fern Australiano", "Ruscus Outback"],
        mainProduct: {
            name: "Eucalipto Nativo",
            description: "Eucalipto australiano original de máxima pureza",
            image: "img/DSC00565.JPG",
            demandLevel: "Extremo",
            exportVolume: "3,200 kg/mes"
        },
        marketInfo: {
            clients: "150+ nurseries especializados",
            growthRate: "+32% anual",
            mainCities: ["Sídney", "Melbourne", "Brisbane"]
        },
        icon: "fas fa-tree",
        color: "#388E3C"
    },
    "singapore": {
        name: "Singapur",
        region: "Asia-Pacífico",
        coordinates: [1.3521, 103.8198],
        topProducts: ["Ruscus Tropical Premium", "Helecho Singapur", "Eucalipto Urbano"],
        mainProduct: {
            name: "Ruscus Tropical Premium",
            description: "Follaje tropical de lujo para diseño urbano moderno",
            image: "img/DSC00567.JPG",
            demandLevel: "Luxury",
            exportVolume: "800 kg/mes"
        },
        marketInfo: {
            clients: "25+ diseñadores premium",
            growthRate: "+40% anual",
            mainCities: ["Singapur"]
        },
        icon: "fas fa-leaf",
        color: "#43A047"
    }
};

// Configuración de colores por región
const regionColors = {
    "América del Norte": "#2E7D32",
    "América del Sur": "#388E3C", 
    "Europa": "#43A047",
    "Asia-Pacífico": "#4CAF50",
    "África": "#66BB6A",
    "Medio Oriente": "#81C784"
};

// Función para obtener datos de un país
function getCountryData(countryCode) {
    return countriesData[countryCode] || null;
}

// Función para obtener todos los países de una región
function getCountriesByRegion(region) {
    return Object.values(countriesData).filter(country => country.region === region);
}

// Función para obtener estadísticas globales
function getGlobalStats() {
    const totalCountries = Object.keys(countriesData).length;
    const totalVolume = Object.values(countriesData).reduce((sum, country) => {
        return sum + parseInt(country.mainProduct.exportVolume.replace(/[^\d]/g, ''));
    }, 0);
    const regions = [...new Set(Object.values(countriesData).map(country => country.region))];
    
    return {
        totalCountries,
        totalVolume: totalVolume + " kg/mes",
        totalRegions: regions.length,
        regions
    };
}
