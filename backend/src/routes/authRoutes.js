import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';
import { httpError } from '../utils/httpError.js';

const router = express.Router();

function validateRegisterInput({ name, email, password }) {
  if (!name?.trim() || !email?.trim() || !password) {
    throw httpError(400, 'Name, email, and password are required');
  }

  if (password.length < 6) {
    throw httpError(400, 'Password must be at least 6 characters long');
  }
}

function validateLoginInput({ email, password }) {
  if (!email?.trim() || !password) {
    throw httpError(400, 'Email and password are required');
  }
}

router.post('/register', async (req, res, next) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    validateRegisterInput({ name, email, password });

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      throw httpError(409, 'Email is already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    validateLoginInput({ email, password });

    const user = await User.findOne({ email });
    if (!user) {
      throw httpError(401, 'Invalid email or password');
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      throw httpError(401, 'Invalid email or password');
    }

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
      },
      env.jwtSecret,
      {
        subject: String(user._id),
        expiresIn: '7d',
      }
    );

    return res.json({
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
