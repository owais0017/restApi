import pool from '../config/db.js';

// Get all tasks for a logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(tasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await pool.query(
      'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, title, description]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Get task ID from URL
    const { title, description, completed } = req.body;

    const updatedTask = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [title, description, completed, id, req.user.id]
    );

    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found or user not authorized.' });
    }

    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.id]);

    if (deleteTask.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found or user not authorized.' });
    }

    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};