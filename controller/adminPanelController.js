const { User, Service, Booking } = require("../models");

//..........Admin fatched All Users..........//
const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: "user" },
      attributes: ["name", "email", "role"],
    });
    if (users.length === 0) {
      return res.status(404).json({
        message: "Users not found",
      });
    }

    return res.status(200).json({
      message: "Users fatched successfylly",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//.........Admin Get All Provider......//
const getAllProvider = async (req, res) => {
  try {
    const providers = await User.findAll({
      where: { role: "provider" },
      attributes: ["name", "email", "role"],
    });

    if (providers.length === 0) {
      return res.status(404).json({
        message: "No Providers found",
      });
    }

    return res.status(200).json({
      message: "Providers fatched Successfully",
      providers,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//..........Get All Services...........//
const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "email", "role"],
        },
      ],
    });

    if (services.length === 0) {
      return res.status(404).json({
        message: "Service Not Found",
      });
    }

    return res.status(200).json({
      message: "Services Fatched Successfully",
      services,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//...........Get All Booking................//
const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email", "role"],
        },
        {
          model: User,
          as: "provider",
          attributes: ["name", "email", "role"],
        },
        {
          model: Service,
          attributes: ["title", "description", "category", "price"],
        },
      ],
    });

    if (bookings.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      message: "Bookings Fatched successfully",
      bookings,
    });
  } catch (error) {
    return res.status({
      message: error.message,
    });
  }
};

//...........Delete Users, Provider............//
const deleteUserProvider = async (req, res) => {
  try {
    const id = req.params.id;

    const record = await User.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Record Not found",
      });
    }

    if (record.role === "user") {
      await record.destroy();
      return res.status(200).json({
        message: "User Delete Successfully",
      });
    }

    if (record.role === "provider") {
      await record.destroy();
      return res.status(200).json({
        message: "Provider and related data delete successfylly",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//...........Delete Service and related data ..........//
const deleteService = async (req, res) => {
  try {
    console.log("hello");
    const id = req.params.id;
    const record = await Service.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Service Not found",
      });
    }

    await record.destroy();

    return res.status(200).json({
      message: "Deleted successfylly",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


//.............Module exports........//
module.exports = {
  getAllUser,
  getAllProvider,
  getAllServices,
  getAllBooking,
  deleteUserProvider,
  deleteService,
};
