const jokes = [
  { category: "tech", setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs." },
  { category: "tech", setup: "Why did the JavaScript developer go broke?", punchline: "Because he kept using up all his cache." },
  { category: "tech", setup: "Why was the computer cold?", punchline: "It left its Windows open." },
  { category: "tech", setup: "What do you call a computer that sings?", punchline: "A Dell." },
  { category: "tech", setup: "Why did the function break up with the variable?", punchline: "It needed more space to return to itself." },
  { category: "tech", setup: "Why did the developer bring a ladder to work?", punchline: "To reach the high-level language." },
  { category: "school", setup: "Why did the student eat their homework?", punchline: "The teacher said it was a piece of cake." },
  { category: "school", setup: "Why was the maths book sad?", punchline: "It had too many problems." },
  { category: "school", setup: "What kind of school do you go to if you're a surfer?", punchline: "Boarding school." },
  { category: "school", setup: "Why did the student bring a pencil to bed?", punchline: "They wanted to draw the curtains." },
  { category: "school", setup: "What did the calculator say to the student?", punchline: "You can count on me." },
  { category: "school", setup: "Why did the notebook visit the doctor?", punchline: "It felt a little ruled out." },
  { category: "everyday", setup: "I told my suitcase there would be no holidays this year.", punchline: "Now I'm dealing with emotional baggage." },
  { category: "everyday", setup: "Why don't eggs tell jokes?", punchline: "They might crack each other up." },
  { category: "everyday", setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese." },
  { category: "everyday", setup: "Why did the coffee call the police?", punchline: "It got mugged." },
  { category: "everyday", setup: "What do you call a bear with no teeth?", punchline: "A gummy bear." },
  { category: "everyday", setup: "Why did the bicycle fall over?", punchline: "It was two-tired." },
  { category: "everyday", setup: "What did one wall say to the other wall?", punchline: "I'll meet you at the corner." },
  { category: "everyday", setup: "Why did the tomato blush?", punchline: "It saw the salad dressing." }
];

const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const statusEl = document.getElementById("status");
const loadButton = document.getElementById("load-joke");
const saveButton = document.getElementById("save-joke");
const onlineButton = document.getElementById("online-joke");
const clearButton = document.getElementById("clear-favourites");
const favouritesEl = document.getElementById("favourites");
const countEl = document.getElementById("favourite-count");
const categoryEl = document.getElementById("category");
const numberEl = document.getElementById("joke-number");

let currentJoke = null;
let lastJokeIndex = -1;
let favourites = [];

try {
  favourites = JSON.parse(localStorage.getItem("week6-favourite-jokes") || "[]");
  if (!Array.isArray(favourites)) favourites = [];
} catch {
  favourites = [];
}

function saveFavourites() {
  try {
    localStorage.setItem("week6-favourite-jokes", JSON.stringify(favourites));
  } catch {
    statusEl.textContent = "Favourites work only when browser storage is available.";
  }
  renderFavourites();
}

function renderFavourites() {
  favouritesEl.replaceChildren();
  countEl.textContent = String(favourites.length);
  clearButton.disabled = favourites.length === 0;

  if (!favourites.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No favourites yet. Find a joke that makes you smile!";
    favouritesEl.appendChild(empty);
    return;
  }

  favourites.forEach((joke, index) => {
    const card = document.createElement("article");
    card.className = "favourite-card";
    const setup = document.createElement("p");
    setup.textContent = "😂 " + joke.setup;
    const punchline = document.createElement("p");
    punchline.textContent = "👉 " + joke.punchline;
    const remove = document.createElement("button");
    remove.className = "remove-favourite";
    remove.type = "button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      favourites.splice(index, 1);
      saveFavourites();
    });
    card.append(setup, punchline, remove);
    favouritesEl.appendChild(card);
  });
}

function showJoke(joke, message = "Hope that made you smile!") {
  currentJoke = joke;
  setupEl.textContent = joke.setup;
  punchlineEl.textContent = joke.punchline;
  const category = categoryEl.value;
  const pool = jokes.filter(item => category === "all" || item.category === category);
  const position = pool.findIndex(item => item.setup === joke.setup);
  numberEl.textContent = position >= 0 ? `JOKE ${String(position + 1).padStart(2, "0")}` : "FRESH JOKE";
  saveButton.disabled = false;
  statusEl.textContent = message;
}

function nextJoke() {
  const category = categoryEl.value;
  const pool = jokes.filter(joke => category === "all" || joke.category === category);
  if (!pool.length) return;
  let index = Math.floor(Math.random() * pool.length);
  if (pool.length > 1 && index === lastJokeIndex) index = (index + 1) % pool.length;
  lastJokeIndex = index;
  showJoke(pool[index]);
}

async function fetchOnlineJoke() {
  onlineButton.disabled = true;
  statusEl.textContent = "Looking for a fresh joke online…";
  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    if (!data.setup || !data.punchline) throw new Error("Invalid joke");
    showJoke({ setup: data.setup, punchline: data.punchline, category: "online" }, "Fresh joke loaded from the internet!");
  } catch {
    statusEl.textContent = "Online joke unavailable right now. Try “Surprise me” for another joke.";
  } finally {
    onlineButton.disabled = false;
  }
}

saveButton.addEventListener("click", () => {
  if (!currentJoke) return;
  const exists = favourites.some(joke => joke.setup === currentJoke.setup && joke.punchline === currentJoke.punchline);
  if (exists) {
    statusEl.textContent = "Already saved in your favourites.";
    return;
  }
  favourites.unshift({ setup: currentJoke.setup, punchline: currentJoke.punchline });
  saveFavourites();
  statusEl.textContent = "Saved! You can find it in your favourites.";
});

loadButton.addEventListener("click", nextJoke);
onlineButton.addEventListener("click", fetchOnlineJoke);
categoryEl.addEventListener("change", nextJoke);
clearButton.addEventListener("click", () => {
  favourites = [];
  saveFavourites();
  statusEl.textContent = "Your favourites have been cleared.";
});

renderFavourites();
nextJoke();
