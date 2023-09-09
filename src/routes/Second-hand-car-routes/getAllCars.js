module.exports = (app, db) => {
  const getCarsDatabase = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM second_hand_car", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  app.get("/api/second-hand-car", (req, res) => {
    getCarsDatabase()
      .then((cars) => {
        const message = "La liste des voitures a bien été récupérée";
        res.json({ message, cars });
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des voitures ", err);
        res.status(500).json({
          error:
            "Une erreur s'est produite lors de la récupération des voitures !!!",
        });
      });
  });
};
