function update_total() {
  let sum = 0;
  for (let item of document.querySelectorAll(".total")) {
    sum += parseInt(item.innerText.replace("$", ""));
  }

  if (document.querySelectorAll(".total").length == 0) {
    console.log("got inside");
    document.querySelector("#total-of-items").innerHTML = "$" + 0;
    document.querySelector("#Subtotal").innerHTML = "$" + 0;
    return;
  }
  document.querySelector("#Subtotal").innerText = "$" + sum;
  document.querySelector("#total-of-items").innerText = "$" + sum;
}
function append(arr) {
  row = document.createElement("div");

  row.className = "row";
  table = document.getElementsByClassName("table")[0];
  table.appendChild(row);
  arr.forEach((element) => {
    item = document.createElement("div");
    item.className = "item";
    row.appendChild(item);
    item.innerHTML = element;
  });

  table.appendChild(row);
}

function update(products, quantity, id) {
  let button = document.getElementById(`${id}`);
  row = button.parentElement.parentElement;
  quantityElement = row.querySelector(".quantity");
  total = row.querySelector(".total");

  if (quantityElement) {
    let currentQuantity = parseInt(quantityElement.innerText);
    Total = parseInt(total.innerText.replace("$", ""));
    console.log("Current quantity before update:", currentQuantity); // Debugging output
    newQuantity = currentQuantity - 1;
    // Ensure currentQuantity is a valid number
    if (!isNaN(currentQuantity) && currentQuantity > 0) {
      quantityElement.innerText = newQuantity;
      console.log(Total);
      console.log(newQuantity);
      console.log(currentQuantity);
      console.log(`${(newQuantity / currentQuantity) * Total}`);
      total.innerText =
        "$" +
        (
          Math.round((newQuantity / currentQuantity) * Total * 100) / 100
        ).toFixed(2);
      console.log("Updated quantity:", quantityElement.innerText); // Debugging output
    } else {
      console.warn("Invalid or zero quantity; no update performed."); // Debugging output
    }
  }
  return;
}

function append(arr) {
  row = document.createElement("div");
  row.className = "row";
  table = document.getElementsByClassName("table")[0];
  table.appendChild(row);
  arr.forEach((element) => {
    item = document.createElement("div");
    item.className = "item";
    row.appendChild(item);
    item.innerHTML = element;
  });

  table.appendChild(row);
}
products = JSON.parse(localStorage["products"]);
quantity = JSON.parse(localStorage["quantity"]);
products.forEach((product) => {
  append([
    `<img src="${product.Pic}" style="width:100px;height:90px"/>
    <p style="font-size:17px">${product.Name}</p> `,
    `<p style="font-size:17px">$${product.Price}</p>`,
    `<p class="quantity" style="font-size:17px">${quantity[product.Name]}</p> `,
    `<p style="font-size:17px" class="total">$${(
      Math.round(parseInt(quantity[product.Name] * product.Price) * 100) / 100
    ).toFixed(2)}</p> `,
    `<button class='dele' id='${product.Name}'>Delete</button>`,
  ]);
});
update_total();

list = document.getElementsByClassName("dele");
for (let element of list) {
  element.addEventListener("click", function () {
    check(true);
    update(
      JSON.parse(localStorage["products"]),
      JSON.parse(localStorage["quantity"]),
      element.id
    );
    DeleteFromCart(element.parentElement.parentElement, element.id);
  });
}
function AddToCart(product, quantity_number) {
  if (!quantity_number) {
    quantity_number = 1;
  }
  let products, quantity;

  try {
    products = JSON.parse(localStorage.getItem("products") || "[]");
    quantity = JSON.parse(localStorage.getItem("quantity") || "{}");
  } catch (e) {
    products = [];
    quantity = {};
  }

  if (quantity[product.Name] === undefined) {
    quantity[product.Name] = 0;
  }

  quantity[product.Name] += quantity_number;

  if (!products.some((p) => p.Name === product.Name)) {
    products.push(product);
  }

  updateSessionStorage(products, quantity);
}

function updateSessionStorage(products, quantity) {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("quantity", JSON.stringify(quantity));
  console.log(products);
  console.log(quantity);
}
function DeleteFromCart(parent, id) {
  products = JSON.parse(localStorage["products"]);
  quantity = JSON.parse(localStorage["quantity"]);

  for (let product of products) {
    console.log(id);
    console.log(product.Name);
    if (product.Name == id) {
      if (quantity[id] > 1) {
        quantity[id] -= 1;
        break;
      } else {
        delete quantity[id];
        products = products.filter(function (item) {
          return item !== product;
        });
        parent.remove(); // Remove the row from the DOM
      }
    }
  }
  updateSessionStorage(products, quantity);
}

function ReturnTotal(products) {
  let sum;
  products.forEach((product) => {
    sum += product.price * quantity[product.Name];
  });

  return sum;
}
let check = (in_event) => {
  total_items = document.querySelectorAll(".total");
  for (let item of total_items) {
    const targetNode = item;

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");
          update_total(true);
        } else if (mutation.type === "attributes") {
          console.log(`The ${mutation.attributeName} attribute was modified.`);
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    // observer.disconnect();
  }
};
