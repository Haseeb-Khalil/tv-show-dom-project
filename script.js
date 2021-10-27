// //You can edit ALL of the code here

// Lets select the body tag
let bodyEl = document.querySelector("body");

// allEpisodes = getAllEpisodes() which gives us all the episodes
let allEpisodes;

///////====SetUp of whole page which includes all the functions=====////////

function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  numberOfDisplayedEpisodes(allEpisodes);
}

window.onload = setup;

/////////////=======/////////////

////====Showing All episodes with this function====/////

function makePageForEpisodes(episodeList) {
  // Shows episodes numbers
  const rootElem = document.getElementById("root");

  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  //bodyEl.appendChild(rootElem);
  rootElem.innerHTML = "";

  // Creating Cards div
  let allCardsDiv = document.createElement("div");

  // setting class to "All-cards"
  allCardsDiv.setAttribute("class", "All-cards");

  // Appending this div to our body of HTML
  rootElem.appendChild(allCardsDiv);

  // Now we will create the title, image and description for each of our
  // episode from our episodeList

  episodeList.forEach((episode) => {
    //== Whatever we create here for a single card we have to append it to our All Cards div ==//

    // Creating single Card div
    let card = document.createElement("div");

    // setting it's class as "show-card"
    card.setAttribute("class", "show-card");

    // Appending it to our card to "allCardsDiv"
    allCardsDiv.appendChild(card);

    // Lets create and image tag for our card
    let image = document.createElement("img");

    // Setting class of our img tag as "card-image"
    image.setAttribute("class", "card-image");

    // lets set the SRC of our image tag
    image.src = episode.image.medium;

    // appending our image to our card
    card.appendChild(image);

    // Lets get our episode and season numbers
    let episodeNum = episode.number;
    let seasonNum = episode.season;

    // As required by instructions we have to add a 0 in front or episode/season number if it is less than 10 i,e: E9 should be = E09
    if (episodeNum < 10) {
      //this will add a 0 before the episode number if it is less than 10
      episodeNum = `0${episodeNum}`;
    }
    if (seasonNum < 10) {
      // this will ad a 0 before the season number if it is less than 10
      seasonNum = `0${seasonNum}`;
    }

    // Lets create a heading which displays Tv show's: name, season number & episode number
    let h3El = document.createElement("h3");

    // Setting class of our h3El as "show-name-number"
    h3El.setAttribute("class", "show-name-number");

    // Setting inner HTML of our h3 which will display an episode's name with it's numbers
    h3El.innerHTML = `${episode.name} - S${seasonNum}${episodeNum}`;

    // Lets append our h3El to our card
    card.appendChild(h3El);

    // Lets Create a paragraph which displays our show's details
    let summaryParagraph = document.createElement("p");

    // setting class of our paragraph as "show-description"
    summaryParagraph.setAttribute("class", "show-description");

    // Setting the inner HTML of our paragraph
    summaryParagraph.innerHTML = episode.summary;

    // Let's append this paragraph to our card
    card.appendChild(summaryParagraph);
  });
}

////====making of search bar===////

// Selecting our search bar
const searchBar = document.getElementById("searchBar");

// adding event listener to search input
searchBar.addEventListener("input", (e) => {
  // getting value of search input and making it lower case
  const searchString = e.target.value.toLowerCase();

  // Using filter method to filter out the episodes which contains search text
  const filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });

  // Calling our function "makePageForEpisodes" which shows the episodes
  // and giving it parameter of our "filteredEpisodes" So it only shows

  makePageForEpisodes(filteredEpisodes);

  numberOfDisplayedEpisodes(filteredEpisodes);

  //console.log(filteredEpisodes);
});

////==== Function showing the number episodes being displayed on screen ====////
function numberOfDisplayedEpisodes(search) {
  // We select the paragraph where our numbers will show
  const displayCount = document.getElementById("totalDisplayed");
  // Getting the length of all episodes
  const totalEpisodesLength = allEpisodes.length;
  // Getting the length of Episodes only showing in search.
  let searchLength = search.length;
  // Inner HTML of our Paragraph
  displayCount.innerHTML = `Showing ${searchLength} out of ${totalEpisodesLength} episode(s).`;
}
