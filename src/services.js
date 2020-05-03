export const fetchLogin = (username) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({username}),
  })
  .catch( () => {
    return Promise.reject({error: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return;
  });
};

export const fetchLoginStatus = () => {
  return fetch('/session', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return Promise.reject({ code: 'promise-error' });
    }
    return response.json();
  });
};

export const fetchLogout = () => {
  return fetch('/session', {
    method: 'DELETE',
  })
  .catch( () => {
    return Promise.reject({error: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return;
  });
};
/** fetch a recipe detail **/
export const fetchRecipeDetails = (id) => {
  return fetch(`/recipes/${id}`, {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({error: 'network-error'})
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result));
    }
    return response.json();
  });
};
/** fetch all recipes **/
export const fetchRecipes = () => {
  return fetch('/recipes', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({error: 'network-error'})
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result));
    }
    return response.json();
  });
};

/** add a new recipes **/
export const fetchAddRecipe = (recipe) => {
  return fetch('/recipes', {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    },
    body: JSON.stringify(recipe)
  })
  .catch( () => {
    return Promise.reject({error: 'network-error'})
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result));
    }
    return response.json();
  });
};
