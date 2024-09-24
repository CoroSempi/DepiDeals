let queryString = window.location.search;
queryString = queryString.split("=");
const id = queryString[1];

const reqq = new XMLHttpRequest();
reqq.open("GET", "https://seif-sync-server.vercel.app/Depi/products");
reqq.send();

reqq.addEventListener("readystatechange", () => {
  if (reqq.readyState === 4 && reqq.status === 201) {
    let data = reqq.response;
    data = JSON.parse(data);

    const product = data.find((e) => {
      return e.id == id;
    });
    const head = document.getElementById("head");
    const title = document.getElementById("productTitle");
    const details = document.getElementById("productDetails");
    const price = document.getElementById("productPrice");
    const overview = document.getElementById("productOverview");
    const mainPic = document.getElementById("productMainPic");
    const thumbs = document.getElementById("productThumbs");
    head.textContent = product.Category + " / " + product.Name;
    title.textContent = product.Name;
    details.innerHTML = ` <span style="color: gray">(${
      product.Purchases
    } Purchases)</span> |
            <span style="color: #414db1; font-weight: 700">${
              product.Category
            }</span> |
            <span style="color: #414db1; font-weight: 700">${
              product.Instock === true ? "instock" : "outstock"
            }</span>`;
    price.textContent = `$${product.Price}`;
    overview.textContent = product.Overview;
    mainPic.src = product.Pic;
    mainPic.alt = product.Name;
    product.Gallery.map((e) => {
      const img = document.createElement("img");

      img.src = e;
      thumbs.appendChild(img);
    });

    cartButton = document.querySelector("#cartButton");
    cartButton.addEventListener("click", () => {
      AddToCart(
        product,
        parseInt(document.querySelector("#productInput").value)
      );

      // handling the dialog ya youssef :)
      if (document.querySelector("#productInput").value > 0) {
        document.getElementById("dialog").style.display = "block";
        setTimeout(() => {
          document.getElementById("dialog").style.display = "none";
        }, 1000);
        document.querySelector("#productInput").value = 0;
      }
    });
    console.log(product);
  }
});

function up() {
  const input = document.getElementById("productInput");
  if (Number(input.value) < 10) {
    input.value = Number(input.value) + 1;
  }
}

function down() {
  const input = document.getElementById("productInput");
  if (Number(input.value) > 0) {
    input.value = Number(input.value) - 1;
  }
}
