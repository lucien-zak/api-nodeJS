var express = require('express');
var router = express.Router();
const { User, Group } = require('../models');
const { login, auth } = require('../middleware/auth');

// -Une route qui retourne uniquement les noms des groupes (groupe 1, groupe 2, ...)
router.get('/', async (req, res) => {
    try {
      const groups = await Group.findAll({ attributes: ['title'] });
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // - Une route qui retourne les groupes ainsi que les users qui y sont rattachés
  // (uniquement prenom et nom)
  router.get("/users", async (req, res) => {
    try {
      const groups = await Group.findAll({ attributes: ['title'], include : [{ model: User, attributes: ['firstName', 'lastName'] }] });
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  // - Une route qui permet de s'inscrire à un groupe, prend comme paramètre l'id du groupe, et l'utilisateur connecté
  router.put('/subscribe/:id',auth, async (req, res) => {
    const group = await Group.findByPk(req.params.id);
    if (!group) {return res.json({ message: "Le groupe n'éxiste pas" })};
    const user = await User.findByPk(req.user.id);
    if (user.groupId == req.params.id ) {return res.json({ message: "Vous êtes déjà inscrit au groupe : "+ group.title })};
    user.update({ groupId: group.id });
    res.json({ message: 'Vous êtes bien inscrit au groupe : '+ group.title });
});

  
  
  module.exports = router;