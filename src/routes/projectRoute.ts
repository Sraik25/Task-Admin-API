import { Router } from 'express';
import { check } from 'express-validator';
import * as projectControl from '../controllers/projectController';
import auth from '../middleware/auth';

const projectRouter = Router();

projectRouter.post(
  '/',
  auth,
  [check('nameProject', 'El nombre es obligatorio').not().isEmpty()],
  projectControl.createProject
);

projectRouter.get('/', auth, projectControl.getProjects);

projectRouter.put(
  '/:id',
  auth,
  [check('nameProject', 'El nombre es obligatorio').not().isEmpty()],
  projectControl.updateProject
);

projectRouter.delete('/:id', auth, projectControl.deleteProject);

export default projectRouter;
