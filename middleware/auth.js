const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models').User;
require('dotenv').config();

const login = async (req,res,next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });
      if (!user) {
        return res.status(404).json({email : 'Utilisateur non trouvé'});
      }
        bcrypt.compare(password, user.password, function(err, result) {
          if (result) {
            const accessToken = JWT.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({message : accessToken});
          } else {
            res.status(401).json({message : 'Mot de passe incorrect'});
          }
        });
      }
    catch (error) {
      res.json(error);
    };
};

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({message : 'Token absent'});
    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({message : 'Token trafiqué'});
      req.user = user;
      next();
    });
};



module.exports = {login, auth};