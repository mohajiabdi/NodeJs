const http = require("http");

const formidable = require("formidable");

const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url == "/upload" && req.method.toLowerCase() === "post") {
    const form = new formidable.IncomingForm();

    form.uploadDir = "./uploads";

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });

        res.end("Upload error");

        return;
      }

      console.log("Fields:", fields);

      console.log("Files:", files);

      res.writeHead(200, { "Content-Type": "text/plain" });

      res.end("File uploaded successfully!");
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(`

  <form action="/upload" method="post" enctype="multipart/form-data">

    <input type="file" name="myFile"><br>

    <input type="submit" value="Upload File">

  </form>

`);
  }
});

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
