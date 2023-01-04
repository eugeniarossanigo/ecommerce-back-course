const fs = require('fs')
const path = './Products.json'

class ProductManager {
    async getProducts() {
        try {
            if (fs.existsSync(path)){
                const infoProds = await fs.promises.readFile(path, 'utf-8')
                const infoJS = JSON.parse(infoProds)
                return infoJS
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts()
            const product = {
                id: await this.#getId(), title, description, price, thumbnail, code, stock
            }
            products.push(product)
            await fs.promises.writeFile(path, JSON.stringify(products))
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            let prodsFilter = products.filter(prod => prod.id !== id)
            await fs.promises.writeFile(path, JSON.stringify(prodsFilter))
        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(id, price) {
        try {
            const products = await this.getProducts()
            let prodFind = products.find(prod => prod.id === id)
            if (prodFind) {
                prodFind.price = price
                fs.promises.writeFile(path, JSON.stringify(products));
            } else {
                return "No match"
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getProductById(id) {
        const products = await this.getProducts()
        let prodFind = products.find(prod => prod.id == id)
        return prodFind ? prodFind : "Not found"
    }
    async #getId() {
        let products = await this.getProducts()
        const id = products.length === 0 ? 1 : products[products.length - 1].id + 1
        return id
    }
}

const productManager = new ProductManager()
async function createJson() {
    await productManager.addProduct('Calvin Klein Be', 'Eau De Toilette 50ml Unisex', 11000, 'https://http2.mlstatic.com/D_NQ_NP_638636-MLA45187513733_032021-O.jpg', 12345, 50)
    await productManager.getProducts()
    await productManager.addProduct('Calvin Klein One', 'Eau De Toilette 50ml Unisex', 12000, 'https://http2.mlstatic.com/D_NQ_NP_608132-MLA31356874190_072019-O.jpg', 12346, 40)
    await productManager.getProducts()
}
createJson()


// async function updateJson() {
//     await productManager.updateProduct(1, 333333)
//     await productManager.getProducts()
// }
// updateJson()


// async function deleteJson(id) {
//     await productManager.deleteProduct(id)
//     await productManager.getProducts()
// }
// deleteJson(2)