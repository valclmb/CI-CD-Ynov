// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const mysql = require("mysql2");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
dotenv.config();

const pool = mysql
  .createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
  })
  .promise();

// pool
//   .getConnection()
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch((e) => {
//     console.log("Error connecting to database: ", e);
//   });

const getAllUsers = async function (req, res) {
  const sql = "SELECT * FROM users";
  const [rows] = await pool.query(sql);

  if (!rows.length) {
    return res.status(404).json({ message: "No users found", success: false });
  }

  return res.status(200).json({ users: rows, success: true });
};

const postUsers = async function (req, res) {
  const { firstName, lastName, email, birthDate, city, zipCode } = req.body;
  const sql =
    "INSERT INTO users (firstName, lastName, email,birthDate,city,zipCode) VALUES (?, ?, ?, ?, ?, ?)";
  try {
    await pool.query(sql, [
      firstName,
      lastName,
      email,
      birthDate,
      city,
      zipCode,
    ]);
    return res.status(201).json({ message: "User created", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user" + error, success: false });
  }
};

const router = express.Router();
router.route("/").get(getAllUsers);
router.route("/").post(postUsers);

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(express.json());

app.use(cors(corsOptions));

app.use("/users", router);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = app;
