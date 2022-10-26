const request = require('request');
const readline = require('readline');
const fs = require('fs');
const url = process.argv[2];
let localPath = process.argv[3];

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const requestContent = function (url, whenRequestDone) {
  
    request('http://example.edu', (error, response, body) => {
    console.log('error:', error); 
    console.log('statusCode:', response && response.statusCode); 
    if (error === null) whenRequestDone(body)
    else process.exit();
  });
}

const writeContent = function (body) {
  if (fs.existsSync(localPath)) {
    r.question('File is already exists. Rewrite? (y/n) ', (answer) => {
      if (answer === 'n') process.exit();
      else if (answer === 'y') {
        fs.writeFile(`${localPath}`, body, (error) => {
          if (error) throw new Error('Writing is failed!')
          else return console.log(`Downloading is done. Downloaded ${body.length} bytes.`);
        });
        r.close();
      }
    })
  }  

    
  
};
requestContent(url, writeContent);