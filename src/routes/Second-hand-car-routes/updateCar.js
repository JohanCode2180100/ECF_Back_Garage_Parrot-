module.exports = (app, db) => {
  const updatedCarByIdDatabase = (id, carData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE second_hand_car SET Brand = ?, Name = ?, Year = ?, Price = ?, Kilometer = ?, Picture = ?, Description = ? WHERE second_hand_car_id = ?",
        [
          carData.Brand,
          carData.Name,
          carData.Year,
          carData.Price,
          carData.Kilometer,
          carData.Picture,
          carData.Description,
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

  app.put("/api/second-hand-car/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const carData = req.body;

    updatedCarByIdDatabase(id, carData)
      .then((results) => {
        if (results.affectedRows === 0) {
          res
            .status(404)
            .json({ error: `La voiture avec l'ID ${id} n'a pas été trouvée.` });
        } else {
          const message = `La voiture avec l'ID ${id} a bien été modifiée.`;
          res.json({ message, carData });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la voiture", error);
        res.status(500).json({
          error:
            "Une erreur s'est produite lors de la mise à jour de la voiture.",
        });
      });
  });
};
