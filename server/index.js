const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sapassword",
  database: "reactmysql",
});

connection.connect(function (err) {
  if (err) {
    console.log("Error connect!", err);
    return;
  }
  console.log("connect success!");
});

// Tiện ích xử lý sql
const queryDatabase = (sql, params, res, successCallback) => {
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    successCallback(results);
  });
};

// Đăng nhập
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? and password = ?";
  queryDatabase(sql, [username, password], res, (results) => {
    if (results.length > 0) {
      res.json({
        id: results[0].id,
        username: results[0].username,
        email: results[0].email,
        password: results[0].password,
        avatar: results[0].avatar,
      });
    } else {
      res.status(401).json({ message: "Invalid username or password!" });
    }
  });
});

// Đăng kí
app.post("/api/register", (req, res) => {
  const { username, email, password, avatar } = req.body;
  const sql = "INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)";
  queryDatabase(sql, [username, email, password, avatar], res, (results) => {
    res.status(201).json({ message: "User resgister susscess!", userId: results.inserId });
  });
});

// Quên mật khẩu
app.post("/api/forgot-pasword", (req, res) => {
  const { email } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  queryDatabase(sql, [email], res, (results) => {
    if (results.length > 0) {
      res.json({ message: "Password reset link has been sent to your email!" });
    } else {
      res.status(404).json({ message: "Email not found!" });
    }
  });
});

// Đổi mật khẩu
app.post("/api/change-pasword", (req, res) => {
  const { newPassword, email } = req.body;
  const sql = "UPDATE users SET password = ? WHERE email = ?";
  queryDatabase(sql, [newPassword, email], res, (results) => {
    if (results.affectedRows > 0) {
      res.json({ message: "Password change successfully!" });
    } else {
      res.status(404).json({ message: "Errorr!" });
    }
  });
});

// Xóa tài khoản
app.post("/api/delete-user", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM users WHERE id = ?";
  queryDatabase(sql, [id], res, (results) => {
    if (results.affectedRows > 0) {
      res.json({ message: "User deleted successfully!" });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
});

// Cập nhật thông tin người dùng
app.post("/api/update-user", (req, res) => {
  const { id, username, email, avatar, password } = req.body;
  const sql = "UPDATE users SET username = ?, email = ?, avatar = ?, password = ? WHERE id = ?";
  queryDatabase(sql, [username, email, avatar, password, id], res, (results) => {
    if (results.affectedRows > 0) {
      res.json({ message: "User information updated successfully!" });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
});

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
