const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const {sequelize} = require("./models");

//.........Inport Routes........//
const authRoute = require("./routes/authRoute")
const serviceRoute = require("./routes/serviceRoute");
const bookingRoute = require("./routes/bookingRoute");
const adminPanelRoute = require("./routes/adminPanelRoutes");

app.use(express.json());
//.............Use Routes...//
app.use("/",authRoute);
app.use("/",serviceRoute);
app.use("/",bookingRoute);
app.use("/admin",adminPanelRoute);


// ..........Server Running..........//
const port = process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`Server running on Port:${port}`); 
});