const Room = require('../models/Room');
const User = require('../models/User');
const mongoose = require('mongoose')
// Create Room
exports.createRoom = async (req, res) => {
  try {
    const { owner, users, files, messages } = req.body;

    const validOwnerId = new mongoose.Types.ObjectId(String(owner));
    // Check if the owner exists
    const ownerExists = await User.findById(validOwnerId);
    if (!ownerExists) {
      return res.status(404).json({ message: 'Owner does not exist' });
    }

    // Check if all users exist
    const usersExist = await User.find({ _id: { $in: users } });
    if (usersExist.length !== users.length) {
      return res.status(404).json({ message: 'One or more users do not exist' });
    }

    const room = new Room({ owner, users, files, messages });
    await room.save();
    res.status(201).json({ message: 'Room created successfully', room });
  } catch (err) {
    res.status(500).json({ message: 'Error creating room', error: err.message });
  }
};

// Get Rooms by Username
exports.getRoomsByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const rooms = await Room.find({ owner: user._id });
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rooms', error: err.message });
  }
};

// Add User to Room
// check for user already exists
exports.addUserToRoom = async (req, res) => {
  try {
    const { roomId, username } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const validRoomId = new mongoose.Types.ObjectId(String(roomId));
    const room = await Room.findById(validRoomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Check if the user is already in the room
    const isUserInRoom = room.users.some((u) => u._id.equals(user._id));
    if (isUserInRoom) {
      return res.status(400).json({ message: 'User already in room' });
    }
    
    room.users.push(user._id);
    await room.save();

    res.status(200).json({ message: 'User added to room', room });
  } catch (err) {
    res.status(500).json({ message: 'Error adding user to room', error: err.message });
  }
};

// Add File to Room
exports.addFileToRoom = async (req, res) => {
  try {
    // file contains name, content
    const { roomId, file } = req.body;

    const validRoomId = new mongoose.Types.ObjectId(String(roomId));

    const room = await Room.findById(validRoomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Check if file with same exist or not in room
    const isFileInRoom = room.files.some((f) => f.name === file.name);
    if (isFileInRoom) {
      return res.status(400).json({ message: 'File with same already exists' });
    }

    room.files.push(file);
    await room.save();
    
    res.status(200).json({ message: 'File added to room', room });

  } catch (err) {
    res.status(500).json({ message: 'Error adding file to room', error: err.message });
  }
};

// update a file of a room
exports.updateFile = async (req, res) => {
    try {
        const { roomId, fileId, newFile } = req.body;

        // Find the room
        const validRoomId = new mongoose.Types.ObjectId(String(roomId));
        const room = await Room.findById(validRoomId);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        // Find the file in the room
        const fileIndex = room.files.findIndex(file => file.id === fileId);
        if (fileIndex === -1) return res.status(404).json({ message: 'File not found' });

       
        // Check if new file's name exists or not 
        const isFileInRoom = room.files.some((f) => f.name === newFile.name);
        if (isFileInRoom) {
          return res.status(400).json({ message: 'File with same already exists' });
        }
        
        // Update the file
        room.files[fileIndex] = { ...room.files[fileIndex], ...newFile };
        await room.save();

        res.status(200).json({ message: 'File updated successfully', room });

    } catch(err) {
        res.status(500).json({ message: 'Error updating file of a room', error: err.message });
    }
};

// add a message to a room
exports.addMessagetoRoom = async (req, res) => {
    try {
        const { roomId, message } = req.body;

        const validRoomId = new mongoose.Types.ObjectId(String(roomId));
        const room = await Room.findById(validRoomId);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        room.messages.push(message);
        await room.save();

        res.status(200).json({ message: 'Message added to room', room });
    } catch(err) {
        res.status(500).json({ message: 'Error adding message to room', error: err.message });
    }
};