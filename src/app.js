import express from 'express';
import { engine } from 'express-handlebars';
import { router as vistasRouter } from './routes/viewsRouter.router.js';
import { router as productsRouter} from './routes/products.router.js';
import { router as cartsRouter } from './routes/carts.router.js';
import { Server } from 'socket.io'
import { __dirname } from './utils.js';
import { productManager } from './dao/ProductManager.js';

const PORT=8080;

const app=express();

app.use(express.static('./src/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', vistasRouter);

app.get('/',(req,res)=>{

    res.render('index', {});
})

export const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

export const io = new Server(server)

io.on('connection',socket=>{
    console.log('Cliente conectado')
    socket.on('message',data=>{
        console.log(data)
        productManager.getProducts().then(products=>{
            socket.emit('products',products)
        })
    })
})

app.get('/realtimeproducts', async(req,res) => {
    res.render('realTimeProducts', { products : []});
    io.emit('products', await productManager.getProducts());
  });
