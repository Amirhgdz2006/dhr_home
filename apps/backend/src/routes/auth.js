// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const { secret, expiresIn } = require('../config/jwt');
// const { hashPassword } = require('../plugin/hashPassword');
// const { verifyPassword } = require('../plugin/hashPassword');

// // Register
// router.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await hashPassword(password);

//     const user = new User({username,password: hashedPassword});

//     await user.save();
//     res.json({ message: 'User registered' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//     const isMatch = await verifyPassword(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn });
    
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 24 * 60 * 60 * 1000
//     });

//     res.json({ message: 'Logged in successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// // Logout
// router.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.json({ message: 'Logged out' });
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateBody, schemas } = require('../validators');

router.post('/register', validateBody(schemas.registerSchema), authController.register);
router.post('/login', validateBody(schemas.loginSchema), authController.login);
router.post('/logout', authController.logout);

module.exports = router;
