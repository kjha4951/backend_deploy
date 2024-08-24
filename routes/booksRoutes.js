const express = require('express');
const { check, validationResult } = require('express-validator');
const Book = require('../modul/module');
const User=require('../modul/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth=require('../middleware/protected')

const router = express.Router();

router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      user = new User({ email, password });
      await user.save();

      // Generate JWT
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send response with token and message in a single object
      res.status(201).json({ token, message: 'User created successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);


//this is for login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send response with token and message in a single object
      res.status(200).json({ token, message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);



router.get('/',auth, async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books).status(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('title', 'Title must be at least 3 characters long').isLength({ min: 3 }),
    check('author', 'Author is required').not().isEmpty(),
    check('author', 'Author must be at least 3 characters long').isLength({ min: 3 }),
  ],auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author } = req.body;

    try {
      const book = new Book({
        title,
        author,
      });

      // Save the book to the database
      await book.save();

     
      res.status(201).json({ message: "Book added", book });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Duplicate title or author detected.' });
        }
      res.status(500).json({ message: err.message });
      console.error(err);
    }
  }
);

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the book
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
