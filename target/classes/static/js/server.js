const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT id FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (row) {
      res.send('Login Successful');
    } else {
      res.status(401).send('Login Failed');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send('Registration Successful');
      }
    });
  });
  