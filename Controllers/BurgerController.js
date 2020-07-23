const Burger = require('../Models/Burger');

module.exports = class BurgerController{
  // How the Index View
  static index(req, res) {
    Burger.all().then(burgers => {
      res.render('index', {burgers});
    }).catch(err => console.log(err));
  }

  // Store a new Burger
  static store(req, res) {
    let burger = new Burger(req.json);
    burger.save().then(() => res.redirect('/'));
  }

  // Update an existing order
  static update(req, res) {
    Burger.find(req.params.id).then(one => {
      one.finished = true;
      one.save().then(() => res.redirect('/'));
    })
  }
}