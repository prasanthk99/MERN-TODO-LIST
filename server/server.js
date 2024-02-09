const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todoApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User model
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup failed', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, 'secret_key'); // Replace 'secret_key' with a strong secret in production

    res.json({ token });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Protected route example
app.get('/api/todos/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.use('/api/todos', authenticateToken, require('./routes/todoRoutes'));

app.use('/api/data', require('./routes/todoRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
