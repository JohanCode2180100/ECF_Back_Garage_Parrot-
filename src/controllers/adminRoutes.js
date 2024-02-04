const express = require("express");
const router = express.Router();
const models = require("../models/admin/second_hand_car");
const reviewModels = require("../models/admin/review");
const contactModels = require("../models/admin/contact");
const hoursModels = require("../models/admin/hours");
const homePageModels = require("../models/admin/home_page");
const sectionModels = require("../models/admin/section");
const isAuth = require("../../middleware/is-auth");

/* ------------------------------------------------------------------------------------------
-----------------------------------------ADMIN ROUTES----------------------------------------
--------------------------------------------------------------------------------------------- */

//CAR
router.post("/api/second_hand_car", isAuth, models.createCar);
router.put("/api/second_hand_car/:id", isAuth, models.updatedCar);
router.delete("/api/second_hand_car/:id", isAuth, models.deleteCar);
//REVIEW
router.get("/api/review", isAuth, reviewModels.getAllReview);
router.get("/api/review/pending", isAuth, reviewModels.reviewsPending);
router.put("/api/reviewPending/:id", isAuth, reviewModels.updatedStatus);
router.delete("/api/review/:id", isAuth, reviewModels.deleteReview);
//CONTACT
router.get("/api/contact", isAuth, contactModels.getContact);
router.delete("/api/contact/:id", isAuth, contactModels.deleteContact);
//HOURS
router.get("/api/hours/:id", isAuth, hoursModels.getHoursId);
router.put("/api/hours/:id", isAuth, hoursModels.updatedHours);
//HOME_PAGE
router.get("/api/home_page/:id", isAuth, homePageModels.getHomePageById);
router.put("/api/home_page/:id", isAuth, homePageModels.updatedHomePage);
//SECTION
router.put("/api/section/:id", isAuth, sectionModels.updatedSection);

module.exports = router;
