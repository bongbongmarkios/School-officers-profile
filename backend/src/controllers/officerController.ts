import { Request, Response } from 'express';
import Officer from '../models/Officer';

// @desc    Get all officers
// @route   GET /api/officers
// @access  Public
export const getOfficers = async (req: Request, res: Response) => {
  try {
    const officers = await Officer.find().populate('user', 'firstName lastName email');
    res.json(officers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get single officer
// @route   GET /api/officers/:id
// @access  Public
export const getOfficer = async (req: Request, res: Response) => {
  try {
    const officer = await Officer.findById(req.params.id).populate('user', 'firstName lastName email');
    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    res.json(officer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Create officer profile
// @route   POST /api/officers
// @access  Private/Admin
export const createOfficer = async (req: Request, res: Response) => {
  try {
    const officer = await Officer.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(officer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Update officer profile
// @route   PUT /api/officers/:id
// @access  Private/Admin
export const updateOfficer = async (req: Request, res: Response) => {
  try {
    const officer = await Officer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    res.json(officer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Delete officer profile
// @route   DELETE /api/officers/:id
// @access  Private/Admin
export const deleteOfficer = async (req: Request, res: Response) => {
  try {
    const officer = await Officer.findByIdAndDelete(req.params.id);
    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    res.json({ message: 'Officer removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 