const fs = require("fs");

const readStream = fs.createReadStream("./docs/blog3.txt");
const writeStream = fs.createWriteStream("./docs/blog4.txt");

// readStream.on("data",(chunk)=>{
//   //console.log("new chunk");
//   //console.log(chunk.toString());
//   writeStream.write("\nNEWCHUNK\n")
//   writeStream.write(chunk.toString());
// })

readStream.pipe(writeStream);