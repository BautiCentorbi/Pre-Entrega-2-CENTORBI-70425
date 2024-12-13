import express from 'express';
import { router as productsRouter} from './routes/products.router.js';

const PORT=8080;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products',productsRouter);

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('Pre Entrega 1 - BAUTISTA CENTORBI \n CoderHouse - Backend 1 - 70425');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
