const express = require("express");
const router = express.Router();
const carControllers = require("../controllers/admin/second_hand_car");
const reviewControllers = require("../controllers/admin/review");
const contactControllers = require("../controllers/admin/contact");
const hoursControllers = require("../controllers/admin/hours");
const homePageControllers = require("../controllers/admin/home_page");
const sectionControllers = require("../controllers/admin/section");

/* ------------------------------------------------------------------------------------------
-----------------------------------------ADMIN ROUTES----------------------------------------
--------------------------------------------------------------------------------------------- */
//CAR
router.post("/api/second-hand-car", carControllers.createCar);
router.put("/api/second-hand-car/:id", carControllers.updatedCar);
router.delete("/api/second-hand-car/:id", carControllers.deleteCar);
//REVIEW
router.get("/api/review", reviewControllers.getAllReview);
router.get("/api/review/pending", reviewControllers.reviewsPending);
router.put("/api/reviewPending/:id", reviewControllers.updatedStatus);
router.delete("/api/review/:id", reviewControllers.deleteReview);
//CONTACT
router.get("/api/contact", contactControllers.getContact);
router.delete("/api/contact/:id", contactControllers.deleteContact);
//HOURS
router.put("/api/hours/:id", hoursControllers.updatedHours);
//HOME_PAGE
router.put("/api/home_page", homePageControllers.updatedTitle);
//SECTION
router.put("/api/section/:id", sectionControllers.updatedSection);

module.exports = router;
