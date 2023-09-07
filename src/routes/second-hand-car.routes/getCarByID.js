module.exports = (app, db) => {
  const getCarByIdDatabase = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM second_hand_car WHERE second_hand_car_id = ?",
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
  app.get("/api/second-hand-car/:id", (req, res) => {
    //extraction de l'id passé dans l'url
    const id = req.params.id;

    getCarByIdDatabase(id)
      .then((car) => {
        const message = "La voiture a bien été récupérée";
        res.json({ message, car });
      })
      .catch((err) => {
        console.error("erreur lors de la récupération de la voiture", err);
        res.status(500).json({
          err: "une erreur s'est produite lors de la récupération de la voiture !!!",
        });
      });
  });
};
