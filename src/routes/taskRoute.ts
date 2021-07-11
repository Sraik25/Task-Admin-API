import { Router } from 'express';
import { check } from 'express-validator';
import * as taskControl from '../controllers/taskController';
import auth from '../middleware/auth';

const taskRouter = Router();

taskRouter.get('/', auth, taskControl.getTasks);
taskRouter.post(
  '/',
  auth,
  [
    check('nameTask', 'El nombre es obligatorio').not().isEmpty(),
    check('projectId', 'El nombre es obligatorio').not().isEmpty(),
  ],
  taskControl.createTask
);
taskRouter.put('/:id', auth, taskControl.updateTask);
taskRouter.delete('/:id', auth, taskControl.deleteTask);

export default taskRouter;
