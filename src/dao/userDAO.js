import userSchema from "../../models/userSchema.js";


export default class UserDAO {
    getUsers = (params) => {
        return userSchema.find(params).lean();
    };

    getUserBy = (params) => {
        return userSchema.findOne(params).lean();
    };

    createUser = (user) => {
        return userSchema.create(user);
    };
}