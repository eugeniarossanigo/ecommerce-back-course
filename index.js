class ProductManager {
    constructor(){
        this.products = []
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.#generarId(), title, description, price, thumbnail, code, stock
        }
        this.products.push(product)
    }
    getProducts() {
        return this.products
    }
    getProductById(id) {
        let prodFind = this.products.find(prod => prod.id == id)
        return prodFind ? prodFind : "Not found"
    }
    #generarId() {
        const id = this.products.length === 0 ? 1 : this.products[this.products.length -1].id + 1
        return id
    }
}

const productManager = new ProductManager()
productManager.addProduct('Calvin Klein Be', 'Eau De Toilette 50ml Unisex', 11000, 'https://http2.mlstatic.com/D_NQ_NP_638636-MLA45187513733_032021-O.jpg', 12345, 50)
productManager.addProduct('Calvin Klein One', 'Eau De Toilette 50ml Unisex', 12000, 'https://http2.mlstatic.com/D_NQ_NP_608132-MLA31356874190_072019-O.jpg', 12346, 40)

console.log(productManager.getProducts())
console.log("Producto con ID: ", productManager.getProductById(1))
console.log("Producto con ID: ", productManager.getProductById(3))