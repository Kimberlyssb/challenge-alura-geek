import { servicesProducts } from "./product-services.js";

const misProductos = document.querySelector("[data-product]");
const formulario = document.querySelector("[data-form]");

function crearProductos(titulo, precio, imagen, id) {
  const productoItem = document.createElement("div");
  productoItem.classList.add("productoItem");

  productoItem.innerHTML = `
    <div class="productosItem">
      <img class="imagen-producto" src="${imagen}" alt="${titulo}">
      <div class="titulo-producto">
        <p>${titulo}</p>
      </div>
      <div class="precio-botton">
        <div class="precio-producto">
          <p>$${precio}</p>
        </div>
        <div data-borrar class="boton-borrar" id="${id}">
          <img src="img/delete-icon.png" alt="borrar" class="img-borrar"/>
        </div>
      </div>
    </div>
  `;

  const botonBorrar = productoItem.querySelector("[data-borrar]");
  botonBorrar.addEventListener("click", async () => {
    try {
      await servicesProducts.borrarProducto(id);
      productoItem.remove();
    } catch (error) {
      console.error("Error al borrar el producto:", error);
    }
  });

  misProductos.appendChild(productoItem);
  return productoItem;

}

const render = async () => {
  try {
    const listaProductos = await servicesProducts.productList();
    listaProductos.forEach((producto) => {
      crearProductos(
        producto.titulo,
        producto.precio,
        producto.imagen,
        producto.id
      );
    });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
};

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  const titulo = document.querySelector("[data-titulo]").value;
  const precio = document.querySelector("[data-precio]").value;
  const imagen = document.querySelector("[data-imagen]").value;

  try {
    const nuevoProducto = await servicesProducts.crearProdcuto(
      titulo,
      precio,
      imagen
    );
    crearProductos(
      nuevoProducto.titulo,
      nuevoProducto.precio,
      nuevoProducto.imagen,
      nuevoProducto.id
    );
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }

  
  limpiarForm();
});

render();

const limpiarForm = () => {
  document.querySelector("[data-titulo]").value = "";
  document.querySelector("[data-precio]").value = "";
  document.querySelector("[data-imagen]").value = "";
};

