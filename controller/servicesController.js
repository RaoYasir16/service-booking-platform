const { Service } = require("../models");
const { User } = require("../models");
//...............Create Service By Provider...........//
const createService = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const id = req.user.id;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        message: "User Not found",
      });
    }
    const service = await Service.create({
      title,
      description,
      category,
      price,
      userId: req.user.id,
    });

    return res.status(200).json({
      message: "Service Add Successfylly",
      service,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//......... Get All Services Provider User Admin........//
const getAllService = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: {
        model: User,
        attributes: ["id", "name", "email"],
      },
    });
    if (services.length === 0) {
      return res.status(404).json({
        message: "No Service Founded",
      });
    }

    return res.status(200).json({
      message: "Services Fatched Successfuly",
      services,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//.........Provider Get own Services.............//
const getOwnServices = async (req, res) => {
  try {
    const userId = req.user.id;
    const services = await Service.findAll({ where: { userId } });

    if (services.length === 0) {
      return res.status(404).json({
        message: "Your Own services not found. First add services",
      });
    }

    return res.status(200).json({
      message: "Services fatched Successfylly",
      services,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//............Get single Service............//
const getSinglService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findOne({ where: { id } });

    if (!service) {
      return res.status(404).json({
        message: "Service Not found",
      });
    }

    return res.status(200).json({
      message: "Service Fatched Successfylly",
      service,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//...............Update Serves Data.........Provider......//
const updateService = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const updatedData = req.body;

    const existingService = await Service.findOne({ where: { id, userId } });
    if (!existingService) {
      return res.status(401).json({
        message: "Unothorize Request. You cannot own this Service",
      });
    }

    await existingService.update(updatedData);

    return res.status(200).json({
      message: "Service Updated Successfylly",
      existingService,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//..........Provider Delete own Service.........//
const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const service = await Service.findOne({ where: { id, userId } });
    if (!service) {
      return res.status(404).json({
        message: "Service Not found.You not own this service",
      });
    }

    await service.destroy();

    return res.status(200).json({
      message: "Service delete Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createService,
  getAllService,
  getOwnServices,
  getSinglService,
  updateService,
  deleteService,
};
