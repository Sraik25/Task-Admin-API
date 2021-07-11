import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import Project from '../models/Project';
import Task from '../models/Task';

export const createTask: RequestHandler = async (req: any, res) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const { projectId } = req.body;

    const actualProject = await Project.findById(projectId);

    if (!actualProject) {
      return res.status(400).json({ msg: 'Projecto no encontrado' });
    }

    if (actualProject.creator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    const task = new Task(req.body);
    await task.save();

    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send('hubo un error');
  }
};

export const getTasks: RequestHandler = async (req: any, res) => {
  try {
    const { projectId } = req.query;

    const actualProject = await Project.findById(projectId);

    if (!actualProject) {
      return res.status(400).json({ msg: 'Projecto no encontrado' });
    }

    if (actualProject.creator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    const tasks = await Task.find({ projectId });

    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send('hubo un error');
  }
};

export const updateTask: RequestHandler = async (req: any, res) => {
  try {
    const { projectId, nameTask, stateTask } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: '!No existe esa tarea' });
    }

    const actualProject = await Project.findById(projectId);

    if (!actualProject) {
      return res.status(400).json({ msg: 'Projecto no encontrado' });
    }

    if (actualProject.creator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    const newTask: any = {};

    if (nameTask) newTask.nameTask = nameTask;

    if (stateTask !== null) newTask.stateTask = stateTask;

    task = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newTask },
      { new: true }
    );

    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send('hubo un error');
  }
};

export const deleteTask: RequestHandler = async (req: any, res) => {
  try {
    const { projectId } = req.query;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: '!No existe esa tarea' });
    }

    const actualProject = await Project.findById(projectId);

    if (!actualProject) {
      return res.status(400).json({ msg: 'Projecto no encontrado' });
    }

    if (actualProject.creator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    await Task.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Tarea Eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
};
