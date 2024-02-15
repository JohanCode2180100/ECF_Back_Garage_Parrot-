const db = require("../../db/db_config");

exports.createContact = (req, res) => {
  const newFormData = req.body;

  const regexName = /^[a-zA-ZÀ-ÿ\-']+$/;
  const regexAdress = /^[A-Za-z0-9\s-]+$/;
  const regexEmail =
    /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net|fr)/;
  const regexPhone = /^0[1-9]([-. ]?[0-9]{2}){4}$/;
  const regexTextArea = /^[\s\S]*$/;

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

  if (!regexName.test(newFormData.name)) {
    return res.status(400).json({ message: "Le nom n'est pas valide." });
  }
  if (!regexName.test(newFormData.firstName)) {
    return res.status(400).json({ message: "Le prénom n'est pas valide." });
  }
  if (!regexAdress.test(newFormData.adress)) {
    return res.status(400).json({ message: "L'adresse n'est pas valide." });
  }
  if (!regexEmail.test(newFormData.email)) {
    return res.status(400).json({ message: "Le mail n'est pas valide." });
  }
  if (!regexPhone.test(newFormData.phone)) {
    return res.status(400).json({ message: "Le téléphone n'est pas valide." });
  }
  if (!regexTextArea.test(newFormData.message)) {
    return res.status(400).json({ message: "Le texte n'est pas valide." });
  }

  const form = {
    ...newFormData,
  };

  const query =
    "INSERT INTO contact_form (name,firstName, adress, email,phone, message) VALUES (?,?,?,?,?,?)";

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
