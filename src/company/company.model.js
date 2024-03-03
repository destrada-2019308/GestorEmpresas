import { Schema, model } from 'mongoose'

const companySchema = Schema({
    name: {
        type: String,
        required: true    
    },
    contact: {
        type: Number,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    levelCareer:{
        type: String,
        required: true
    },
    yearsCareer:{ 
        type: Number,
        required: true
    },
    categoryBusiness: {
        type: String,
        required: true
    }
},
{
    versionKey: false
})

export default model('company', companySchema)

