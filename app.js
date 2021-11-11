document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async (url = "https://rickandmortyapi.com/api/character") => {
  console.log("obteniendo datos");
  try {
    loadingData(true);

    const res = await fetch(url);
    const data = await res.json();
    renderCards(data);
  } catch (error) {
    console.log(error);
  } finally {
    loadingData(false);
  }
};

const renderCards = (data) => {
  const cards = document.querySelector("#cards-dinamicas");
  cards.textContent = "";
  const templateCard = document.querySelector("#template-card").content;
  const fragment = document.createDocumentFragment();
  //   console.log(data);
  data.results.forEach((items) => {
    // console.log(items);
    const clone = templateCard.cloneNode(true);
    clone.querySelector("h5").textContent = items.name;
    clone.querySelector("p").textContent = items.species;
    clone.querySelector(".card-img-top").setAttribute("src", items.image);
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
  renderPaginacion(data.info);
};

const loadingData = (estado) => {
  const loading = document.querySelector("#loading");
  if (estado) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};
const renderPaginacion = (data) => {
  const paginacion = document.querySelector("#paginacion");
  paginacion.textContent = "";
  const templatePaginacion = document.querySelector(
    "#template-paginacion"
  ).content;
  const clone = templatePaginacion.cloneNode(true);

  if (data.prev) {
    clone.querySelector(".btn-outline-secondary").disabled = false;
  } else {
    clone.querySelector(".btn-outline-secondary").disabled = true;
  }

  if (data.next) {
    clone.querySelector(".btn-outline-primary").disabled = false;
  } else {
    clone.querySelector(".btn-outline-primary").disabled = true;
  }

  paginacion.appendChild(clone);

  paginacion.addEventListener("click", (e) => {
    if (e.target.matches(".btn-outline-primary")) {
      if (data.next) {
        fetchData(data.next);
      }
    }
    if (e.target.matches(".btn-outline-secondary")) {
      if (data.prev) {
        fetchData(data.prev);
      }
    }
  });
};
