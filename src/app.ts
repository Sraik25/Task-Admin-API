import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import config from './config';
import userRouter from './routes/userRoute';
import authRouter from './routes/authRoute';
import projectRouter from './routes/projectRoute';
import taskRouter from './routes/taskRoute';

const app = express();

app.set('port', config.PORT);


app.use(cors())
app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/usuarios', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/proyectos', projectRouter);
app.use('/api/tareas', taskRouter);


export { app };
