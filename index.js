var express = require('express');
var app = express();
const userRoute = require('./routes/user');
const groupRoute = require('./routes/group');


//TODO
// - XXXXXXXUne route qui permet à un utilisateur de s’enregistrer en complétant les champs
// prenom, nom, email et un groupe.
// - XXXXXX Une route qui permet à l’utilisateur de se connecter
// - XXXXXX Une route qui retourne tous les utilisateurs dans une liste contenant les champs
// prenom et nom.
// - XXXX Une route qui retourne uniquement les noms des groupes (groupe 1, groupe 2, ...)
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
app.use('/api/users', userRoute);
app.use('/api/groups', groupRoute);

app.listen(3000, () => console.log('Serveur lancé sur le port 3000 😍'));