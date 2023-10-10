import User from '../models/users_models.js';
import bcrypt from 'bcrypt';

async function userList() {
    let user = await User.find({status: true});
    return user;
}

async function findByName(name) {
    let user = await User.find({'name': name});
    return user;
}

async function findUser(id) {
    let user = await User.find({_id: id});
    return user;
}


async function createUser(body) {
    let user = new User({
        email: body.email,
        name: body.name,
        password: bcrypt.hashSync(body.password, 10),
    })
    return await user.save();
}

async function updateUser(body, email) {
    let user = await User.updateOne({'email': email}, {
        $set: {
            name: body.name,
            password: body.password
        }
    })
    return user;
}

async function deleteUser(id) {
    let user = await User.deleteOne({_id: id});
    return user;
}

async function limitUsers(num) {
    let users = await User.find().limit(num);
    return users;
}

async function sortByEmail() {
    let users = await User.find().sort({email: -1})
    return users;
}

export {userList, findByName, findUser, createUser, updateUser, deleteUser, limitUsers, sortByEmail};