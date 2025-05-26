async function getRecipes() {
  $("#display").empty();
  let query = $("#input").val(); //get input

  let diet = $("#diet-filter").val();
  let mealType = $("#meal-type-filter").val();

  let APIkey = "9bd998f757544fe9bd44d4fb6d695ce4";
  let numberOfResults = 60;
  let response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${numberOfResults}&apiKey=${APIkey}`
  );

  if (diet) {
    response += `&diet=${diet}`;
  }

  if (mealType) {
    response += `&type=${mealType}`;
  }

  let meal = await response.json(); // gets data out of json so that you can see its contents
  console.log(meal);

  for (let i = 0; i < meal.results.length; i++) {
    $("#display").append(
      `
      <div class="col-12 col-sm-6 col-md-3 mb-4">
        <div class="card" style="width: 100%; border-radius: 15px;">
          <img src="${meal.results[i].image}" class="card-img-top" alt="${meal.results[i].title}" style="height: 180px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${meal.results[i].title}</h5>
            <button type="button" class="btn btn-primary mt-2" style="background-color: orange; border-radius: 50px"; data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getRecipeDescription(${meal.results[i].id})">
              View Recipe
            </button>
          </div>
        </div>
      </div>
      `
    ); //adds each recipe info to the html card
  }
}

async function getRecipeDescription(recipeId) {
  let query = $("#input").val(); //get input
  let APIkey = "9bd998f757544fe9bd44d4fb6d695ce4";
  let response = await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIkey}`
  );
  let meal = await response.json(); // gets data out of json so that you can see its contents
  $("#modal-title").text(meal.title);

  let instructions = meal.instructions || "No instructions available.";

  // split at period followed by space and capital letter
  let steps = instructions.split(/\. (?=[A-Z])/).filter((s) => s.trim() !== "");

  let stepsHTML = "<ol style='text-align: left;'>";
  for (let step of steps) {
    stepsHTML += `<li>${step.trim()}</li>`; // no period at the end
  }
  stepsHTML += "</ol>";

  $("#modal-body").html(stepsHTML);
}

// CHATBOT FROM https://www.geeksforgeeks.org/create-working-chatbot-in-html-css-javascript/
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input button");
const chatbox = document.querySelector(".chatbox");
const initial_prompt = "You are a helpful assistant providing food help from the spoonacular API, always be polite and concise."

let userMessage = "";
const API_KEY ="YOUR API KEY HERE";
//OpenAI Free APIKey
// Use env vars for safety in production

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  chatLi.innerHTML = `<p>${message}</p>`;
  return chatLi;
};

const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1",
      messages: [
         {"role": "system", "content": initial_prompt}, 
        { role: "user", content: userMessage }
      ],
    }),
  };

  fetch(API_URL, requestOptions)
    .then((res) => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    })
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      messageElement.classList.add("error");
      if (error.message.includes("429")) {
        messageElement.textContent =
          "Too many requests. Please wait and try again.";
      } else {
        messageElement.textContent = `Oops! ${error.message}`;
      }
    })
    .finally(() => {
      chatbox.scrollTo(0, chatbox.scrollHeight);
      sendChatBtn.disabled = false;
    });
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Disable button to prevent spam
  sendChatBtn.disabled = true;

  // Append user's message
  chatbox.appendChild(createChatLi(userMessage, "chat-outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Clear input
  chatInput.value = "";

  // Simulate thinking...
  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "chat-incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 500);
};

// Click handler
sendChatBtn.addEventListener("click", handleChat);

// Optional: handle Enter key as Send
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  }
});

function cancel() {
  const chatbot = document.querySelector(".chatBot");
  if (chatbot.style.display !== "none") {
    chatbot.style.display = "none";
    const lastMsg = document.createElement("p");
    lastMsg.textContent = "Thanks for using our Chatbot!";
    lastMsg.classList.add("lastMessage");
    document.body.appendChild(lastMsg);
  }
}









let recipesData;

fetch("recipes.json")
  .then((response) => response.json())
  .then((data) => {
    recipesData = data;

    console.log(recipesData);
    filterRecipes();
  })
  .catch((error) => console.error("Error loading recipes:", error));



function displayRecipes(recipes) {
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = ""; // Clear old results

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
        `;
    recipesContainer.appendChild(recipeCard);
  });
}



function createRecipeCard(recipe) {
  return `
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4"> <!-- Adjusted column size for responsiveness -->
    <div class="card">
        <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}" />
        <div class="card-body">
            <h5 class="card-title">${recipe.name}</h5>
            <p class="card-text">Servings: ${recipe.servings}</p>
            <p class="card-text">Sugar: ${recipe.sugar_g}g, Honey: ${
    recipe.honey_g
  }g</p>
            <p class="card-text">Ingredients: ${recipe.ingredients.join(
              ", "
            )}</p>
        </div>
    </div>
  </div>
  `;
}

// 25 kg increment 10 until 85

// 0.5 weight = sugar in 1 meal

// Filter recipes function
function filterRecipes() {
  // Get user input from the filters
  const weight = parseFloat(document.getElementById("weightFilter").value);
  const servingSize = document.getElementById("servingSizeFilter").value;
  const search = document.getElementById("searchFilter").value.toLowerCase();
  const allergy = document.getElementById("allergyFilter").value.toLowerCase(); // Allergy filter

  // Calculate max sugar based on weight (weight * 0.5)
  const maxSugar = weight ? weight * 0.5 : null;

  console.log("Filtering with:", {
    weight,
    servingSize,
    search,
    maxSugar,
    allergy,
  });

  // Filter the recipes based on the user's input
  const filteredRecipes = recipesData.recipes.filter((recipe) => {
    // Filter by serving size
    const servingSizeMatch = !servingSize || recipe.servings == servingSize;

    // Filter by sugar based on weight * 0.5
    const sugarMatch = !maxSugar || recipe.sugar_g <= maxSugar;

    // Filter by search input (recipe name or ingredients)
    const searchMatch =
      !search ||
      recipe.name.toLowerCase().includes(search) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(search)
      );

    // Filter by allergy input (avoid recipes containing the allergy ingredient)
    const allergyMatch =
      !allergy ||
      !recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(allergy)
      );

    // Return true only if all conditions match
    return servingSizeMatch && sugarMatch && searchMatch && allergyMatch;
  });

  console.log("Filtered Recipes:", filteredRecipes);

  // Update the recipe grid with filtered recipes
  const recipeGrid = document.getElementById("recipeGrid");
  recipeGrid.innerHTML = filteredRecipes.map(createRecipeCard).join("");
}

// Event listeners for filters
document
  .getElementById("weightFilter")
  .addEventListener("input", filterRecipes);
document
  .getElementById("servingSizeFilter")
  .addEventListener("input", filterRecipes);
document
  .getElementById("searchFilter")
  .addEventListener("input", filterRecipes);
document
  .getElementById("allergyFilter")
  .addEventListener("input", filterRecipes);
