const db = require("../../db/db_config");

exports.getAllReview = (req, res) => {
  const getReviewDatabase = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM review", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  getReviewDatabase()
    .then((reviews) => {
      const message = "Liste des avis recuperes";
      res.json({ message, reviews });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des avis ", err);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la récupération des avis !!!",
      });
    });
};

exports.reviewsPending = (req, res) => {
  const getReviewPendingStatus = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM review WHERE status ='1'", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  getReviewPendingStatus()
    .then((reviewStatus) => {
      const message = "Liste des avis en attente recuperé";
      res.json({ message, reviewStatus });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des avis ", err);
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la récupération des avis en attente de validation!!!",
      });
    });
};

exports.updatedStatus = (req, res) => {
  const updatedStatusReviewByIdDatabase = (id, carData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE review SET status = 2 WHERE review_id = ?",
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
  const id = parseInt(req.params.id);

  updatedStatusReviewByIdDatabase(id)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(404).json({
          error: `L'avis en attente avec l'ID ${id} n'a pas été trouvé.`,
        });
      } else {
        const message = `L'avis avec l'ID ${id} a bien été modifié en Status (2 validé).`;
        res.json({ message });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de l'avis", error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la mise à jour de l'avis.",
      });
    });
};

exports.deleteReview = (req, res) => {
  const deleteReviewByIdDatabase = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM review WHERE review_id = ?",
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
  deleteReviewByIdDatabase(id)
    .then(() => {
      const message = `L'avis ${id} a bien été supprimé`;
      res.json({ message });
    })
    .catch((err) => {
      console.error("erreur lors de la suppression de l'avis", err);
      res.status(500).json({
        err: "une erreur s'est produite lors de la supression de l'avis !!!",
      });
    });
};
