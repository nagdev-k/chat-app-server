const User = require('../models/user');

module.exports = {
  index: (req, res) => {
    User.find()
      .then((user) => {
        res.send(user);
      })
  },
  findUser: (req, res) => {
    User.find(req.body)
      .then((user) => {
        console.log('body---', req.body, ' query ', req.query);
        if (user.length === 0) {
          const newUser = new User();
          newUser.username = req.body.username;
          newUser.save()
          .then((user) => {
            res.send(user);
          })
        } else {
          user = [...user, { existing: true }];
          console.log(user);
          res.send(user);
        }
      })
      .catch(() => {
        res.send('Error');
      })
    }
  }
