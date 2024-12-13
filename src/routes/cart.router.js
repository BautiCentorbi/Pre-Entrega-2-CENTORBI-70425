import { Router } from 'express';
import fs from 'fs';

export const router=Router()

const cart = fs.readFileSync('./src/data/carrito.json','utf-8')

router.get('/',(req,res)=>{
    res.setHeader('Content-Type','application/json');
    res.status(200).send('OK');
})

