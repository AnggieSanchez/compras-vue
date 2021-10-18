<template>
  <header>
    <h1>{{ titulo }}</h1>
  </header>

  <main>
    <div>
      <h2>Registar compra {{ prueba }}</h2>
      <form action="#" id="formulario_compra">
        <label for="cliente">Cliente:</label>
        <input type="text" name="cliente" v-model="compra.cliente" />
        <label for="documento">Documento:</label>
        <input type="text" name="documento" v-model="compra.documento" />
        <label for="producto">Producto:</label>
        <select name="producto" id="productos" v-model="seleccion">
          <option value="-1">Seleccione un producto</option>
          <option
            v-for="(unProducto, llave) in listaProductos"
            v-bind:key="llave"
            :value="llave"
          >
            {{ unProducto.nombre }} - ${{ unProducto.precio }}
          </option>
        </select>
        <label for="cantidad">Cantidad:</label>
        <input type="number" name="cantidad" v-model="compra.cantidad" />
        <div>
          <input type="radio" name="envio" v-model="compra.envio" value="0" />
          Express
        </div>
        <div>
          <input type="radio" name="envio" v-model="compra.envio" value="1" />
          Normal
        </div>
        <button type="reset">Limpiar</button>
        <button @click.prevent="procesarInformacion">Agregar Compra</button>
      </form>
    </div>

    <div>
      <h2>Listado de Compras</h2>
      <table border="1">
        <thead>
          <tr>
            <th>CLIENTE</th>
            <th>PRODUCTO</th>
            <th>CANTIDAD</th>
            <th>ENVÍO</th>
            <th>DESCUENTO</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody id="datos_compras">
          <tr v-for="(unaCompra, i) in listaCompras" :key="i">
            <td>{{ unaCompra.cliente }} ({{ unaCompra.documento }})</td>
            <td>
              {{ unaCompra.producto.nombre }} - ${{ unaCompra.producto.precio }}
            </td>
            <td>{{ unaCompra.cantidad }}</td>
            <td>{{ nombresEnvio[unaCompra.envio] }}</td>
            <td>${{ unaCompra.descuento }}</td>
            <td>${{ unaCompra.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src

export default {
  mounted() {
    let producto1 = { nombre: "Disco Duro", precio: 2000000 };
    let producto2 = { nombre: "Teclado", precio: 100000 };
    let producto3 = { nombre: "Mouse", precio: 80000 };
    let producto4 = { nombre: "Pantalla", precio: 800000 };
    let producto5 = { nombre: "Memoria USB", precio: 50000 };

    this.listaProductos = [
      producto1,
      producto2,
      producto3,
      producto4,
      producto5,
    ];
  },
  data() {
    return {
      listaProductos: [],
      titulo: "Registro listado de compras",
      listaCompras: [],
      compra: {
        cliente: "",
        documento: "",
        producto: {},
        cantidad: 0,
        envio: 1,
      },
      seleccion: -1,
      nombresEnvio: ["Express", "Normal"],
      valoresEnvio: [20000, 10000],
    };
  },
  methods: {
    limpiarFormulario() {
      this.compra = {
        cliente: "",
        documento: "",
        producto: {},
        cantidad: 0,
        envio: 1,
      };
      this.seleccion = -1;
    },
    procesarInformacion() {
      this.compra.total = 0;
      this.compra.descuento = 0;

      this.compra.producto = this.listaProductos[this.seleccion];

      let subtotal = this.compra.producto.precio * this.compra.cantidad;
      let valorEnvio = 0;

      if (this.compra.cantidad > 10) {
        this.compra.descuento = subtotal * 0.1;
      }

      if (subtotal > 5000000) {
        if (this.compra.envio == 0) {
          valorEnvio = this.valoresEnvio[1];
        } else {
          valorEnvio = 0;
        }
        this.compra.descuento +=
          this.valoresEnvio[this.ompra.envio] - valorEnvio;
      } else {
        valorEnvio = this.valoresEnvio[this.compra.envio];
      }

      this.compra.total = valorEnvio + subtotal - this.compra.descuento;

      this.listaCompras.push(this.compra);

      this.limpiarFormulario();
    },
  },
  name: "Home",
  components: {},
};
</script>

<style scoped>
#formulario_compra {
  display: grid;
  grid-template-columns: 6rem 10rem;
  row-gap: 1rem;
}

main {
  display: grid;
  grid-template-columns: 4fr 8fr;
  column-gap: 1rem;
  padding: 2rem;
}

table {
  width: 80%;
  margin: auto;
}
</style>