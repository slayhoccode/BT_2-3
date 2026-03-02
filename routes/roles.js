const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

/**
 * CREATE role
 * POST /api/roles
 */
router.post('/', async (req, res, next) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (err) {
        next(err);
    }
});

/**
 * READ ALL roles
 * GET /api/roles
 */

router.get('/', async (req, res, next) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        next(err);
    }
});

/**
 * READ role by id
 * GET /api/roles/:id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({ message: 'Role not found' });
        res.json(role);
    } catch (err) {
        next(err);
    }
});

/**
 * UPDATE role
 * PUT /api/roles/:id
 */
router.put('/:id', async (req, res, next) => {
    try {
        const role = await Role.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(role);
    } catch (err) {
        next(err);
    }
});

/**
 * DELETE role (soft delete)
 * DELETE /api/roles/:id
 * sá
 */
router.delete('/:id', async (req, res, next) => {
    try {
        await Role.findByIdAndUpdate(req.params.id, { isDeleted: true });
        res.json({ message: 'Role deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
