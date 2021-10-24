//You can edit ALL of the code here

// Lets select the body tag and create our heading
let bodyEl = document.querySelector("body");

// First we'll create a div tag which will contain our page's heading
let headingDiv = document.createElement("div");
// adding a class "mainHeading" to our div
headingDiv.setAttribute("class", "mainHeading");
// Lets creat our h1 in this div
let h1El = document.createElement("h1");
// text of our h1
h1El.innerHTML = "TV Show Project";
// append the div to body tag
bodyEl.appendChild(headingDiv);
// then append h1 to our div
headingDiv.appendChild(h1El);

function makePageForEpisodes(episodeList) {
  // Shows episodes numbers
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  bodyEl.appendChild(rootElem);

  // Creating Cards div
  let allCardsDiv = document.createElement("div");
  // setting class to "All-cards"
  allCardsDiv.setAttribute("class", "All-cards");
  // Appending this div to our body of HTML
  bodyEl.appendChild(allCardsDiv);

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
  // lets creat a link for maze tv
  let mazeTvFooter = document.createElement("footer");
  mazeTvFooter.setAttribute("class", "maze-tv-footer");
  bodyEl.appendChild(mazeTvFooter);
  let mazeTvLink = document.createElement("a");
  // setting a class for the link
  mazeTvLink.setAttribute("class", "maze-tv");
  // Text of the link
  mazeTvLink.innerHTML = "Source:<em> TVMaze.com </em>";
  // "href" = maze tv website
  mazeTvLink.href = "https://www.tvmaze.com";
  mazeTvFooter.appendChild(mazeTvLink);
}
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

///=== On load call function set up ===///
window.onload = setup;
