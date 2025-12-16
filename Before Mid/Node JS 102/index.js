const http = require("http");
// const fetch = require("node-fetch"); // Uncomment if Node < 18

const port = 3000;
const localhost = "localhost";

// Create server
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/") {
      // ✅ Handle root route → getData()
      const products = await getData();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(products));
    } else if (req.url === "/test") {
      // ✅ Handle /test route → getdata2()
      const message = await getdata2();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message }));
    } else if (req.url === "/all") {
      // ✅ Handle /all route → run both functions together with Promise.all()
      const [products, message] = await Promise.all([getData(), getdata2()]);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          messageFromSecondFunction: message,
          products: products,
        })
      );
    } else {
      // ❌ Handle unknown routes
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

// Listen
server.listen(port, localhost, () => {
  console.log(`🚀 Server running at http://${localhost}:${port}`);
});

// ✅ Fetching data from fake factory API server
async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      console.log("✅ Data fetched successfully.");
      return data;
    } else {
      console.error("⚠️ Data format is invalid or empty.");
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    return [];
  }
}

// ✅ Simulated async operation
function getdata2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true;
      if (success) resolve("Howsha ok waye wa laso xliyy ✅");
      else reject("sorry xal wa lowayay ❌");
    }, 3000);
  });
}

// const http = require("http");
// const port = 3000;
// const localhost = "localhost";

// // Create server
// const server = http.createServer(async (req, res) => {
//   try {
//     if (req.url === "/") {
//       // Handle root route "/"
//       const products = await getData();
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(products));
//     } else if (req.url === "/test") {
//       // Handle /test route
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ message: "Hello World" }));
//     } else {
//       // Handle unknown routes
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Not Found" }));
//     }
//   } catch (err) {
//     res.writeHead(500, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: err.message }));
//   }
// });

// // Listen
// server.listen(port, localhost, () => {
//   console.log(`🚀 Server running at http://${localhost}:${port}`);
// });

// // fetching data from fake factory API server
// async function getData() {
//   try {
//     const response = await fetch("https://fakestoreapi.com/products");

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();

//     if (Array.isArray(data) && data.length > 0) {
//       console.log("✅ Data fetched successfully.");
//       return data;
//     } else {
//       console.error("⚠️ Data format is invalid or empty.");
//       return [];
//     }
//   } catch (error) {
//     console.error("❌ Error fetching data:", error.message);
//     return [];
//   }
// }

// function getdata2() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let success = true;
//       if (success) resolve("Howsha ok waye wa laso xliyy");
//       else reject("sorry xal wa lowayay");
//     }, 5000);
//   });
// }
