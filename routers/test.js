const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const { run } = require('../scripttest.js');

router.get('/', async (req, res, next) => {
  try {

    await exec('/Users/liamkhong/Documents/cryptoHackathon/bcoin/node_modules/.bin/bwallet-cli --network=simnet --api-key=fddfc2191ffde1c161e91cda0065ad7e8ecb6c4d837c1885b34e27c1c255d5c3e6338e96603cfb52 get', (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log("err =>", err)
        return;
      }
    
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      res.send(JSON.stringify(stdout))
    });

  } catch (err) {
    console.log(err);  
  }
})


module.exports = router
