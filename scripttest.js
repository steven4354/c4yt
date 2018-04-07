const { exec } = require('child_process');

let run = async () => {
    try {
        // await exec('cd', (err, stdout, stderr) => {
        //     if (err) {
        //       // node couldn't execute the command
        //       return;
        //     }
          
        //     // the *entire* stdout and stderr (buffered)
        //     console.log(`stdout: ${stdout}`);
        //     console.log(`stderr: ${stderr}`);
        //   });
          
        //   await exec('cd /Users/liamkhong/Documents/cryptoHackathon/bcoin/node_modules/.bin', (err, stdout, stderr) => {
        //       if (err) {
        //         // node couldn't execute the command
        //         return;
        //       }
            
        //       // the *entire* stdout and stderr (buffered)
        //       console.log(`stdout: ${stdout}`);
        //       console.log(`stderr: ${stderr}`);
        //   });
          
        let returnStdout;

        await exec('/Users/liamkhong/Documents/cryptoHackathon/bcoin/node_modules/.bin/bwallet-cli --network=simnet --api-key=fddfc2191ffde1c161e91cda0065ad7e8ecb6c4d837c1885b34e27c1c255d5c3e6338e96603cfb52 get', (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              console.log("err =>", err)
              return;
            }
          
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            returnStdout = stdout;
            console.log("returnStdout in exec =>", returnStdout)
        });

        console.log("returnStdout in run =>", returnStdout)

        return returnStdout

        // await exec('./bwallet-cli --network=simnet --api-key=fddfc2191ffde1c161e91cda0065ad7e8ecb6c4d837c1885b34e27c1c255d5c3e6338e96603cfb52 get', (err, stdout, stderr) => {
        //     if (err) {
        //       // node couldn't execute the command
        //       console.log("err =>", err)
        //       return;
        //     }
          
        //     // the *entire* stdout and stderr (buffered)
        //     console.log(`stdout: ${stdout}`);
        //     console.log(`stderr: ${stderr}`);
        // });

        //   await exec('open ./temp.txt', (err, stdout, stderr) => {
        //     if (err) {
        //       // node couldn't execute the command
        //       return;
        //     }
          
        //     // the *entire* stdout and stderr (buffered)
        //     console.log(`stdout: ${stdout}`);
        //     console.log(`stderr: ${stderr}`);
        // });

    } catch (err) {
        console.log("err =>", err)
    }
}

run()

module.exports = {
    run: run,
}