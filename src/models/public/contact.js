const db = require("../../db/db_config");

exports.createContact = (req, res) => {
  const newFormData = req.body;

  if (
    !newFormData.name ||
    !newFormData.firstName ||
    !newFormData.adress ||
    !newFormData.email ||
    !newFormData.phone ||
    !newFormData.message
  ) {
    return res.status(400).json({
      error: "Toutes les données obligatoires doivent être fournies.",
    });
  }

  const form = {
    ...newFormData,
  };

  const query =
    "INSERT INTO Contact_form (name,firstName, adress, email,phone, message) VALUES (?,?,?,?,?,?)";

  const values = [
    form.name,
    form.firstName,
    form.adress,
    form.email,
    form.phone,
    form.message,
  ];

  db.promise()
    .execute(query, values)
    .then(([results]) => {
      console.log("Formulaire en bdd !");
      const message = `Le formulaire a bien été enregistré`;
      res.json({ message, form });
    })
    .catch((err) => {
      console.error("Erreur lors de l'insertion :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de l'insertion en base de données" });
    });
};
