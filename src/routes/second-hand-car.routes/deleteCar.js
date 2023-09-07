module.exports = (app, db) => {
  const deleteCarByIdDatabase = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM second_hand_car WHERE second_hand_car_id = ?",
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
  app.delete("/api/second-hand-car/:id", (req, res) => {
    //extraction de l'id passé dans l'url
    const id = req.params.id;
    deleteCarByIdDatabase(id)
      .then((car) => {
        const message = "La voiture a bien été supprimée";
        res.json({ message, car });
      })
      .catch((err) => {
        console.error("erreur lors de la suppression de la voiture", err);
        res.status(500).json({
          err: "une erreur s'est produite lors de la supression de la voiture !!!",
        });
      });
  });
};
