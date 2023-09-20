const express = require("express");
const router = express.Router();
const carControllers = require("../controllers/admin/second_hand_car");
const reviewControllers = require("../controllers/admin/review");
const contactControllers = require("../controllers/admin/contact");
const hoursControllers = require("../controllers/admin/hours");
const homePageControllers = require("../controllers/admin/home_page");
const sectionControllers = require("../controllers/admin/section");
const isAuth = require("../../middleware/is-auth");

/* ------------------------------------------------------------------------------------------
-----------------------------------------ADMIN ROUTES----------------------------------------
--------------------------------------------------------------------------------------------- */
//CAR
router.post("/api/second-hand-car", isAuth, carControllers.createCar);
router.put("/api/second-hand-car/:id", isAuth, carControllers.updatedCar);
router.delete("/api/second-hand-car/:id", isAuth, carControllers.deleteCar);
//REVIEW
router.get("/api/review", isAuth, reviewControllers.getAllReview);
router.get("/api/review/pending", isAuth, reviewControllers.reviewsPending);
router.put("/api/reviewPending/:id", isAuth, reviewControllers.updatedStatus);
router.delete("/api/review/:id", isAuth, reviewControllers.deleteReview);
//CONTACT
router.get("/api/contact", isAuth, contactControllers.getContact);  //ok
router.delete("/api/contact/:id", isAuth, contactControllers.deleteContact);
//HOURS
router.put("/api/hours/:id", isAuth, hoursControllers.updatedHours);
//HOME_PAGE
router.put("/api/home_page", isAuth, homePageControllers.updatedTitle);
//SECTION
router.put("/api/section/:id", isAuth, sectionControllers.updatedSection);

module.exports = router;
