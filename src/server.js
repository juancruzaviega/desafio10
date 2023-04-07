import config from './config/config.js';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import initializeStrategies from './config/passport-config.js';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import passport from 'passport';
import path from 'path';
import pkg from 'winston';
import router from './routes/info.js'
import routerPost from './routes/posts/usersPost.js';
import routes from './src/routes/routes.js';
import routesCarrito from './src/routes/carritoroute.js';
import session from 'express-session';
import viewUser from './routes/viewUsers.js'
import __dirname from './utils.js';
import { addLoger, levels } from './middleware/loggers.js';

dotenv.config()
const { logger } = pkg;
const app = express();
const PORT = process.env.PORT || 8080;
// const MONGO_URL = process.env.MONGO_URL;
const connection = mongoose.connect(MONGO_URL);

// app.use(session({
//     store: MongoStore.create({
//         mongoUrl: MONGO_URL,
//         mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//     }),
//     secret: 'tienda',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 30000 }
// }))

initializeStrategies();
app.use(passport.initialize());
app.use(passport.session());


const hbs = handlebars.create({
    layoutsDir: path.join(__dirname, '/src/views/layout'),
    extname: 'handlebars'
})

app.engine('handlebars', hbs.engine);
app.set('views', path.join(`${__dirname}/src/views`));
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/src/public`));
app.use(express.static(`${__dirname}/src/assets`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/', viewUser)
app.use('/api/sessions', routerPost);
// app.use('/api/randoms', routerApi);
app.use('/info', router);
app.use(routes);
app.use(routesCarrito);

app.use(addLoger);

app.get('/pruebaLogger', (req, res) => {
    levels;
    res.send("ok");
})

app.get('/', (req, res) => {
    res.send(`Petición atendida por ${process.pid}`)
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));