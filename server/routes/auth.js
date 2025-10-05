import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('status', 'active')
      .maybeSingle();

    if (error || !users) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, users.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        id: users.id,
        email: users.email,
        role: users.role,
        full_name: users.full_name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'Login successful',
      user: {
        id: users.id,
        email: users.email,
        role: users.role,
        full_name: users.full_name
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, role, full_name, phone, status')
      .eq('id', decoded.id)
      .maybeSingle();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
