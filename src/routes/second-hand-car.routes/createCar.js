//POST SECOND HAND CAR

module.exports = (app, db) => {
  app.post("/api/second-hand-car", (req, res) => {
    const newCarData = req.body;

    const newCar = {
      ...newCarData,
      CreatedAt: new Date(),
    };

    const query =
      "INSERT INTO second_hand_car (Brand, Name, Year, Price, Kilometer, Picture, Description, CreatedAt) VALUES (?,?, ?, ?, ?, ?, ?, NOW())";

    const values = [
      newCar.Brand,
      newCar.Name,
      newCar.Year,
      newCar.Price,
      newCar.Kilometer,
      newCar.Picture,
      newCar.Description,
    ];

    db.promise()
      .execute(query, values)
      .then(([results]) => {
        console.log("Nouvelle voiture insérée avec succès !");
        const message = `Le véhicule ${newCar.Brand} a bien été enregistré`;
        res.json({ message, newCar });
      })
      .catch((err) => {
        console.error("Erreur lors de l'insertion :", err);
        res
          .status(500)
          .json({ error: "Erreur lors de l'insertion en base de données" });
      });
  });
};
