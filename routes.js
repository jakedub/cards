const express = require('express');
const router = express.Router();
const models = require("./models");

//API STUFF
//Get all cards
router.route('/card')
.get(function(req, res){
  models.Card.findAll().then(function(err, card){
    if (err){
      res.send(err);
    } else{
      res.json({card: card_id});
    }

  })
})

//Get all decks
router.route('/decks')
.get(function(req, res){
  models.Deck.findAll().then(function(err, decks){
    if (err){
      res.send(err);
    } else{
      res.json({decks: decks_id});
    }

  })
})

//Create a decks
router.route('/activities')
.post(function(req, res){
  let newDeck = {
    name: req.body.name,
    // performance: req.body.performance,
    // date: req.body.date
  }
  models.Deck.create(newDeck).then(function(err, deck){
    if (err){
      res.send(err);
    } else {
      res.json({deck});
    }
  })
})

//Create a flipcard
router.route('/card')
.post(function(req, res){
  let newCard = {
    // name: req.body.name,
    // performance: req.body.performance,
    // date: req.body.date
  }
  models.Card.create(newCard).then(function(err, card){
    if (err){
      res.send(err);
    } else {
      res.json({card});
    }
  })
})

//Edit Card
router.route('/card/:id')
.put(function(req, res){
  models.Card.update({
    // name: req.body.name
  }, {
    where: {
      // id: req.params.id
    }
  }).then(function(update){
    res.json({message:'Updated Card'});
  })
})


//Delete Cards
router.route('/card/:id')
.delete(function(req, res){
  models.Card.destroy({
    where: {
      id: req.params.id,
    }}, {
      // name: req.body.name,
      // performance: req.body.performance,
      // date: req.body.date,
      // id: req.body.id
    },
  ).then(function(removed){
    res.json({message: 'Deleted card'});
  })
})

// router.get('/hello',
//     passport.authenticate('basic', {session: false}),
//     function (req, res) {
//         res.json({"hello": req.user})
//     }
// );

router.use('/api', router);

module.exports = router;
