const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonAttack = document.querySelector('.pokemon__attack');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';

  const data = await fetchPokemon(pokemon);

  const attackStat = data?.stats.find(stat => stat.stat.name === 'attack')?.base_stat;

  if (data) {
    searchPokemon = data.id;
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonAttack.innerHTML = `Attack: ${attackStat}`;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
  } else {
    pokemonName.innerHTML = 'Poxa, deu erro :/';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', (event) => {
    if(searchPokemon >1){
    searchPokemon -= 1;
  renderPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', (event) => {
  searchPokemon += 1;
  renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);
