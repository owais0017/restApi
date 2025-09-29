import express from 'express';
import authRoutes from './routes/auth.js'; // Import the auth routes

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Task API! 🎉' });
});

// Use the auth routes for any requests to /api/auth
app.use('/api/auth', authRoutes);

export default app;