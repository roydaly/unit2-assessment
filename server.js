const express = require('express');
const methodOverride = require('method-override');

// needed this? 
const db = require('./models');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////

  
  app.get('/index', function(req, res) {
    db.widget.findAll().then(function(widgets) {
        res.render('index', {widgets});
    });
});

app.post('/', function(req, res) {
    db.widget.create( {
        description: req.body.description,
        quantity: req.body.quantity
    }).then(function(widget) {
        res.redirect('index');
    });   
});

// app.get('/:id', function(req, res) {
//     db.widget.findByPk(req.params.id).then(function(widget) { 
//       res.render('index', {widget, id: parseInt(req.params.id) });
//      });
//     });
  
  app.delete('/:id', function(req, res) {
    db.widget.destroy( {
      where: {id: parseInt(req.params.id)}
    }).then(function(widget) { 
      res.redirect('/index');
    });
  });

// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
