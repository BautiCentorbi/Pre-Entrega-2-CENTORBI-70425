import fs from 'fs'
import getProductsById from './ProductManager.js'

export class CartManager {
    static #path = ''

    static setPath(filePath='') {
        this.#path = filePath
    }

    static async getCart() {
        if (fs.existsSync(this.#path)) {
            return JSON.parse(await fs.promises.readFile(this.#path, {encoding: 'utf-8'}))
        } else {
            return []
        }
    }

    static async addProductToCart(id) {
        let product = await getProductsById(id)
        let cart = await this.getCart()
        try {
            if (product.find(prod => prod.id === id)) {
                cart.push(product)
                await fs.promises.writeFile(this.#path, JSON.stringify(product, null, 2))
            }
        } catch (error) {
            throw new Error('Error adding product to cart')
        }
    }
}
