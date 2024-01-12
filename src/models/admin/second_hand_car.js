const db = require("../../db/db_config");

exports.createCar = (req, res) => {
  const newCarData = req.body;

  const newCar = {
    ...newCarData,
    CreatedAt: new Date(),
  };

  const query =
    "INSERT INTO second_hand_car (brand, model, year, price, kilometer, picture, description, createdAt) VALUES (?,?, ?, ?, ?, ?, ?, NOW())";

  const values = [
    newCar.brand,
    newCar.model,
    newCar.year,
    newCar.price,
    newCar.kilometer,
    newCar.picture,
    newCar.description,
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
};

exports.updatedCar = (req, res) => {
  const updatedCarByIdDatabase = (id, carData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE second_hand_car SET brand = ?, model = ?, year = ?, price = ?, kilometer = ?, picture = ?, description = ? WHERE second_hand_car_id = ?",
        [
          carData.Brand,
          carData.Model,
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
};

exports.deleteCar = (req, res) => {
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
  //extraction de l'id passé dans l'url
  const id = req.params.id;
  deleteCarByIdDatabase(id)
    .then((car) => {
      const message = `La voiture ${car} a bien été supprimé`;
      res.json({ message });
    })
    .catch((err) => {
      console.error("erreur lors de la suppression de la voiture", err);
      res.status(500).json({
        err: "une erreur s'est produite lors de la supression de la voiture !!!",
      });
    });
};
