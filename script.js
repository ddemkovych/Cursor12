const content = document.querySelector('.content');
const showCharacters = document.querySelector('#showCharacters');
const showPlanets = document.querySelector('#showPlanets');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const BASE_URL = `https://swapi.dev/api/`;
let page = 1;


//Characters
const getCharachters = () => {
  return axios.get(`${BASE_URL}films/4/`).then(
    (res) => {
      return res.data.characters
    }
  ).then((charactersUrl) => {
    let updatedCharactersUrl = [];
    let i = 0;
    while (i < charactersUrl.length) {
      updatedCharactersUrl[i] = charactersUrl[i].replace('http:', 'https:');
      i++;
    }
    return Promise.all(updatedCharactersUrl.map((element) => axios.get(element).then((res) => res.data)));
});
};


const toReproduceCharacters = (characters) => {
content.innerHTML = '';
return characters.map((el) => {
const characterArr = document.createElement('div');
    characterArr.className = 'list';
    characterArr.style.width = '18rem'
    characterArr.innerHTML = `
  <div>
    <h5 >Name : ${el.name}</h5>
    <h6 >Birth day : ${el.birth_year}</h6>
    <p> Gender : ${el.gender}</p>
  </div>`;
    content.append(characterArr);
  });
};


showCharacters.addEventListener('click', () => {
  getCharachters().then(toReproduceCharacters)
});

//Planets
const getPlanets = (page) => {
  const structure = {
    url: `${BASE_URL}planets/`,
    params: {page}
  }
  return axios(structure).then(
    (res) => {
      return res.data.results;
    }); 
};

const toReproducePlanets = (planets) => {
  content.innerHTML = '';
  return planets.forEach(el => {
    const resPlanet = document.createElement('div');
    resPlanet.className = 'list';
    resPlanet.innerHTML = `<h5>Name planet : ${el.name}</h5>`;
      content.append(resPlanet);
  }); 
};


showPlanets.addEventListener('click', () => {
  getPlanets().then(
    toReproducePlanets)
});

prev.addEventListener('click', () => {
     if (page <= 1) {
        return;
  } else {
      getPlanets(--page).then(toReproducePlanets);
  };
});

next.addEventListener('click', () => {
      if (page >= 6) {
        return;
   } else {
      getPlanets(++page).then(toReproducePlanets);
  };
});