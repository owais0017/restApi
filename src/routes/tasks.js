import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Apply the auth middleware to all routes in this file
router.use(auth);

router.route('/')
  .get(getTasks)       // GET /api/tasks
  .post(createTask);    // POST /api/tasks

router.route('/:id')
  .put(updateTask)      // PUT /api/tasks/123
  .delete(deleteTask);  // DELETE /api/tasks/123

export default router;