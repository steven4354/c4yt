const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", async (req, res, next) => {
  try {
    let rawdata = await fs.readFileSync("./database/pots.json");
    let pots = await JSON.parse(rawdata);

    console.log("pots =>", pots);

    res.json(pots);
  } catch (err) {
    console.log(err);
  }
});

router.get("/join/:potId/:name/:value", async (req, res, next) => {
  try {
    let potId = parseInt(req.params.potId);
    let name = req.params.name;
    let value = parseInt(req.params.value);

    let rawdata = await fs.readFileSync("./database/pots.json");
    let pots = await JSON.parse(rawdata);

    //add the person to small fishes
    pots[potId].smallFishes.push({
      name: name,
      value: value
    });

    //write to file the new pots
    let potsStr = await JSON.stringify(pots);
    await fs.writeFileSync("./database/pots.json", potsStr);

    res.redirect("/pots");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
