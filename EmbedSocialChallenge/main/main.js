const cardContainer = document.querySelector("#card-container");
const loadMoreButton = document.querySelector("#load-more");
const dataUrl = "data.json";

const lightThemeRadio = document.getElementById("lightTheme");
const darkThemeRadio = document.getElementById("darkTheme");

let data;
let startIndex = 0;
let endIndex = 4;

// Load data from JSON file
async function loadData() {
  const response = await fetch(dataUrl);
  data = await response.json();
  renderCards();
}

// Render cards
function renderCards() {
  const cards = data.slice(startIndex, endIndex).map((card) => {
    return `
      <div id="card">
      <img src=${card.profile_image}>
        <img src="${card.image}" alt="${card.name}">
        <h2>${card.name}</h2>
        <img src="/icons/${card.source_type}.svg">
       
        <p>${card.date}</p>
        <div class="likes">
         <i class="heart fa fa-heart-o"></i>
          <span>${card.likes}</span>
        </div>
      </div>
    `;
  });
  cardContainer.insertAdjacentHTML("beforeend", cards.join(""));
  startIndex = endIndex;
  endIndex += 4;

  if (endIndex >= data.length) {
    loadMoreButton.style.display = "none";
  }
}

// Handle like button click
function handleLikeButtonClick(event) {
  const heartIcon = event.target;

  const likesContainer = heartIcon.parentNode.querySelector("span");
  const likesCount = parseInt(likesContainer.textContent);
  const isLiked = heartIcon.classList.contains("fa-heart");

  if (isLiked) {
    heartIcon.classList.remove("fa-heart");
    heartIcon.classList.add("fa-heart-o");

    likesContainer.textContent = likesCount - 1;
  } else {
    heartIcon.classList.remove("fa-heart-o");
    heartIcon.classList.add("fa-heart");

    likesContainer.textContent = likesCount + 1;
  }
}

// Attach event listeners
loadMoreButton.addEventListener("click", renderCards);
cardContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("heart")) {
    handleLikeButtonClick(event);
  }
});

// Load initial data
loadData();

// change theme color
darkThemeRadio.addEventListener("click", () => {
  for (const child of cardContainer.children) {
    child.classList.add("dark-theme");
  }
});

lightThemeRadio.addEventListener("click", () => {
  for (const child of cardContainer.children) {
    child.classList.remove("dark-theme");
  }
});

const colorInput = document.getElementById("cardBackgroundColor");

//change background
colorInput.addEventListener("input", () => {
  cardContainer;
  for (const child of cardContainer.children) {
    child.style.backgroundColor = colorInput.value;
  }
});

const gapInput = document.getElementById("cardSpaceBetween");
//change gap
gapInput.addEventListener("input", () => {
  const newGap = gapInput.value + "px";
  cardContainer.style.columnGap = newGap;
});
