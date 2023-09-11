// initializeTables.js
const {
    createImageTableIfNotExists,
    createReviewTableIfNotExists,
    createSecondHandCarTableIfNotExists,
    createContactFormTableIfNotExists,
    createCarContactFormTableIfNotExists,
  } = require("./table");
  
  const { createAdminTableIfNotExists } = require("./User");
  const {
    createOpening_hoursTableIfNotExists,
  } = require("./Opening_hours_table");
  const { createHomePageTableIfNotExists } = require("./homePage_table");
  const { createSectionTableIfNotExists } = require("./section_table");
  
  const initializeTables = () => {
    createAdminTableIfNotExists();
    createReviewTableIfNotExists();
    createSecondHandCarTableIfNotExists();
    createCarContactFormTableIfNotExists();
    createHomePageTableIfNotExists();
    createSectionTableIfNotExists();
    createImageTableIfNotExists();
    createContactFormTableIfNotExists();
    createOpening_hoursTableIfNotExists();
  };
  
  module.exports = initializeTables;