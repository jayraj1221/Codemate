const express = require('express');
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create Room
router.post('/', authMiddleware.authenticate, roomController.createRoom);

// Get Rooms by Username
router.get('/user/:username', authMiddleware.authenticate, roomController.getRoomsByUsername);

// Add User to Room
router.post('/add-user', authMiddleware.authenticate, roomController.addUserToRoom);

// Add File to Room
router.post('/add-file', authMiddleware.authenticate, roomController.addFileToRoom);

// Add message to room
router.post('/add-message', authMiddleware.authenticate, roomController.addMessagetoRoom);

// Update file of a room
router.put('/update-file', authMiddleware.authenticate, roomController.updateFile);

module.exports = router;