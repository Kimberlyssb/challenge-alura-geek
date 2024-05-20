const productList = () => {
    return fetch("https://664bb00b35bbda10987dcd9f.mockapi.io/api/productos/prod")
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  
  const crearProdcuto = (titulo, precio, imagen) => {
    return fetch("https://664bb00b35bbda10987dcd9f.mockapi.io/api/productos/prod", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo,
        precio,
        imagen,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  
  const borrarProducto = (id) => {
    return fetch(`https://664bb00b35bbda10987dcd9f.mockapi.io/api/productos/prod/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  
  export const servicesProducts = {
    productList,
    crearProdcuto,
    borrarProducto,
  };
  