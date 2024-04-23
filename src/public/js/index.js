const socketClient = io();

const formProducts = document.getElementById("formProducts");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputThumbnail = document.getElementById("thumbnail");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");
const inputStatus = document.getElementById("status");


formProducts.onsubmit = (event) => {
    event.preventDefault(); // Evitar que se recargue la página antes de enviar los datos
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const thumbnail = inputThumbnail.value;
    const code = inputCode.value;
    const stock = inputStock.value;
    const category = inputCategory.value;
    const status = inputStatus.value


    const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status
    };

    socketClient.emit("newProduct", { ...newProduct });

    //codigo para formatear los valores en el formulario
    for (let i = 0; i < (formProducts.elements.length -1); i++) {
        formProducts.elements[i].value = '';
    };

};

socketClient.on("updateProducts", (objProducts)=>{
  // Obtener la lista ul
  const ul = document.querySelector("ul");

  // Eliminar todos los elementos li de la lista ul existentes
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  const products = objProducts.products; // tomar solo la array de productos
  console.log("prductos al cliente renovar::", products);

  // Iterar sobre cada producto y agregarlo a la lista ul
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `<p>Nombre del producto: ${product.title} - Precio: $${product.price}</p><button onclick="deleteProduct(${product.id})">Eliminar</button>`;
    ul.appendChild(li);
  });
});

function deleteProduct(id){

    console.log("ver id de producto a eliminar", id);
    socketClient.emit("deleteProduct", { id });

};






