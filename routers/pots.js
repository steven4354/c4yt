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

router.get("/:potId", async (req, res, next) => {
  try {
    let potId = parseInt(req.params.potId);

    let rawdata = await fs.readFileSync("./database/pots.json");
    let pots = await JSON.parse(rawdata);

    res.json(pots[potId]);
  } catch (err) {
    console.log(err);
  }
});

router.get("/join", async (req, res, next) => {
  try {
    await exec('/Users/liamkhong/Documents/cryptoHackathon/bcoin/node_modules/.bin/bwallet-cli send --id=coinbase --value=100 --address=SNNX6LjhSDqDbqi9xn3szsgkcDD8mk4u5Bt', (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          console.log("err =>", err)
          return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.json(stdout)
    });
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

    let rawdata = await fs.readFileSync("./database/users.json");
    let users = await JSON.parse(rawdata);

    //add the person to small fishes
    pots[potId].smallFishes.push({
      name: name,
      value: value
    });

    //deduct their account
    users[name] -= value;

    //write to file the new pots
    let potsStr = await JSON.stringify(pots);
    await fs.writeFileSync("./database/pots.json", potsStr);

    let usersStr = await JSON.stringify(users);
    await fs.writeFileSync("./database/users.json", usersStr);

    res.redirect("/pots");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
