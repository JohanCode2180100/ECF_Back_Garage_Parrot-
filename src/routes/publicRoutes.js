const express = require("express");
const router = express.Router();
const contactControllers = require("../controllers/public/contact");
const reviewControllers = require("../controllers/public/review");
const homePageControllers = require("../controllers/public/homePage");
const sectionControllers = require("../controllers/public/section");
const carControllers = require("../controllers/public/second_hand_car");
const hoursControllers = require("../controllers/public/hours");

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

module.exports = router;
