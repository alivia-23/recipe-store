/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/recipe.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/recipe.js":
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var appState = {
  isLoggedIn: false,
  recipes: {},
  error: '',
  currentUser: ''
};
var errMsgs = {
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
  var loginElement = document.querySelector('.login');
  var logoutElement = document.querySelector('.logout');
  var newRecipeElement = document.querySelector('.new-recipe');

  if (!appState.isLoggedIn) {
    loginElement.innerHTML = "\n             <input class=\"user-name\" type=\"text\" value=\"\" placeholder=\"Enter your name\"/>\n             <button class=\"login-button\" type=\"button\">Login</button>\n      ";
    logoutElement.innerHTML = '';
    newRecipeElement.innerHTML = '';
  } else {
    loginElement.innerHTML = '';
    logoutElement.innerHTML = "\n                <button class=\"logout-button\" type=\"button\">Logout</button>\n      ";
    newRecipeElement.innerHTML = "\n        <button class=\"new-recipe-button\" type=\"button\">New Recipe</button>\n      ";
  }
}

var loginElement = document.querySelector('.login');
loginElement.addEventListener('click', function (e) {
  if (!e.target.classList.contains('login-button')) {
    return;
  }

  var username = document.querySelector('.user-name').value;
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogin"])(username).then(function () {
    appState.isLoggedIn = true;
    appState.currentUser = username;
    appState.error = '';
    renderLogin();
    renderStatus();
  })["catch"](function (err) {
    appState.isLoggedIn = false;
    renderLogin();
    appState.error = err.error;
    renderStatus();
  });
});
var logoutElement = document.querySelector('.logout');
logoutElement.addEventListener('click', function (e) {
  if (!e.target.classList.contains('logout-button')) {
    return;
  }

  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogout"])().then(function () {
    appState.isLoggedIn = false;
    renderLogin();
    appState.error = '';
    renderStatus();
  })["catch"](function (err) {
    appState.error = err.error();
    renderStatus();
  });
});
var newRecipeElement = document.querySelector('.new-recipe');
newRecipeElement.addEventListener('click', function (e) {
  if (!e.target.classList.contains('new-recipe-button')) {
    return;
  }

  renderNewRecipe();
});

function renderRecipes() {
  var recipes = appState.recipes;
  var displayArea = document.querySelector('.display-area');
  var itemListHtml = Object.keys(recipes).map(function (id) {
    var recipe = recipes[id];
    return "\n      <li class=\"recipe-item\">\n        <form>\n          <input class=\"recipe-title-link\" type=\"submit\" data-id=\"".concat(id, "\" value=\"").concat(recipe.title, "\"></input>\n          <span data-id=\"").concat(id, "\" class=\"recipe-title-author\" > Author: ").concat(recipe.author, " </span>\n        </form>\n      </li>\n    ");
  }).join('\n');
  var html = "<div id=\"recipe-list-div\"><ul class=\"recipe-list\">" + itemListHtml + "</ul></div>";
  displayArea.innerHTML = html;
  var recipeList = document.querySelector('.recipe-list');
  recipeList.addEventListener('click', function (e) {
    e.preventDefault();
    var id = event.target.dataset.id;

    if (event.target.classList.contains('recipe-title-link')) {
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipeDetails"])(id).then(function (recipe) {
        renderRecipe(recipe);
        appState.error = '';
        renderStatus();
      })["catch"](function (err) {
        appState.error = err.error;
        renderStatus();
      });
    }
  });
}

function renderRecipe(recipe) {
  var displayArea = document.querySelector('.display-area');
  var html = "\n    <div class=\"view-recipe-details\">\n      <br><br>\n      <form class=\"view-recipe-details-form\">\n        <span class=\"view-recipe-title\">".concat(recipe.title, "</span><br><br>\n        <label for=\"author\">Author:</label>\n        <span class=\"view-recipe-author\">").concat(recipe.author, "</span><br><br>\n        <label for=\"ingredients\">Ingredients:</label>\n        <span class=\"view-recipe-ingredients\">").concat(recipe.ingredients, "</span><br><br>\n        <label for=\"instructions\">Instructions:</label>\n        <span  class=\"view-recipe-instructions\">").concat(recipe.instructions, "</span><br><br>\n        <button class=\"home-link\" type=\"button\">Return to Home</button>\n      </form>\n    </div>\n  ");
  displayArea.innerHTML = html;
  var homeLink = document.querySelector('.home-link');
  homeLink.addEventListener('click', function () {
    renderRecipes(appState.recipes);
  });
}

function renderNewRecipe() {
  var addRecipeElement = document.querySelector('.display-area');
  var html = "\n      <div class=\"add-recipe-form-div\">\n        <form class=\"add-recipe-form\">\n            <br/><br/>\n            <label for=\"title\">Title:</label>\n            <input class=\"title\" type=\"text\" name=\"title\" placeholder=\"Enter your recipe name\">\n            <br><br>\n            <label for=\"ingredients\"> Ingredients:</label>\n            <br/>\n            <textarea class=\"ingredients\" cols=\"70\" rows=\"7\" placeholder=\"Enter your of ingredients..\" ></textarea>\n            <br><br>\n            <label for=\"instructions\"> Instructions:</label>\n            <br>\n            <textarea class=\"instructions\" cols=\"70\" rows=\"7\" placeholder=\"Enter your instructions..\"></textarea>\n            <br><br>\n            <input class=\"new-recipe-button\" type=\"submit\" value=\"Add\" />\n            <br><br>\n            <button class=\"home-link\" type=\"button\">Return to Home</button>\n        </form>\n      </div>\n    ";
  addRecipeElement.innerHTML = html;
  var addRecipeForm = document.querySelector('.add-recipe-form');
  addRecipeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var title = document.querySelector('.title').value;
    var ingredients = document.querySelector('.ingredients').value;
    var instructions = document.querySelector('.instructions').value;
    Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchAddRecipe"])({
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      author: appState.currentUser
    }).then(function (recipe) {
      appState.recipes[recipe.id] = recipe;
      renderRecipes(appState.recipes);
      appState.error = '';
      renderStatus();
    })["catch"](function (err) {
      appState.error = err.error;
      renderStatus();
    });
  });
  var homeLink = document.querySelector('.home-link');
  homeLink.addEventListener('click', function () {
    renderRecipes(appState.recipes);
  });
}

function renderPage() {
  renderLogin();
  renderRecipes();
} // on load


Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function (response) {
  appState.isLoggedIn = response.isLoggedIn;
  appState.recipes = response.recipes;
  appState.currentUser = response.currentUser;
  renderPage();
})["catch"](function (err) {
  appState.error = err.error;
  renderStatus();
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchLogin, fetchLoginStatus, fetchLogout, fetchRecipeDetails, fetchRecipes, fetchAddRecipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogin", function() { return fetchLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLoginStatus", function() { return fetchLoginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogout", function() { return fetchLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipeDetails", function() { return fetchRecipeDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipes", function() { return fetchRecipes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAddRecipe", function() { return fetchAddRecipe; });
var fetchLogin = function fetchLogin(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};
var fetchLoginStatus = function fetchLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return Promise.reject({
        code: 'promise-error'
      });
    }

    return response.json();
  });
};
var fetchLogout = function fetchLogout() {
  return fetch('/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return;
  });
};
/** fetch a recipe detail **/

var fetchRecipeDetails = function fetchRecipeDetails(id) {
  return fetch("/recipes/".concat(id), {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
/** fetch all recipes **/

var fetchRecipes = function fetchRecipes() {
  return fetch('/recipes', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
/** add a new recipes **/

var fetchAddRecipe = function fetchAddRecipe(recipe) {
  return fetch('/recipes', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(recipe)
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};

/***/ })

/******/ });
//# sourceMappingURL=recipe.js.map