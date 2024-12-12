import { Router } from "express";
import { productManager } from "../dao/ProductManager.js";
import { errorHandler, generateCode, generateId } from "../utils.js";

export const router = Router()

productManager.setPath('./src/data/productos.json')


router.get('/', async(req, res) => {
    try {
        let products = await productManager.getProducts()
        
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({products});
        
    } catch (error) {
        errorHandler(res, error)
    }
})

router.get('/:id', async(req, res) => {
    let {id} = req.params
    id = Number(id)
    if (isNaN(id)) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error: 'id debe ser un número'})
    }

    try {
        let productById = await productManager.getProductsById(id)
        if (!productById) {
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error: 'Producto no encontrado'})
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload: `Producto: ${productById}`});
        
    } catch (error) {
        errorHandler(res, error)
    }
})

router.post('/:id/:title/:description/:code/:price/:status/:stock/:category/:thumbnail', (req, res) => {
    let product = req.params
    if (!product.title || !product.description || !product.price || !product.status || !product.stock || !product.category || !product.thumbnail) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error: 'Todos los campos son obligatorios'})
    }
    let uniqueID = generateId()
    let uniqueCode = generateCode()
    req.params.id = uniqueID
    req.params.code = uniqueCode
    req.params.status = true
    productManager.addProduct(product)
    res.setHeader('Content-Type','application/json');
    return res.status(201).json({payload: {product}});
})

router.put('/:id', (req, res) => {
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload: `Producto: ${req.params.id} actualizado`});
})

router.delete('/:id', (req, res) => {
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload: `Producto: ${req.params.id} eliminado`});
})