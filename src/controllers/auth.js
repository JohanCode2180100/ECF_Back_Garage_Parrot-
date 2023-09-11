const bcrypt = require("bcrypt");

module.exports = (app, db) => {
  app.post("/api/login", (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;

    const checkedEmail = "SELECT * FROM admin WHERE Email = ?";

    // Création d'une promesse pour la requête SQL
    const queryPromise = new Promise((resolve, reject) => {
      db.query(checkedEmail, [Email], (err, results) => {
        if (err) {
          console.error("erreur requete", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    queryPromise
      .then((results) => {
        if (results.length === 0) {
          console.error("Email ou mot de passe incorrect");
          return res.redirect("/api/login");
        }
        //je recupere la premiere ligne correspondante de l'array Admin
        const admin = results[0];

        bcrypt
          .compare(Password, admin.Password)
          .then((doMatch) => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.admin = admin;
              return req.session.save((err) => {
                console.log(err);
              });
            }
            const message = "Connexion reussi...";
            res.send(message);
          })
          .catch((err) => {
            console.log(err);
            res.redirect("/login");
          });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/login");
      });
  });
};
