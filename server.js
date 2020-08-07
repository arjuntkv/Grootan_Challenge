const express = require("express");
const connectDB = require("./config/db");
const Data = require("./model/Data");
const path = require("path");

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

//Routes
//get
app.get("/data", async (req, res) => {
  try {
    const datas = await Data.find({});
    res.json(datas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//post
app.post("/data", async (req, res) => {
  try {
    const newData = new Data({ data: req.body });

    const data = await newData.save();

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
