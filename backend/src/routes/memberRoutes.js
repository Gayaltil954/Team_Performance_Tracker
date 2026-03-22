import express from 'express';
import mongoose from 'mongoose';
import Member from '../models/Member.js';
import { requireAuth } from '../middleware/auth.js';
import { toMemberDto } from '../utils/memberDto.js';
import { httpError } from '../utils/httpError.js';

const router = express.Router();

router.use(requireAuth);

function validateCreateInput({ name, role, score }) {
  if (!name?.trim() || !role?.trim()) {
    throw httpError(400, 'Name and role are required');
  }

  if (!Number.isInteger(score) || score < 0 || score > 100) {
    throw httpError(400, 'Score must be an integer between 0 and 100');
  }
}

function validateDelta(delta) {
  if (!Number.isInteger(delta) || Math.abs(delta) !== 5) {
    throw httpError(400, 'Score changes must be exactly +5 or -5');
  }
}

router.get('/', async (req, res, next) => {
  try {
    const members = await Member.find({ managerId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return res.json(members.map(toMemberDto));
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const name = String(req.body?.name || '').trim();
    const role = String(req.body?.role || '').trim();
    const score = Number(req.body?.score ?? 50);
    const department = String(req.body?.department || '').trim();
    const team = String(req.body?.team || '').trim();
    const avatar = String(req.body?.avatar || '').trim();

    validateCreateInput({ name, role, score });

    const member = await Member.create({
      managerId: req.user.id,
      name,
      role,
      score,
      department,
      team,
      avatar,
    });

    return res.status(201).json(toMemberDto(member));
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const delta = Number(req.body?.delta);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw httpError(400, 'Invalid member id');
    }

    validateDelta(delta);

    const member = await Member.findOne({ _id: id, managerId: req.user.id });

    if (!member) {
      throw httpError(404, 'Member not found');
    }

    member.score = Math.max(0, Math.min(100, member.score + delta));
    await member.save();

    return res.json(toMemberDto(member));
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw httpError(400, 'Invalid member id');
    }

    const deleted = await Member.findOneAndDelete({ _id: id, managerId: req.user.id });

    if (!deleted) {
      throw httpError(404, 'Member not found');
    }

    return res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    return next(error);
  }
});

export default router;
