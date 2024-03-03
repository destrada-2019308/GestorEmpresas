import { Router } from 'express'
import { login, register, test } from './user.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate-Jwt.js'

const api = Router()

//Única ruta pública
api.post('/login', login)

//Rutas privadas
api.get('/test', [validateJwt, isAdmin], test)
api.post('/register', [validateJwt, isAdmin], register)


export default api