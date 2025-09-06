const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authenticateToken, getProfile);
router.put('/me', authenticateToken, updateProfile);

<<<<<<< HEAD
export default router;

=======
module.exports = router;
>>>>>>> 023e0233e18ebffa478909b04ae271af9a8767f9
