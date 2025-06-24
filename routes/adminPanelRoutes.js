const express = require("express");
const router = express.Router();

const {authMiddleware,authorizeRole} = require("../middleware/authMiddleware");
const {getAllUser,getAllProvider,getAllServices,getAllBooking,deleteUserProvider,deleteService} = require("../controller/adminPanelController");

//..................Admin Get All Users/Providers/Services...........//
router.get("/get-users",authMiddleware,authorizeRole('admin'),getAllUser);

router.get('/get-providers',authMiddleware,authorizeRole("admin"),getAllProvider);

router.get('/get-services',authMiddleware,authorizeRole("admin"),getAllServices);

router.get('/get-bookings',authMiddleware,authorizeRole("admin"),getAllBooking);

//..............Delete User or Provider........//
router.delete("/delete-user/:id", authMiddleware, authorizeRole("admin"), deleteUserProvider);

//.................Delete Services ...........//
router.delete("/delete-services/:id",authMiddleware, authorizeRole("admin"),deleteService)


module.exports = router
