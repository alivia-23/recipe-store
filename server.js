const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const recipeServer = require('./recipe-server');
const { v4: uuidv4 } = require('uuid');
app.use(cookieParser());
app.use(express.static('./public'));

const counter = () => {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
};

const nextId = counter();

/** Login Status **/
app.get('/session', (req, res) => {
  const uid = req.cookies.uid;
  let isLoggedIn = false;
  if(uid && recipeServer.users[uid]) {
    isLoggedIn = true;
  }
  res.json({
    isLoggedIn: isLoggedIn,
    recipes: recipeServer.recipes,
    currentUser: recipeServer.users[uid]
  });
});

/** Login **/
app.post('/session', express.json(), (req, res) => {
  const username = req.body.username;
  if(!username || username.trim().length === 0 || username.trim() === 'dog') {
    res.status(400).json({ error: 'bad-login'});
    return;
  }
  const uid = uuidv4();
  recipeServer.users[uid] = username;
  res.cookie('uid', uid);
  res.sendStatus(200);
});

/** Logout **/
app.delete('/session', (req, res) => {
  const uid = req.cookies.uid;
  if(!uid) {
    res.status(401).json({ error: 'missing-uid'});
    return;
  }
  if(!recipeServer.users[uid]) {
    res.clearCookie('uid');
    res.status(403).json({ error: 'invalid-uid'});
    return;
  }
  delete recipeServer.users[uid];
  res.clearCookie('uid');
  res.sendStatus(200);
});

/** fetch a recipe detail **/
app.get('/recipes/:id', (req, res) => {
  const id = req.params.id;
  res.json(recipeServer.recipes[id]);
});

/** fetch all recipes **/
app.get('/recipes', (req, res) => {
  res.json(recipeServer.recipes);
})

/** add a new recipe **/
app.post('/recipes', express.json(), (req, res) => {
  const uid = req.cookies.uid;
  if(!uid) {
    res.status(401).json({ error: 'missing-uid'});
    return;
  }
  if(!recipeServer.users[uid]) {
    res.clearCookie('uid');
    res.status(403).json({ error: 'invalid-uid'});
    return;
  }
  const recipe = req.body;
  if(!req.body.title || req.body.title.trim().length === 0
     || !req.body.instructions || req.body.instructions.trim().length === 0
     || !req.body.ingredients || req.body.ingredients.trim().length === 0 ) {
    res.status(400).json({ error: 'bad-recipe-data'});
    return;
  }
  const id = nextId();
  recipe['id'] = id;
  recipeServer.recipes[id] = recipe;
  res.json(recipe);
})

app.listen(PORT, () => console.log(`Listening to http://${PORT}`));
