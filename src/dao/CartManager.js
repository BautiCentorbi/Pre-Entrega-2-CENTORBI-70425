import fs from 'fs'

export class cartManager {
    static #path = ''

    static setPath(filePath = '') {
        this.#path = filePath
    }

    static async getCart() {
        if (fs.existsSync(this.#path)) {
            return JSON.parse(await fs.promises.readFile(this.#path, { encoding: 'utf-8' }))
        } else {
            return []
        }
    }

    static async getCartById(id) {
        const carts = await this.getCart()
        let cart = carts.find(cart => cart.id === id)
        return cart
    }

    static async createCart() {
        try {
            let carts = await this.getCart();
            let id = carts.length ? Math.max(...carts.map(cart => cart.id)) + 1 : 1;
            let newCart = { id: id, products: [] };
            carts.push(newCart);
            await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2));
        } catch (error) {
            throw new Error('Error creating cart');
        }
    }

    static async addProductToCart(cartid, productid ) {
        try {
            let cart = await this.getCartById(cartid)
            let newProduct = { product: productid, quantity: 1 }
            cart.products.push(newProduct)
            await fs.promises.writeFile(this.#path, JSON.stringify(cart, null, 2))
        } catch (error) {
            throw new Error('Error adding product to cart')
        }
    }

    static async deleteProduct(id) {
        let cart = await this.getCart()
        let index = cart.findIndex(prod => prod.id === id)
        if (index !== -1) {
            cart.splice(index, 1)
            await fs.promises.writeFile(this.#path, JSON.stringify(cart, null, 2))
            return true
        }
        return false
    }
}

