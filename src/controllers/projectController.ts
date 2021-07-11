import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import Project from '../models/Project';

export const createProject: RequestHandler = async (req: any, res) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const project = new Project(req.body);

    project.creator = req.usuario.id;
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send('hubo un error');
  }
};

export const getProjects: RequestHandler = async (req: any, res) => {
  const userId = req.usuario.id;
  console.log(userId);
  try {
    const projects = await Project.find({ creator: userId });
    res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send('hubo un error');
  }
};

export const updateProject: RequestHandler = async (req: any, res) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { nombre } = req.body;
  const newProject: any = {};

  if (nombre) newProject.nombre = nombre;

  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (project.creator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send('hubo un error');
  }
};

export const deleteProject: RequestHandler = async (req: any, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (project.creator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    await Project.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Proyecto Eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
};
