import crypto from 'crypto'

export const errorHandler = (res, error) => {
    console.log(error)
    res.setHeader('Content-Type','application/json');
    return res.status(500).json({error})
}

export const generateId = () => {
    return crypto.randomUUID()
}

export const generateCode = () => {
    return crypto.randomBytes(10).toString('hex')
}

export const productAuth = (product) => {
    if (product.title !== String){
        throw new Error('title debe ser un string')
    }
    if (product.id !== Number){
        throw new Error('Id debe ser un número')
    }
}