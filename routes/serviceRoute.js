const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  authorizeRole,
} = require("../middleware/authMiddleware");
const {
  createService,
  getAllService,
  getOwnServices,
  getSinglService,
  updateService,
  deleteService,
} = require("../controller/servicesController");

//..............Provider can add the services........//
router.post(
  "/create-service",
  authMiddleware,
  authorizeRole("provider"),
  createService
);

//..........Provider admin & User Get all Services.....//
router.get("/get-services", authMiddleware, getAllService);

//...............Provider Get own Services.....//
router.get(
  "/own-services",
  authMiddleware,
  authorizeRole("provider"),
  getOwnServices
);

//..............Get single Service by ID..........//
router.get("/get-service/:id", authMiddleware, getSinglService);

//.............Provider Update own service........//
router.put(
  "/update-service/:id",
  authMiddleware,
  authorizeRole("provider"),
  updateService
);

//...............Provider Delete own service.....//
router.delete(
  "/delete-service/:id",
  authMiddleware,
  authorizeRole("provider"),
  deleteService
);



module.exports = router;
