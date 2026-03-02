const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * CREATE user
 * POST /api/users
 */
router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

/**
 * READ ALL users
 * GET /api/users
 */
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find().populate('role', 'name');
        res.json(users);
    } catch (err) {
        next(err);
    }
});

/**
 * READ user by id
 * GET /api/users/:id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('role');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        next(err);
    }
});

/**
 * UPDATE user
 * PUT /api/users/:id
 */
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(user);
    } catch (err) {
        next(err);
    }
});

/**
 * DELETE user (soft delete)
 * DELETE /api/users/:id
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: false },
            { returnDocument: 'after' }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User disabled (soft delete)' });
    } catch (err) {
        next(err);
    }
});

/**
 * ENABLE user
 * POST /api/users/enable
 */
router.post('/enable', async (req, res, next) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOne({ email, username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = true;
        await user.save();
        res.json({ message: 'User enabled' });
    } catch (err) {
        next(err);
    }
});

/**
 * DISABLE user
 * POST /api/users/disable
 */
router.post('/disable', async (req, res, next) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOne({ email, username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = false;
        await user.save();
        res.json({ message: 'User disabled' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
