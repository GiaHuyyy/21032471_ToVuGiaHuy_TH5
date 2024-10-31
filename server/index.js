const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sapassword',
  database: 'reactmysql'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Tiện ích xử lý các truy vấn cơ sở dữ liệu
const queryDatabase = (sql, params, res, successCallback) => {
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    successCallback(results);
  });
};

// Lấy danh sách người dùng
app.get('/api/users', (req, res) => {
  const sql = "SELECT * FROM users";
  queryDatabase(sql, [], res, (results) => {
    res.json({ users: results });
  });
});

// Đăng ký người dùng
app.post('/api/register', (req, res) => {
  const { username, email, password, avatar } = req.body;
  const sql = "INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)";
  queryDatabase(sql, [username, email, password, avatar], res, (results) => {
    res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
  });
});

// Đăng nhập người dùng
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  queryDatabase(sql, [username, password], res, (results) => {
    if (results.length > 0) {
      res.json({ avatar: results[0].avatar, username: results[0].username });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

// Quên mật khẩu
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  queryDatabase(sql, [email], res, (results) => {
    if (results.length > 0) {
      res.json({ message: 'Password reset link has been sent to your email.' });
    } else {
      res.status(404).json({ message: 'Email not found' });
    }
  });
});

// Đổi mật khẩu
app.post('/api/change-password', (req, res) => {
  const { email, newPassword } = req.body;
  const sql = "UPDATE users SET password = ? WHERE email = ?";
  queryDatabase(sql, [newPassword, email], res, (results) => {
    if (results.affectedRows > 0) {
      res.json({ message: 'Password changed successfully.' });
    } else {
      res.status(404).json({ message: 'Email not found' });
    }
  });
});

// Khởi động server
app.listen(4000, () => {
  console.log('App listening on port 4000');
});