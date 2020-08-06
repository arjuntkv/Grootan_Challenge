const express = require("express");
const connectDB = require("./config/db");
const Data = require("./model/Data");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.get("/", async (req, res) => {
  try {
    const datas = await Data.find({});
    res.json(datas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/", async (req, res) => {
  try {
    const newData = new Data({ data: req.body });

    const data = await newData.save();

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
