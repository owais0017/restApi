import express from 'express';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Task API! 🎉' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); 

export default app;