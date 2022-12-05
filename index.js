var express = require('express');
var app = express();
const { User } = require('./models');

//TODO
// - XXXXXXXUne route qui permet à un utilisateur de s’enregistrer en complétant les champs
// prenom, nom, email et un groupe.
// - XXXXXX Une route qui permet à l’utilisateur de se connecter
// - XXXXXX Une route qui retourne tous les utilisateurs dans une liste contenant les champs
// prenom et nom.
// - Une route qui retourne uniquement les noms des groupes (groupe 1, groupe 2, ...)
// - Une route qui retourne les groupes ainsi que les users qui y sont rattachés
// (uniquement prenom et nom)
// - Une route qui permet d’avoir les détails d’un user (nom prenom email groupe)
// - Une route qui permet aux utilisateur de s’ajouter à un groupe
// - Une route qui permet de modifier ses informations (uniquement celles de
// l’utilisateur connecté)
// - Les routes qui permettent de supprimer, modifier un user et sélectionner tous les
// users.
// - Les routes qui permettent d’ajouter, modifier, supprimer un groupe
// - Une route qui permet de modifier les utilisateurs présents dans un groupe
app.use(express.json());

app.get('/', function(req, res) {
  res.send('hello world');
});

//Création utilisateur 
// {
//   "firstname" : "testfirstname",
//   "lastname" : "testlastname",
//   "email" : "testemail",
//   "password" : "testpassword",
//   "groupId" : 1
// }
app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password, groupId } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      groupId
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.errors);
  }
    
});

//Connexion utilisateur
// {
//   "email" : "testemail",
//   "password" : "testpassword"
// }
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
        password
      }
    });
    if (user) {
      res.status(200).json({ message : "Vous êtes connecté"});
    }
    else {
      res.status(404).json({ message: 'Erreur sur le login' });
    }
  }
  catch (error) {
    res.json(error.errors);
  };
});

app.get("/api/users", async (req, res) => {
  const users = await User.findAll({
    attributes: ['firstName', 'lastName']
});
  res.json(users);
});

app.listen(3000, () => console.log('Serveur lancé sur le port 3000 😍'));