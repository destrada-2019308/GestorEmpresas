import { Router } from 'express'
import { registerCompany, getYearCareer, test, getCategory, getAZ, getZA, updateCompany, getExcel} from './company.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate-Jwt.js'

const api = Router()

api.get('/test', [validateJwt, isAdmin], test)
api.get('/getYearCareer', [validateJwt, isAdmin], getYearCareer)
api.get('/getCategory', [validateJwt, isAdmin], getCategory)
api.get('/getAZ', [validateJwt, isAdmin], getAZ)
api.get('/getZA', [validateJwt, isAdmin], getZA)
api.get('/getExcel', [], getExcel)
api.post('/registerCompany', [validateJwt, isAdmin], registerCompany)
api.put('/updateCompany/:id', [validateJwt, isAdmin], updateCompany)

export default api