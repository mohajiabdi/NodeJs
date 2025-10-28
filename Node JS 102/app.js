const http = require("http");
// const fetch = require("node-fetch"); // Uncomment if Node < 18

const port = 3000;
const localhost = "localhost";

// Create server
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/") {
      // ✅ Only getData()
      const products = await getData();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(products));
    } else if (req.url === "/test") {
      // ✅  getdata2()
      const [products, message] = await Promise.all([getData(), getdata2()]);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ products, message }));
    } else if (req.url === "/all") {
      // ✅ Use Promise.all() for both getExternalData() and getdata2()
      const [externalData, message] = await Promise.all([
        getExternalData(),
        getdata2(),
      ]);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message,
          externalData,
        })
      );
    } else {
      // ❌ Unknown route
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

// Start server
server.listen(port, localhost, () => {
  console.log(`🚀 Server running at http://${localhost}:${port}`);
});

// ✅ Original getData function (leave it unchanged)
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

// ✅ Fixed and improved getExternalData function
async function getExternalData() {
  try {
    const productsURL = "https://fakestoreapi.com/products";
    const cartsURL = "https://fakestoreapi.com/carts";
    const usersURL = "https://fakestoreapi.com/users";

    // Fetch all at once
    const [productRes, cartRes, userRes] = await Promise.all([
      fetch(productsURL),
      fetch(cartsURL),
      fetch(usersURL),
    ]);

    // Convert to JSON
    const [products, carts, users] = await Promise.all([
      productRes.json(),
      cartRes.json(),
      userRes.json(),
    ]);

    console.log("✅ All external data fetched successfully.");
    return { products, carts, users };
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    return { products: [], carts: [], users: [] };
  }
}

// ✅ getdata2 function (simulated async)
async function getdata2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true;
      if (success) resolve("Howsha ok waye wa laso xliyy ✅");
      else reject("sorry xal wa lowayay ❌");
    }, 3000);
  });
}
