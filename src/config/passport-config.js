import passport from "passport";
import local from 'passport-local';
import userDAO from "../models/userSchema.js";
import { validatePW } from "../../utils.js";
import GithubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        if (!email || !password) return done(null, false, { message: 'Valores incompletos. Revisa todos los campos.' })
        const user = await userDAO.findOne({ email });
        if (!user) return done(null, false, { message: 'Datos inválidos.' });
        const invalidPassword = await validatePW(password, user.password);
        if (!invalidPassword) return done(null, false, { message: 'Contraseña inválida. Intenta nuevamente.' });
        return done(null, user);
    }))

    passport.use('github', new GithubStrategy({
        clientID: '62778c17ef41599d08ec',
        clientSecret: '97eeca015dcd5d32cc01b2806195ee943bf2465e',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const { name, email } = profile._json;
            const user = await userDAO.findOne({ email });
            if (!user) {
                const newUser = {
                    firstName: name,
                    email,
                    password: ''
                }
                const result = await userDAO.bulkSave(newUser);
                return done(null, result);
            }
            done(null, user)
        } catch (error) {
            done(error);
            console.log('ERROR EN PASSPORT - GITHUB')
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async (id, done) => {
        const result = await userDAO.findById({ _id: id });
        done(null, result);
    })
}

export default initializeStrategies; 