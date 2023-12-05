const express = require("express");
const router = express.Router();
const contactControllers = require("../models/public/contact");
const reviewControllers = require("../models/public/review");
const homePageControllers = require("../models/public/homePage");
const sectionControllers = require("../models/public/section");
const carControllers = require("../models/public/second_hand_car");
const hoursControllers = require("../models/public/hours");
const homeControllers = require("../models/public/home");
/* ------------------------------------------------------------------------------------------
-----------------------------------------PUBLIC ROUTES------------------------------------
--------------------------------------------------------------------------------------------- */

//CONTACT
router.post("/api/contact", contactControllers.createContact);
//REVIEW
router.get("/api/review/valid", reviewControllers.validatedReview);
router.post("/api/review", reviewControllers.createReview);
//HOME PAGE
router.get("/api/home_page", homePageControllers.getHomepage);
//SECTION
router.get("/api/section", sectionControllers.getSection);
//CAR
router.get("/api/second-hand-car", carControllers.getAllCars);
router.get("/api/second-hand-car/:id", carControllers.getCarByID);
//HOURS
router.get("/api/hours", hoursControllers.getHours);
//home heroku
router.get("/", homeControllers.getHome);

module.exports = router;
