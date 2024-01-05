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
router.get("/api/home_page", homePageModels.getHomepage);
//SECTION
router.get("/api/section", sectionModels.getSection);
//CAR
router.get("/api/second-hand-car", carModels.getAllCars);
router.get("/api/second-hand-car/:id", carModels.getCarByID);
// router.get("/api/second-hand-car/search", carModels.getCarByName);
//HOURS
router.get("/api/hours", hoursModels.getHours);
//home heroku
router.get("/", homeModels.getHome);

module.exports = router;
