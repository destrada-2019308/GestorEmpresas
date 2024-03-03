'use strict'

import User from './user.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) =>{
    return res.send({message: 'Test is running'})
}

export const userDefect = async(req,res) =>{
    try {
        const userExists = await User.findOne({username: 'admin'})
        if(userExists){
           console.log('usuario existente')
        }else{
        const encryptPassword = await encrypt('admin1234')
        const newUser = new User({
            name: 'admin',
            surname: 'admin',
            username: 'admin',
            password: encryptPassword,
            email: 'admin',
            phone: '12345678',
            role: 'ADMIN'
        }) 
        await newUser.save()
    }   
    } catch (err) {
        console.error(err)
    }
}

export const register = async(req, res) =>{
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'ADMIN'
        let user = new User(data)
        await user.save()
        return res.send({message: `Register successfully, can be logged with usernmae ${user.username}`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error regitering user', error: error})
    }
}

export const login = async(req, res) =>{
    try {
        let { username, password} = req.body
        //va a buscar a la base de datos que exista un registro con username: 'destrada'
        let user = await User.findOne({username: username})
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username, 
                name: user.name, 
                role: user.role
            }
            //generamos el token
            let token = await generateJwt(loggedUser)
            return res.send({message: `Welcome ${loggedUser.name}`, loggedUser, token})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error to login'})
    }
}