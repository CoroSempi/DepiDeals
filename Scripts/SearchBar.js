let dataa = [];
const reqqq = new XMLHttpRequest();
reqqq.open("GET", "https://seif-sync-server.vercel.app/Depi/products");
reqqq.send();

reqqq.addEventListener("readystatechange", () => {
  if (reqqq.readyState === 4 && reqqq.status === 201) {
    dataa = JSON.parse(reqqq.response);
  }
});

function searching(text) {
  searchData.innerHTML = "";
  console.log(text.value);
  searchData.style.display = "flex";
  dataa.map((e) => {
    if (e.Name.toLowerCase().includes(text.value.toLowerCase())) {
      const linkS = document.createElement("a");
      linkS.href = `./product.html?id=${e.id}`;
      const item = document.createElement("div");
      item.innerText = e.Name;
      linkS.appendChild(item);
      searchData.appendChild(linkS);
      console.log(e.Name);
    }
  });
}

function none(text) {
  setTimeout(() => {
    text.value = "";
    searchData.style.display = "none";
  }, 500);
}
