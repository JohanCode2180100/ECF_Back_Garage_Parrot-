const express = require("express");
const router = express.Router();
const contactModels = require("../models/public/contact");
const reviewModels = require("../models/public/review");
const homePageModels = require("../models/public/homePage");
const sectionModels = require("../models/public/section");
const carModels = require("../models/public/second_hand_car");
const hoursModels = require("../models/public/hours");
const homeModels = require("../models/public/home");

/* ------------------------------------------------------------------------------------------
-----------------------------------------PUBLIC ROUTES------------------------------------
--------------------------------------------------------------------------------------------- */

//CONTACT
router.post("/api/contact", contactModels.createContact);

//REVIEW
router.get("/api/review/valid", reviewModels.validatedReview);
router.post("/api/review", reviewModels.createReview);
//HOME PAGE
router.get("/api/section_homePage", homePageModels.getHomepage);
//SECTION
router.get("/api/section", sectionModels.getSection);
//CAR
router.get("/api/second_hand_car/:id", carModels.getCarByID);
router.get("/api/second_hand_car", carModels.getAllCars);

//HOURS
router.get("/api/hours", hoursModels.getHours);
//home heroku
// router.get("/",myTokenRoute, homeModels.getHome);

module.exports = router;
