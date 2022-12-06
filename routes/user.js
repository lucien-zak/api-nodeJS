var express = require('express');
var router = express.Router();
const { User, Group } = require('../models');
const { login, auth } = require('../middleware/auth');
const bcrypt = require('bcrypt');

//Création utilisateur 
// {
//   "firstname" : "testfirstname",
//   "lastname" : "testlastname",
//   "email" : "testemail",
//   "password" : "testpassword",
//   "groupId" : 1
// }

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password, groupId } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send('Tous les champs sont obligatoires');
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password : encryptedPassword,
        groupId
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.errors);
    }
  });

  // // Une route qui retourne tous les utilisateurs dans une liste contenant les champs
// // prenom et nom.
router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: ['firstName', 'lastName']
  });
  res.json(users);
});

router.get('/:id', auth ,async (req,res) => {
    const user = await User.findByPk(req.params.id, { include : [{ model: Group, attributes: ['title'] }], attributes: ['firstName', 'lastName', 'email'] });
    if (!user) 
        {return res.json({ message: "L'utilisateur n'éxiste pas" })};
    res.json(user);
});


// //Connexion utilisateur
// // {
// //   "email" : "testemail",
// //   "password" : "testpassword"
// // }
router.post('/login', login);

module.exports = router;
  