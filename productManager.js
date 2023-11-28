const fs = require('fs');
const FILE_NAME = "./products.json";

class ProductManager {
    constructor(filepath) {
        this.path = FILE_NAME;
        this.products = [];
        this.productIdCounter = 1;
        this.initializeFile();
    }

    initializeFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                const lastProduct = this.products[this.products.length - 1];
                this.productIdCounter = lastProduct.id + 1;
            }
        } catch (error) {
            // Si el archivo no existe o esta vacío continúo con un array vacío
            this.products = [];
        }
    }

    saveToFile() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
        }
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Todos los campos son obligatorios.');
            return;
        }

        const codeExists = this.products.some((prod) => prod.code === code);
        if (codeExists) {
            console.error('Ya existe un producto con este código.');
            return;
        }

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
        this.saveToFile();
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
            console.error('Producto no encontrado');
        }
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveToFile();
            return this.products[index];
        } else {
            console.error('Producto no encontrado');
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter((product) => product.id !== id);
        this.saveToFile(); // No esperará a que se complete la operación de guardado
        console.log('Producto eliminado');
    }
}

module.exports = ProductManager;

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

// Eliminación 
const productosAntes = manager.getProducts();
console.log('Productos antes de la eliminación:', productosAntes);

// Eliminar un producto por su ID (por ejemplo, ID 1)
manager.deleteProduct(2);

// Obtener productos después de la eliminación
const productosDespues = manager.getProducts();
console.log('Productos despues de la eliminación:', productosDespues);

*/


