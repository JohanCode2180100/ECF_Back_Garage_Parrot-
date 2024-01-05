const db = require("../../db/db_config");

exports.getAllCars = (req, res) => {
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
};

exports.getCarByID = (req, res) => {
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
};

// exports.getCarByName = (req, res) => {
//   const getCarByNameDb = (name) => {
//     return new Promise((resolve, reject) => {
//       db.query(
//         "SELECT * FROM second_hand_car WHERE name = ? OR brand = ?",
//         [name],
//         (error, results) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(results);
//           }
//         }
//       );
//     });
//   };
//   //extraction de l'id passé dans l'url
//   const name = req.params.name;

//   getCarByNameDb(name)
//     .then((car) => {
//       const message = "recherche effectuée";
//       res.json({ message, car });
//     })
//     .catch((err) => {
//       console.error("erreur lors de la récupération de la voiture", err);
//       res.status(500).json({
//         err: "une erreur s'est produite lors de la récupération de la voiture !!!",
//       });
//     });
// };
