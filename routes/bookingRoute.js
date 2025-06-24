const express = require("express");
const router = express.Router();

const {authMiddleware,authorizeRole} = require("../middleware/authMiddleware")
const {createBooking, updateBookingStatus, getUserBooking, getProviderBooking} = require("../controller/bookingController");

//.................User Book service..........//
router.post("/create-booking",authMiddleware,authorizeRole("user"),createBooking);

//...............Provider Update Booking Status........//
router.put("/booking-status/:id",authMiddleware,authorizeRole("provider"),updateBookingStatus);

//.........Get current User's bookings...........//
router.get("/get-user-booking",authMiddleware,authorizeRole("user"),getUserBooking);

//.............Get current Provider's Bookings.........//
router.get("/get-provider-booking",authMiddleware,authorizeRole("provider"),getProviderBooking)




module.exports = router