const multer = require("../../../node_modules/multer/index");

const db = require("../../db/db_config");

//REGEX
const regexName = /^[A-Za-z]+$/;
const regexModel = /^[A-Za-z0-9\s-]+$/;
const regexYPK = /^\d+$/;

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image.jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Type MIME invalide");
    if (isValid) {
      error = null;
    }
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage }).single("image");

exports.createCar = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Erreur lors du téléchargement du fichier :", err);
      return res
        .status(500)
        .json({ error: "Erreur lors du téléchargement du fichier" });
    }
    const url = req.protocol + "://" + req.get("host");
    console.log(url);

    const newCarData = req.body;
    const imagePath = url + "/images/" + req.file.filename;

    const newCar = {
      ...newCarData,
      image: imagePath, // chemin de mon image
      CreatedAt: new Date(),
    };

    const query =
      "INSERT INTO second_hand_car (brand, model, year, price, kilometer, image, description, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";

    const values = [
      newCar.brand,
      newCar.model,
      newCar.year,
      newCar.price,
      newCar.kilometer,
      newCar.image,
      newCar.description,
    ];

    //test REGEX

    if (!regexName.test(newCar.brand)) {
      return res.status(400).json({ message: "Le marque n'est pas valide." });
    }
    if (!regexModel.test(newCar.model)) {
      return res.status(400).json({ message: "Le model n'est pas valide." });
    }
    if (!regexYPK.test(newCar.year)) {
      return res
        .status(400)
        .json({ message: "numérique uniquement pour année" });
    }
    if (!regexYPK.test(newCar.price)) {
      return res
        .status(400)
        .json({ message: "numérique uniquement pour prix" });
    }
    if (!regexYPK.test(newCar.kilometer)) {
      return res
        .status(400)
        .json({ message: "numérique uniquement pour kilometre" });
    }

    db.promise()
      .execute(query, values)
      .then(([results]) => {
        console.log("Nouvelle voiture insérée avec succès !");
        const message = `Le véhicule ${newCar.brand} a bien été enregistré`;
        const carWithImagePath = {
          ...newCar,
          image: imagePath,
        };
        res.json({ message, car: carWithImagePath });
      })
      .catch((err) => {
        console.error("Erreur lors de l'insertion :", err);
        res
          .status(500)
          .json({ error: "Erreur lors de l'insertion en base de données" });
      });
  });
};

/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------UPDATED CAR------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
exports.updatedCar = (req, res) => {
  const updatedCarByIdDatabase = (id, carData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE second_hand_car SET brand = ?, model = ?, year = ?, price = ?, kilometer = ?, image = ?, description = ? WHERE second_hand_car_id = ?",
        [
          carData.brand,
          carData.model,
          carData.year,
          carData.price,
          carData.kilometer,
          carData.image,
          carData.description,
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

  if (!regexName.test(carData.brand)) {
    return res.status(400).json({ message: "Le nom n'est pas valide." });
  }
  if (!regexModel.test(carData.model)) {
    return res.status(400).json({ message: "Le nom n'est pas valide." });
  }

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

/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------DELETED CAR------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

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
