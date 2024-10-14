async function loadItems(){    

    clearList("card-list");

    await fetch("https://amiiboapi.com/api/amiibo/")
    .then((response) => response.json())
    .then((json) => {

        json.amiibo.forEach((item) => {  

            placeCardItem(item.name, item.image, item.gameSeries)
        }
        );  
    });
}

function placeCardItem(name, image, gameSeries){
    const template = document
      .getElementById("card-template")
      .content.cloneNode(true);
      

      template.querySelector("#card-name").innerText = name;
      template.querySelector("#gameseries-name").innerText = gameSeries;
      template.querySelector(".card-image").src = image;
      template.querySelector(".card-image").alt = `Image of ${name}`;
    
      document.querySelector("#card-list").appendChild(template);
}

function clearList(target) {
        
    const list = document.getElementById(target);

    while (list.firstChild) {
        list.removeChild(list.lastChild);
    }

}

loadItems();