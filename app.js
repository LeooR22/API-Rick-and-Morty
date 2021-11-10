document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  console.log("obteniendo datos");
  try {
    loadingData(true);

    const res = await fetch("https://rickandmortyapi.com/api/character");
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
};

const loadingData = (estado) => {
  const loading = document.querySelector("#loading");
  if (estado) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};
//
