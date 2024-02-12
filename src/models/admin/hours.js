const db = require("../../db/db_config");

exports.getHoursId = (req, res) => {
  const getHome_PageByID = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM opening_hours WHERE opening_hours_id = ? ",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  const id = req.params.id;

  getHome_PageByID(id)
    .then((hours) => {
      const message = "Récupération du jour de la semaine";
      res.json({ message, hours });
      console.log(hours);
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération du contenu", err);
      res.status(500).json({
        err: "Une erreur s'est produite lors de la récupération du contenu !!!",
      });
    });
};

exports.updatedHours = (req, res) => {
  const updatedHours = (id, hoursData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE opening_hours SET days = ?, open_AM = ?, close_AM = ?, open_PM = ?, close_PM = ? WHERE opening_hours_id = ?",
        [
          hoursData.days,
          hoursData.open_AM,
          hoursData.close_AM,
          hoursData.open_PM,
          hoursData.close_PM,
          id,
        ],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  const id = parseInt(req.params.id);
  const hoursData = req.body;

  const regexDay = /^[A-Za-z]+$/;
  const regexHours = /^(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if (!regexDay.test(hoursData.days)) {
    return res.status(400).json({ message: "Le contenu n'est pas valide" });
  }
  if (
    !regexHours.test(
      hoursData.open_AM &&
        hoursData.close_AM &&
        hoursData.open_PM &&
        hoursData.close_PM
    )
  ) {
    return res.status(400).json({ message: "Le contenu n'est pas valide" });
  }

  updatedHours(id, hoursData)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(404).json({
          error: `L'horaire de ${hoursData.days} n'a pas été trouvé.`,
        });
      } else {
        const message = `L'horaire de ${hoursData.days} a bien été modifié.`;
        res.json({ message, hoursData });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour des horaires...", error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la mise à jour des horaires.",
      });
    });
};
