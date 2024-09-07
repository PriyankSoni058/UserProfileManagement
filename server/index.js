const express = require("express");

const config = require("./config/config");

require("./database/mongoose");

// Initialize Express app
const app = express();
const port = config.PORT;
const cors = require("cors");

app.use("/files", express.static("profile"));
app.use(express.json());
app.use(cors());

app.use("/user", require("./routes/user.route"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
