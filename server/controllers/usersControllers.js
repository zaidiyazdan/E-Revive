import bcrypt from 'bcrypt';
import pool from "../database.js";

export const loginUser = async function (req, res) {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const hashedPassword = rows[0].password;

    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      return res
        .status(401)
        .send({ message: "Invalid email or password" });
    }

    res.status(200).send({ message: "Login successful" , data: rows});
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send({ message: "An error occurred while logging in" });
  }
};

export const registerUser = async function (req, res) {
  const { email, address, password, phone, username } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);

  try {
    await pool.query(
      "INSERT INTO users (email, address, password, phone,username) VALUES (?, ?, ?, ?,?)",
      [email, address, hashedPassword, phone,username]
    );
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .send({ message: "An error occurred while registering user" });
  }
};

export const getAllUsers = async function (req, res) {
  try {
    const users = await pool.query("SELECT * FROM users");
    console.log(users[0]);
    return res.status(200).send({
      success: true,
      data: users[0],
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while fetching users.",
    });
  }
};

export const specifiedUser = async function (req, res) {
  // baad mai karege ab
};
