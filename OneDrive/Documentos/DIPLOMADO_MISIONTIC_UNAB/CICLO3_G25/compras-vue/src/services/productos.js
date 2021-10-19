class ProductosService{
    productos = [];

    constructor(){
        this.productos = [
            { nombre: "Disco Duro", precio: 2000000 },
            { nombre: "Teclado", precio: 100000 },
            { nombre: "Mouse", precio: 80000 },
            { nombre: "Pantalla", precio: 80000},
            { nombre: "Memoria USB", precio: 50000 },
        ];
    }

    obtenerTodos(){
        return this.productos;
    }



}export default new ProductosService();