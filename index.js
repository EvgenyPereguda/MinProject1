// finction for loading resources by API
async function loadItems(
  selectedType = "",
  selectedAmiiboSeries = "",
  selectedGameSeries = ""
) {
  const types = new Map();
  const gameSeries = new Map();
  const amiiboSeries = new Map();

  clearList("card-list");

  let query = "?";

  if (selectedType) query += `type=${selectedType}`;

  if (selectedAmiiboSeries) query += `&amiiboSeries=${selectedAmiiboSeries}`;

  if (selectedAmiiboSeries) query += `&gameseries=${selectedGameSeries}`;
  
  await fetch(`https://amiiboapi.com/api/amiibo/${query}`)
    .then((response) => response.json())
    .then((json) => {
      json.amiibo.forEach((item) => {
        if (types.has(item.type)) {
          types.set(item.type, types.get(item.type) + 1);
        } else {
          types.set(item.type, 1);
        }

        if (gameSeries.has(item.gameSeries)) {
          gameSeries.set(item.gameSeries, gameSeries.get(item.gameSeries) + 1);
        } else {
          gameSeries.set(item.gameSeries, 1);
        }

        if (amiiboSeries.has(item.amiiboSeries)) {
          amiiboSeries.set(
            item.amiiboSeries,
            amiiboSeries.get(item.amiiboSeries) + 1
          );
        } else {
          amiiboSeries.set(item.amiiboSeries, 1);
        }

        placeCardItem(item.name, item.image, item.gameSeries);
      });
    })
    .catch((response) => {      
      alert(`Response status = ${response.status}, message ${response.statusText}`);
    });

  if (!selectedType)
    loadCategoryItems(Array.from(types.keys()), "amiibo-Types");

  if (!selectedGameSeries)
    loadCategoryItems(Array.from(gameSeries.keys()), "gameseries");

  if (!selectedAmiiboSeries)
    loadCategoryItems(Array.from(amiiboSeries.keys()), "amiiboseries");
}

// Create and place Amiibo info card
function placeCardItem(name, image, gameSeries) {
  const template = document
    .getElementById("card-template")
    .content.cloneNode(true);

  template.querySelector("#card-name").innerText = name;
  template.querySelector("#gameseries-name").innerText = gameSeries;
  template.querySelector(".card-image").src = image;
  template.querySelector(".card-image").alt = `Image of ${name}`;

  document.querySelector("#card-list").appendChild(template);
}

// Clear children list of the target DOM node
function clearList(target) {
  const root = document.getElementById(target);

  while (root.firstChild) {
    root.removeChild(root.lastChild);
  }
}

// Create and fill category list
function loadCategoryItems(array, targetSelect) {
  array.sort();

  clearList(targetSelect);

  placeCategoryItem("", targetSelect);

  array.forEach((item) => placeCategoryItem(item, targetSelect));
}

// Place categoty item into the DOM list
function placeCategoryItem(title, selectionName) {
  const option = document.createElement("option");

  option.value = title;
  option.innerText = title;

  document.querySelector(`#${selectionName}`).appendChild(option);
}

// Show selected type amiibo items
function showSelectedType() {
  const type = document.getElementById("amiibo-Types").value;

  if (type) {
    document.getElementById("amiiboseries").disabled = false;

    document.getElementById("gameseries").disabled = true;
  } else {
    document.getElementById("amiiboseries").disabled = true;

    document.getElementById("gameseries").disabled = true;
  }

  document.getElementById("amiiboseries").value = "";

  document.getElementById("gameseries").value = "";

  loadItems(type);
}

// Show selected AmiiboSeries of amiibo items
function showSelectedAmiiboSeries() {
  const type = document.getElementById("amiibo-Types").value;

  const amiiboseries = document.getElementById("amiiboseries").value;

  if (amiiboseries) {
    document.getElementById("gameseries").disabled = false;
  } else {
    document.getElementById("gameseries").disabled = true;
  }

  loadItems(type, amiiboseries);
}

// Show selected GameSeries of amiibo items
function showSelectedGameSeries() {
  const type = document.getElementById("amiibo-Types").value;

  const amiiboseries = document.getElementById("amiiboseries").value;

  const gameseries = document.getElementById("gameseries").value;

  loadItems(type, amiiboseries, gameseries);
}

// Add event handler for slider click
{
  const navbarToggle = document.getElementById("navbarToggle");
  
  const navbarMenu = document.getElementById("navbarMenu");
  
  navbarToggle.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
  });
}

loadItems();
