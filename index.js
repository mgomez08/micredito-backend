const app = require("./app/app");
const port = process.env.PORT || 3900;

const { API_VERSION, HOST } = require("./config/variables");

app.listen(port, () => {
  console.log("######################");
  console.log("###### API REST ######");
  console.log("######################");
  console.log(`http://${HOST}:${port}/api/${API_VERSION}/`);
});
