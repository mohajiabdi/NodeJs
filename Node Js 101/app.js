import http from "http";
// import fs from 'fs';
// import path from 'path';
import { add, sub, mul, div, pi, goldenRatio } from "./math.js";

const PORT = 4000;
const server = http.createServer((req, res) => {
  res.end(`<p>Sum: ${add(5, 3)}</p>
  <p>Difference: ${sub(5, 3)}</p>
  <p>Product: ${mul(5, 3)}</p>
  <p>Quotient: ${div(5, 3)}</p>
  <p>Pi: ${pi}</p>
  <p>Golden Ratio: ${goldenRatio}</p>`);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
