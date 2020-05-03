import {
  fetchLogin,
  fetchLoginStatus,
  fetchLogout,
  fetchRecipes,
  fetchAddRecipe,
  fetchRecipeDetails
} from './services';

const appState = {
  isLoggedIn : false,
  recipes : {},
  error : '',
  currentUser : ''
}
const errMsgs = {
  'network-error': 'There was a problem connecting to the network, try again',
  'bad-login': "Login cannot be empty or contain all whitespaces or 'dog'",
  'missing-uid': 'Please login to continue.',
  'invalid-uid': 'Please login to continue.',
  'bad-recipe-data': 'Please enter all 3 fields of title, ingredients and instructions to add a recipe'
};

function renderStatus() {
  document.querySelector('.status').innerHTML = errMsgs[appState.error] || appState.error;
}

function renderLogin() {
  const loginElement = document.querySelector('.login');
  const logoutElement = document.querySelector('.logout');
  const newRecipeElement = document.querySelector('.new-recipe');
  if(!appState.isLoggedIn ) {
     loginElement.innerHTML = `
             <input class="user-name" type="text" value="" placeholder="Enter your name"/>
             <button class="login-button" type="button">Login</button>
      `;
     logoutElement.innerHTML = '';
     newRecipeElement.innerHTML = '';
  } else {
      loginElement.innerHTML = '';
      logoutElement.innerHTML = `
                <button class="logout-button" type="button">Logout</button>
      `;
      newRecipeElement.innerHTML = `
        <button class="new-recipe-button" type="button">New Recipe</button>
      `;

  }
}

const loginElement = document.querySelector('.login');
loginElement.addEventListener('click', (e) => {
  if(!e.target.classList.contains('login-button')) {
    return;
  }
  const username = document.querySelector('.user-name').value;
  fetchLogin( username )
  .then( () => {
    appState.isLoggedIn = true;
    appState.currentUser = username;
    appState.error = '';
    renderLogin();
    renderStatus();
  })
  .catch( (err) => {
    appState.isLoggedIn = false;
    renderLogin();
    appState.error = err.error;
    renderStatus();
  });
});

const logoutElement = document.querySelector('.logout');
logoutElement.addEventListener('click', (e) => {
   if(!e.target.classList.contains('logout-button')) {
     return;
   }
   fetchLogout()
   .then( () => {
      appState.isLoggedIn = false;
      renderLogin();
      appState.error = '';
      renderStatus();
    })
   .catch( (err) => {
      appState.error = err.error();
      renderStatus();
   });
});

const newRecipeElement = document.querySelector('.new-recipe');
newRecipeElement.addEventListener('click', function(e) {
  if(!e.target.classList.contains('new-recipe-button')) {
    return;
  }
  renderNewRecipe();
});

function renderRecipes() {
  const recipes = appState.recipes;
  const displayArea = document.querySelector('.display-area');
  const itemListHtml = Object.keys(recipes).map( (id) => {
    const recipe = recipes[id];
    return `
      <li class="recipe-item">
        <form>
          <input class="recipe-title-link" type="submit" data-id="${id}" value="${recipe.title}"></input>
          <span data-id="${id}" class="recipe-title-author" > Author: ${recipe.author} </span>
        </form>
      </li>
    `;
  }).join('\n');
  const html = `<div id="recipe-list-div"><ul class="recipe-list">`+itemListHtml+`</ul></div>`
  displayArea.innerHTML = html;
  const recipeList = document.querySelector('.recipe-list');
  recipeList.addEventListener('click', (e) => {
    e.preventDefault();
    const id = event.target.dataset.id;
    if(event.target.classList.contains('recipe-title-link')) {
      fetchRecipeDetails(id)
      .then( (recipe) => {
         renderRecipe( recipe );
         appState.error = '';
         renderStatus();
      })
      .catch( (err) => {
        appState.error = err.error;
        renderStatus();
      });
    }
  })
}

function renderRecipe( recipe ) {
  const displayArea = document.querySelector('.display-area');
  const html = `
    <div class="view-recipe-details">
      <br><br>
      <form class="view-recipe-details-form">
        <span class="view-recipe-title">${recipe.title}</span><br><br>
        <label for="author">Author:</label>
        <span class="view-recipe-author">${recipe.author}</span><br><br>
        <label for="ingredients">Ingredients:</label>
        <span class="view-recipe-ingredients">${recipe.ingredients}</span><br><br>
        <label for="instructions">Instructions:</label>
        <span  class="view-recipe-instructions">${recipe.instructions}</span><br><br>
        <button class="home-link" type="button">Return to Home</button>
      </form>
    </div>
  `;
  displayArea.innerHTML = html;
  const homeLink = document.querySelector('.home-link');
  homeLink.addEventListener('click', () => {
    renderRecipes(appState.recipes);
  });
}

function renderNewRecipe( ) {
  const addRecipeElement = document.querySelector('.display-area');
  const html =  `
      <div class="add-recipe-form-div">
        <form class="add-recipe-form">
            <br/><br/>
            <label for="title">Title:</label>
            <input class="title" type="text" name="title" placeholder="Enter your recipe name">
            <br><br>
            <label for="ingredients"> Ingredients:</label>
            <br/>
            <textarea class="ingredients" cols="70" rows="7" placeholder="Enter your of ingredients.." ></textarea>
            <br><br>
            <label for="instructions"> Instructions:</label>
            <br>
            <textarea class="instructions" cols="70" rows="7" placeholder="Enter your instructions.."></textarea>
            <br><br>
            <input class="new-recipe-button" type="submit" value="Add" />
            <br><br>
            <button class="home-link" type="button">Return to Home</button>
        </form>
      </div>
    `;

  addRecipeElement.innerHTML = html;
  const addRecipeForm = document.querySelector('.add-recipe-form');
  addRecipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('.title').value;
    const ingredients = document.querySelector('.ingredients').value;
    const instructions = document.querySelector('.instructions').value;
    fetchAddRecipe( {
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      author: appState.currentUser
    })
    .then( (recipe) => {
       appState.recipes[recipe.id] = recipe;
       renderRecipes( appState.recipes );
       appState.error = '';
       renderStatus();
    })
    .catch( (err) => {
      appState.error = err.error;
      renderStatus();
    });
  });

  const homeLink = document.querySelector('.home-link');
  homeLink.addEventListener('click', () => {
    renderRecipes(appState.recipes);
  });
}

function renderPage() {
  renderLogin();
  renderRecipes();
}

// on load
fetchLoginStatus()
.then( ( response ) => {
    appState.isLoggedIn = response.isLoggedIn;
    appState.recipes = response.recipes;
    appState.currentUser = response.currentUser;
    renderPage();
})
.catch( (err ) => {
  appState.error = err.error;
  renderStatus();
});
