'use strict'
import {hash, compare} from 'bcrypt'

export const encrypt = (password) =>{
    try {
        return hash(password, 10)
    } catch (error) {
        console.error(error)
        return error
    }
}

export const checkPassword = async(password, hash) =>{
    try {
        return await compare(password, hash)
    } catch (error) {
        console.error(error)
        return error
    }
}

export const checkUpdate = (data, companyId)=>{
    if (companyId){
        //validamos si data esta vacío   o 
        if(Object.entries(data).length === 0){
            return false
        }
        return true
    }else{
        if(Object.entries(data).length === 0 ){
            return false
        }
        return true
    }
}