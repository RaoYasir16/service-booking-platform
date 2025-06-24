const { User, Service, Booking } = require("../models");

//..........User creates Booking......//
const createBooking = async (req, res) => {
  try {
    const id = req.user.id;
    const { serviceId, date } = req.body;
    const [day, month, year] = date.split("-");
    const newDate = new Date(`${year}-${month}-${day}`);
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({
        message: "Service Not found",
      });
    }

    //......Find User in User Table........//
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        message: "User Not found",
      });
    }

    const existingDate = await Booking.findOne({ where: { date: newDate } });

    if (existingDate) {
      return res.status(400).json({
        message: "You are already book this service in same date",
      });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      providerId: service.userId,
      serviceId,
      date: newDate,
    });

    return res.status(200).json({
      message: "Booking create Successfylly",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//.......Provider update booking Status.........//
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByPk(id);
    if (!booking || booking.providerId !== req.user.id) {
      return res.status(403).json({
        message: "Unothorized to update this booking",
      });
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json({
      message: "Status Updated successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//.........Get current User's bookings...........//
const getUserBooking = async (req, res) => {
  try {
    const userId = req.user.id;

    const userBooking = await Booking.findAll({
      where: { userId },
      include: [
        { model: Service },
        { model: User, as: "provider", attributes: ["name", "email"] },
      ],
    });
    if (userBooking.length === 0) {
      return res.status(404).json({
        message: "Booking Not found",
      });
    }

    return res.status(200).json({
      message: "Bookings fatched successfully",
      userBooking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//..........Get Current Provider's booking...........//
const getProviderBooking = async (req, res) => {
  try {
    const providerId = req.user.id;

    const providerBooking = await Booking.findAll({
      whare: { providerId },
      include: [
        { model: Service },
        { model: User, as: "provider", attributes: ["name", "email"] },
      ],
    });

    if (providerBooking.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      message: "Booking for Provider fatched Successfylly",
      providerBooking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createBooking,
  updateBookingStatus,
  getUserBooking,
  getProviderBooking,
};
