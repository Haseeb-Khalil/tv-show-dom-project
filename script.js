// //You can edit ALL of the code here

// Lets select the body tag
let bodyEl = document.querySelector("body");
let allEpisodes = getAllEpisodes();

let searchBarWrapper = document.createElement("div");
searchBarWrapper.setAttribute("class", "header");

let formElem = document.createElement("form");
formElem.setAttribute("class", "dropDown-form");
searchBarWrapper.appendChild(formElem);

let dropDown = document.createElement("select");
dropDown.setAttribute("id", "selection");
formElem.appendChild(dropDown);

let options = document.createElement("option");

let searchBar = document.createElement("input");
searchBar.setAttribute("id", "searchBar");
searchBarWrapper.appendChild(searchBar);

let numbers = document.createElement("h4");
searchBarWrapper.appendChild(numbers);

let allCardsDiv = document.createElement("div");

bodyEl.appendChild(searchBarWrapper);

///////====SetUp of whole page which includes all the functions=====////////

function setup() {
  //allEpisodes = getAllEpisodes();
  displayEpisodesCards(allEpisodes);
  numberOfDisplayedEpisodes(allEpisodes);
  createCardsWrapper();
  createDropDown();
  displayFooter();
}

window.onload = setup;

/////////////=======/////////////
function createCardsWrapper() {
  bodyEl.appendChild(allCardsDiv);
  allCardsDiv.setAttribute("class", "All-cards");
}
////====Showing All episodes with this function====/////

function displayEpisodesCards(episodeList) {
  allCardsDiv.innerHTML = "";
  episodeList.forEach((episode) => {
    // Creating single Card div
    let card = document.createElement("div");
    card.setAttribute("class", "show-card");
    allCardsDiv.appendChild(card);

    // Lets create and image tag for our card
    let image = document.createElement("img");
    image.setAttribute("class", "card-image");
    image.src = episode.image.medium;
    card.appendChild(image);

    // Lets create a heading which displays Tv show's: name, season number & episode number
    let episodeNum = episode.number;
    let seasonNum = episode.season;

    if (episodeNum < 10) {
      episodeNum = `0${episode.number}`;
    }
    if (seasonNum < 10) {
      seasonNum = `0${episode.season}`;
    }
    let formatted = `${episode.name} - S${seasonNum}E${episodeNum}`;
    let h3El = document.createElement("h3");
    h3El.setAttribute("class", "show-name-number");
    h3El.innerHTML = `${formatted}`;
    card.appendChild(h3El);

    // Lets Create a paragraph which displays our show's details
    let summaryParagraph = document.createElement("p");
    summaryParagraph.setAttribute("class", "show-description");
    summaryParagraph.innerHTML = episode.summary;
    card.appendChild(summaryParagraph);
  });
}

//// ===Drop down=== ///
function createDropDown() {
  const dropDownArray = [...allEpisodes];
  dropDownArray.unshift({ name: "default" });

  dropDownArray.forEach((episode, index) => {
    let episodeNum = episode.number;
    let seasonNum = episode.season;

    if (episodeNum < 10) {
      episodeNum = `0${episode.number}`;
    }
    if (seasonNum < 10) {
      seasonNum = `0${episode.season}`;
    }
    let formatted = `${episode.name} - S${seasonNum}E${episodeNum}`;
    let options = document.createElement("option");
    options.setAttribute("label", `${formatted}`);
    if (index === 0) {
      options.setAttribute("selected", "selected");
      options.setAttribute("label", `All Episodes`);
    }
    options.setAttribute("value", episode.name);
    dropDown.appendChild(options);
  });
  ////making of search bar
  searchBar.setAttribute("label", "search-Show");
  searchBar.setAttribute("name", "searchBar");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute("placeholder", "Search");
}

// Event Listener for dropDown
dropDown.addEventListener("change", (e) => {
  let selectedOpt = dropDown.value;
  let displaySelectedEpisode = allEpisodes.filter((episode) => {
    return episode.name.includes(selectedOpt);
  });
  if (dropDown.value === "default") {
    displayEpisodesCards(allEpisodes);
  } else {
    displayEpisodesCards(displaySelectedEpisode);
  }
  if (dropDown.value !== "default") {
    numbers.innerHTML = `Showing 1 of 73 Shows.`;
  }
});

// Search Bar event Listener
searchBar.addEventListener("input", (e) => {
  let searchString = e.target.value.toLowerCase();
  let filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });
  // Calling our function "makePageForEpisodes" which shows the episodes
  // and giving it parameter of our "filteredEpisodes" So it only shows
  displayEpisodesCards(filteredEpisodes);

  numberOfDisplayedEpisodes(filteredEpisodes);
});

//// Function showing the number episodes being displayed on screen
function numberOfDisplayedEpisodes(search) {
  //const displayCount = document.getElementById("totalDisplayed");
  let totalEpisodesLength = allEpisodes.length;
  let searchLength = search.length;
  numbers.innerHTML = `Showing ${searchLength} out of ${totalEpisodesLength} episode(s).`;
}

function displayFooter() {
  let footerElem = document.createElement("footer");
  footerElem.setAttribute("class", "maze-tv-footer");
  bodyEl.appendChild(footerElem);
  footerElem.innerHTML = ` <p>
        Source:
        <a href="https://www.tvmaze.com"><em> TVMaze.com </em></a>
      </p>`;
}
