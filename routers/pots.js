const express = require("express");
const router = express.Router();
const fs = require("fs");
const { exec } = require('child_process');
const { run } = require('../scripttest.js');

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

// router.get("/:potId", async (req, res, next) => {
//   try {
//     let potId = parseInt(req.params.potId);

//     let rawdata = await fs.readFileSync("./database/pots.json");
//     let pots = await JSON.parse(rawdata);

//     res.json(pots[potId]);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/join", async (req, res, next) => {
  try {
    let receiveAddress;
    await exec('/Users/liamkhong/Documents/cryptoHackathon/bcoin/node_modules/.bin/bwallet-cli account get default --id=pot0 --token=0af0da7af19fe4a96a9bc60ba3345a594b10c8fae38ddac00bba2b6730875096', (err, stdout, stderr) =>{
      if (err) {
        // node couldn't execute the command
        console.log("err =>", err)
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

      stdout = JSON.parse(stdout)

      receiveAddress = stdout.receiveAddress;

      console.log("receiveAddress =>", receiveAddress)

      exec(`/Users/liamkhong/Documents/cryptoHackathon/bcoin/node_modules/.bin/bwallet-cli send --id=coinbase --value=1 --address=${receiveAddress}`, (err, stdout, stderr) => {
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

    })

  } catch (err) {
    console.log(err);
  }
});

// router.get("/join/:potId/:name/:value", async (req, res, next) => {
//   try {
//     let potId = parseInt(req.params.potId);
//     let name = req.params.name;
//     let value = parseInt(req.params.value);

//     let rawdata = await fs.readFileSync("./database/pots.json");
//     let pots = await JSON.parse(rawdata);

//     let rawdata2 = await fs.readFileSync("./database/users.json");
//     let users = await JSON.parse(rawdata2);

//     //add the person to small fishes
//     pots[potId].smallFishes.push({
//       name: name,
//       value: value
//     });

//     //deduct their account
//     users[name] -= value;

//     //write to file the new pots
//     let potsStr = await JSON.stringify(pots);
//     await fs.writeFileSync("./database/pots.json", potsStr);

//     let usersStr = await JSON.stringify(users);
//     await fs.writeFileSync("./database/users.json", usersStr);

//     res.redirect("/pots");
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
