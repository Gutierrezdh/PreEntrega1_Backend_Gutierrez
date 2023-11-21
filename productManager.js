class ProductManager {
    constructor() {
    this.products = [];
    this.productIdCounter = 1;
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        // Valido los campos obligatorios que debe tener cada producto
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Todos los campos son obligatorios.');
            return;
        }
        // Valido que no se repita el campo Code
        const codeExists = this.products.some((prod) => prod.code === code);
        if (codeExists) {
            console.error('Ya existe un producto con este código.');
            return;
        }
        // Agrego producto e incremento el id
        const newProduct = {
            id: this.productIdCounter,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(newProduct);
        this.productIdCounter++;
        console.log('Producto agregado:', newProduct);
    }

    getProducts() {
    return this.products;
    }

    getProductById(id) {
    const product = this.products.find((prod) => prod.id === id);
    if (product) {
        return product;
    } else {
        console.error('Not found');
    }
    }
}

  // Codigo para probar metodos

/*
const manager = new ProductManager();

manager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 25.99,
    thumbnail: 'ruta/imagen1.jpg',
    code: 'ABC123',
    stock: 10,
});

manager.addProduct({
    title: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 39.99,
    thumbnail: 'ruta/imagen2.jpg',
    code: 'DEF456',
    stock: 15,
});

const allProducts = manager.getProducts();
console.log('getProducts:', allProducts);

const productById = manager.getProductById(2);
console.log('getProductById:', productById);

*/
