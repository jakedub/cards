const path = require('path');
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const routes = require("./routes");
const models = require('./models');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
// const hash = bcrypt.hashSync(password, 8);

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use("/css", express.static("./public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(routes);

passport.use(new BasicStrategy(
  function(name, password, done) {
      const userPassword = users[name];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, name);
  }
));

// models.Card.create(
//   {
//   group: 'news',
//   answer: 'Andrew',
//   question: 'What hurricane do you remember?',
//   success: false
// }).then(function(){
//   return models.Card.findAll();
// }).then(function(card){
//   console.log(card.map(function(card){
//     return card.question;
//   }));
// })

// models.User.create(
//   {
//     name: 'jon',
//     password: 'this'
//   }
// ).then(function(){
//   return models.User.findAll();
// }).then(function(name){
//   console.log(name.map(function(name){
//     return name.name;
//   }));
// })
//
// models.Deck.create({
//   title: 'news'
// }).then(function(){
//   return models.Deck.findAll();
// }).then(function(deck){
//   console.log(deck.map(function(deck){
//     return deck.title;
//   }));
// })

//Login
app.get('/login', function(req, res){
  res.render('login')
});

app.post('/login', function(req, res){
  let name = req.body.name;
  let password = req.body.password;
  console.log(name);
  models.User.findOne({
    where: {
      name: name,
      password: password
    }
  }).then(function(user){
    if (user.password === password){
      req.session.password = password;
      req.session.name = name;
      console.log("Kicking to home page");
      res.redirect('/home');
    } else {
      console.log("Kicking back to register page");
      res.redirect('/register');
    }
  })
})

//Home Page. TODO Needs fleshed out
app.get('/home', function (req,res){
  res.render('index');
})


// app.get('/home/:id', function(req, res){
//   models.User.findById(req.params.id).then(function(something){
//     models.Card.findAll({
//       where:{
//         foreignKey: userId
//       }
//     })
//   })
// })

app.get('/home/:id', function(req, res){
  models.User.findById(req.params.id).then(function(cards){
    models.Card.findAll().then(function(card){
      res.render('index', {data:data});
    })
  })
})


//Logging Out
app.get('/logout', function(req, res){
  req.session.destroy(function(err){})
  res.redirect('/login');
  console.log(req.session);
});


// Register
app.get("/register", function(req,res){
  res.render("register");
})

app.post('/register', function(req,res){
  let newUser = {
    name: req.body.name,
    password: req.body.password
  }
  models.User.create(newUser).then(function(user){
    req.name = user.name;
    req.password = user.password;
    console.log(newUser);
    res.redirect('/login');
  })
});

//New Card. TODO  FIX THIS! CREATE CARD view!
app.get('/card', function(req, res){
  res.render('card')
});

app.post('/', function(req, res){
  let newCard = {
    answer: req.body.answer,
    question: req.body.question,
    success: req.body.success
  }
  models.Card.create(newCard).then(function(card){
    res.redirect('/home')
  })
});

//Delete TODO FIX THIS
app.post("/home/:id/delete", function (req, res) {
  models.Deck.findById(req.params.id).then(function(deck){
    deck.destroy().then(function () {
        res.redirect("/");
      })
    });
});


app.post("/home/:id/delete", function (req, res) {
  models.Card.findById(req.params.id).then(function(card){
    card.destroy().then(function () {
        res.redirect("/");
      })
    });
});


app.listen(3000, function(){
  console.log("Flip those cards!");
})
