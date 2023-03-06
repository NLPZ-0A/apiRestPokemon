//----------------------------------VARIABLES-GLOBALES------------------------------------
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const formulario = document.querySelector('#buscar');

typeColors = {
    "electric": "#FFEA70",
    "normal": "#B09398",
    "fire": "#FF675C",
    "water": "#0596C7",
    "ice": "#AFEAFD",
    "rock": "#999799",
    "flying": "#7AE7C7",
    "grass": "#4A9681",
    "psychic": "#FFC6D9",
    "ghost": "#561D25",
    "bug": "#A2FAA3",
    "poison": "#795663",
    "ground": "#D2B074",
    "dragon": "#DA627D",
    "steel": "#1D8A99",
    "fighting": "#2F2F2F",
    "default": "#2A1A1F"
};

//-----------------------------------FUNCIONES------------------------------------------
const searchPokemon = pokemon => {
    const poke = pokemon;
    const fetchPokemons = async () => {
        try{
          
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`);
            const pokemon  = await res.json();

            renderPokemonData(pokemon);
        }catch(error){
            renderNotFound();
        }
    };

    fetchPokemons();
};

const renderPokemonData = data =>{
    const sprite = data.sprites.front_default;
    const {stats, types} = data;
    console.log(data); 

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `N° ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
};

const setCardColor = types => {

    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    console.log(types);
    console.log(colorTwo);

    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
};

const renderPokemonTypes = types => {
     pokeTypes.innerHTML = '';

     types.forEach(type =>{
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
     });

};

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;

        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
};

//-------------------------------EVENTOS-----------------------------------

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    searchPokemon(e.target.pokemon.value);
    formulario.reset();
    console.log(e.target.pokemon.value);
    
});

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
};


