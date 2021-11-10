// Getting our structural elements from HTML
const bodyEl = document.getElementById("bodyEl");
const showDropDown = document.getElementById("showSelection");
const episodeDropDown = document.getElementById("episodeSelection");
const searchBar = document.getElementById("search");

// We create some global variables here whose values can be changed later in the code
let allShows;
let allEpisodes;

// Page setup function

function pageSetUp() {
  allShows = getAllShows();
  // Lets Sort our shows
  const sortedShows = allShows.sort((a, b) => {
    return a.name < b.name ? -1 : 1;
  });
  createAllShowsOptions(sortedShows);
  populateCards(sortedShows);
}

window.onload = pageSetUp;

// Lets Get Live Data
function getEpisodes(showId) {
  let givenApi = `https://api.tvmaze.com/shows/${showId}/episodes`;

  return fetch(givenApi).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw `${response.status} ${response.statusText}`;
  });
}

function showCount(search) {
  let countEl = document.getElementById("count");
  let totalEpisode = allEpisodes.length;
  let searchedEpisode = search.length;
  countEl.innerText = `Showing ${searchedEpisode}/ ${totalEpisode} Episodes.`;
  return countEl;
}

function removeShowCount() {
  let countEl = document.getElementById("count");
  countEl.innerHTML = "";
  return countEl;
}
// Writing the name and number in correct syntax
function displayNameNumber(episode) {
  let formattedName;
  let episodeNum = episode.number;
  let seasonNum = episode.season;

  if (episodeNum < 10) {
    episodeNum = `0${episode.number}`;
  }
  if (seasonNum < 10) {
    seasonNum = `0${episode.season}`;
  }
  if (episodeNum || seasonNum) {
    formattedName = `S${seasonNum}E${episodeNum} - ${episode.name}`;
  } else {
    formattedName = episode.name;
  }
  return formattedName;
}

// Search Bar event Listener
searchBar.addEventListener("input", (e) => {
  e.preventDefault();
  //Getting value of searchInput
  let searchString = e.target.value.toLowerCase();
  let searchResult = search(searchString, allEpisodes); // our search result will be input text checked in all episodes
  populateCards(searchResult);
  showCount(searchResult);
});

// function to check if searchInput matches episodes
// It takes two parameters inputText and Episodes we need to perform search on(in this case all episodes)
function search(searchText, allEpisodes) {
  let filteredEpisodes = allEpisodes.filter((episode) => {
    if (episode.summary != undefined) {
      return (
        episode.name.toLowerCase().includes(searchText) ||
        episode.summary.toLowerCase().includes(searchText)
      );
    } else {
      return episode.name.toLowerCase().includes(searchText);
    }
  });
  return filteredEpisodes;
}

// Create a single Option for a show/
function createOneShowOption(show) {
  let option = document.createElement("option");
  option.setAttribute("value", show.id);
  option.innerHTML = show.name;
  return option;
}

// Create options for all shows/
// First we appended an option to show dropdown and we've set its a special Id and Name.
// Then we created option for each show as per above function "createOneShowOption(show)"
function createAllShowsOptions(allShows) {
  showDropDown.appendChild(
    createOneShowOption({ name: "All-Shows", id: "All-Shows" })
  );
  allShows.forEach((show) => {
    let showOption = createOneShowOption(show);
    showDropDown.appendChild(showOption);
  });
}

// Show DropDown Event Listener
showDropDown.addEventListener("change", (e) => {
  let showId = e.target.value;
  if (showId === "All-Shows") {
    // Should display All shows
    populateCards(allShows);
    removeShowCount();
    createAllEpisodesOptions([
      {
        name: "Show selection required",
        id: "Show selection required",
      },
    ]);

    searchBar.disabled = true;
    searchBar.placeholder = "Select a Show to Enable Search !";
  } else {
    // otherwise display shows using showId and live Data
    getEpisodes(showId).then((data) => {
      allEpisodes = data;

      populateCards(allEpisodes);
      showCount(allEpisodes);
      createAllEpisodesOptions(allEpisodes);
      searchBar.disabled = false;
      searchBar.placeholder = "";
    });
  }
});

// Create One Option for Episode
function createOneEpisodeOption(episode) {
  let option = document.createElement("option");
  option.setAttribute("value", episode.id);
  let title = displayNameNumber(episode);
  option.innerHTML = title;
  return option;
}
// Create Options for all episodes
function createAllEpisodesOptions(allEpisodes) {
  episodeDropDown.innerHTML = "";

  allEpisodes.forEach((episode) => {
    let episodeOption = createOneEpisodeOption(episode);
    episodeDropDown.appendChild(episodeOption);
  });
}

// Episode DropDown Event Listener
episodeDropDown.addEventListener("change", (e) => {
  let value = e.target.value;
  location.href = `#${value}`;

  let selectedEpisode = document.getElementById(value);
  selectedEpisode.classList.add("selectedCard");
  setTimeout(() => {
    selectedEpisode.classList.remove("selectedCard");
  }, 3000);
});

// Lets create One Card for a show/episode
function createCard(element) {
  let card = document.createElement("li");
  let cardTitle = document.createElement("h4");
  let cardImage = document.createElement("img");
  let cardDescription = document.createElement("p");
  let link = document.createElement("a");

  card.setAttribute("id", element.id);
  card.setAttribute("class", "single-card");

  cardTitle.setAttribute("class", "card-title");
  let title = displayNameNumber(element); // using our callback function
  cardTitle.innerHTML = title;

  cardImage.setAttribute("class", "card-picture");
  cardImage.src = element.image ? element.image.medium : ""; // it will only show the image if a card has a medium sized image present

  cardDescription.setAttribute("class", "card-detail");
  cardDescription.innerHTML = element.summary;

  link.setAttribute("class", "pageLink");
  link.href = element.url;
  link.target = "_blank";
  link.innerHTML = "Click here to watch";

  card.appendChild(cardTitle);
  card.appendChild(cardImage);
  card.appendChild(link);
  card.appendChild(cardDescription);

  return card;
}

// lets create a function to empty the All cards
function emptyCards(ul) {
  ul.innerHTML = "";
}

function populateCards(array) {
  let ul = document.getElementById("all-cards");
  emptyCards(ul);
  array.forEach((element) => {
    let li = createCard(element);
    ul.appendChild(li);
  });
}
