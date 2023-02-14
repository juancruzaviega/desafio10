import express from 'express';
import viewUser from './src/routes/viewUsers.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import routerPost from './src/routes/posts/usersPost.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect('mongodb+srv://juanaviega:tyrone@tienda.g8gyjpy.mongodb.net/test')

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://juanaviega:tyrone@tienda.g8gyjpy.mongodb.net/test",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: 'tienda',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30000 }
}))


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

app.use('/', viewUser)
app.use('/api/sessions', routerPost);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));