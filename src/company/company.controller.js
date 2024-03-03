'use strict'
import Company from '../company/company.model.js'
import { checkUpdate } from '../utils/validator.js'
import ExcelJS from 'exceljs'
import path from 'path'

export const test = (req, res) =>{
    return res.send({message: 'Test is running'})
}

export const registerCompany = async(req, res) => {
    try {
        let data = req.body
        let company = new Company(data)
        await company.save()
        return res.send({message: `Register successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error registering company'})
    }
}

export const getYearCareer = async(req, res) =>{
    try {
        let company
        // Realizar la búsqueda de las empresas y ordenarlas por años de experiencia de menor a mayor
        company = await Company.find().sort({ yearsCareer: 1 })//Si queremos hacerlo al reves solo se pone -1
        return res.send({company})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error getting company'})
    }
}

export const getCategory = async(req, res) =>{
    try {
        let company
        company = await Company.find().sort({ categoryBusiness: 1 })
        return res.send({company})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error getting company'})
    }
}

export const getAZ = async(req, res) =>{
    try {
        let company
        company = await Company.find().sort({name: 1})
        return res.send({company})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error getting company'})
    }
}

export const getZA = async(req, res) =>{
    try {
        let company
        company = await Company.find().sort({name: -1})
        return res.send({company})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error getting company'})
    }
}

export const updateCompany = async(req, res) =>{
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have sumitted some data that cannot be updated or missing data'})
        let updatedCompany = await Company.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCompany) return res.status(404).send({message: 'Company not found and not update'})
        return res.send({message: 'Company updated successfully', updatedCompany})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating company'})
    }
}

export const getExcel = async(req, res) =>{
    try {
        // Obtener las empresas de la base de datos
        let companies = await Company.find()
        // Crear un nuevo libro de Excel
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet('Companys');
        // Definir las columnas en el archivo de Excel
        worksheet.columns = [
            { header: 'Nombre', key: 'name', width: 20 },
            { header: 'Número de contacto', key: 'contact', width: 20 },
            { header: 'Nivel de trayectoria', key: 'levelCareer', width: 20},
            { header: 'Años de experiencia', key: 'yearsCareer', width: 20 },
            { header: 'Categoría', key: 'categoryBusiness', width: 20 }
        ];

        // Agregar las empresas al archivo de Excel
        companies.forEach(company => {
            worksheet.addRow({
            name: company.name,
            contact: company.contact,
            levelCareer: company.levelCareer,
            yearsCareer: company.yearsCareer,
            categoryBusiness: company.categoryBusiness
            });
        });

        // Enviar el archivo Excel al cliente
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=ListadoDeEmpresas.xlsx');
        await workbook.xlsx.write(res);

    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error getting company '})
    }
}