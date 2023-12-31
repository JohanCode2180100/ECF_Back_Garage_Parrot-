const db = require('../../db/db_config')

exports.createContact = (req, res) => {
  const newFormData = req.body;

  // verification supplémentaire données coté BackEND
  if (
    !newFormData.Name ||
    !newFormData.FirstName ||
    !newFormData.Adress ||
    !newFormData.Email ||
    !newFormData.Phone ||
    !newFormData.Message
  ) {
    return res.status(400).json({
      error: "Toutes les données obligatoires doivent être fournies.",
    });
  }

  const form = {
    ...newFormData,
  };

  const query =
    "INSERT INTO Contact_form (Name,FirstName, Adress, Email,Phone, Message) VALUES (?,?,?,?,?,?)";

  const values = [
    form.Name,
    form.FirstName,
    form.Adress,
    form.Email,
    form.Phone,
    form.Message,
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
