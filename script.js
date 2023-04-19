
function Characters(done) {
  const apiUrl = 'https://rickandmortyapi.com/api/character';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const results = data.results.slice(0, 12);
      done(results);
    });
}

function showCharacters(personajes) {
  const main = document.querySelector('.column');

  personajes.forEach(personaje => {
    const div = document.createRange().createContextualFragment(`
      <div class="card booking-card mt-2 mb-4 rounded-bottom" data-name="${personaje.name}">
      <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
        <img src="${personaje.image}" class="img-fluid">
        <a href="#!">
          <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
        </a>
      </div>
      <div class="card-body">
      <h4 class="card-title font-weight-bold"><a>${personaje.name}</a></h4>
      `);

    main.append(div);
  });

  createSelect([{ name: 'Todos' }, ...personajes]);
}

function createSelect(personajes) {
  const select = document.querySelector('#selector');

  personajes.forEach(personaje => {
    const option = document.createElement('option');
    option.value = personaje.name;
    option.text = personaje.name;
    select.add(option);
  });


  select.addEventListener('change', () => {
    const selectedName = select.value;


    const tarjetas = document.querySelectorAll('.column > .card');
    tarjetas.forEach(tarjeta => {
      tarjeta.style.display = (tarjeta.dataset.name === selectedName || selectedName === 'Todos') ? 'block' : 'none';
    });
  });
}

Characters(showCharacters);