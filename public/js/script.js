console.log("Script file connected");
//logic for shopping cart

//get stub items indexed

/*
//place list elements into an ul element in the html
let text = "<ul>";
stubs.items.item_name.forEach(myFunction);
text += "</ul>";

//have each indexed item placed under a list element
function itemList(stubs.items) {
  text += "<li>" + value + "</li>";
}
//get items as a list

*/

//get item price from a list

//subtotal item price and quantity

//total items with tax / simple * %
window.addEventListener("load", (event)=>{
  let cartData;
  var groceryItems = document.getElementsByClassName('groceryImg') ?? {};
  for (let i = 0; i < groceryItems.length; i++) {
    groceryItems[i] ? groceryItems[i].addEventListener("click", function(e) {
      let groceryData = JSON.parse(JSON.parse(JSON.stringify(groceryItems[i].parentElement.dataset.iteminfo)));
      buildModal(groceryData);
    }) : ""
  }

  const buildModal = (data)=> {
    console.log(data);
    document.getElementById('modalImg').src = data.img;
    document.getElementById('modalItemId').value = data.id;
    document.getElementById('modalSku').innerHTML = data.sku;
    document.getElementById('modalName').innerHTML = data.item_name;
    document.getElementById('modalPrice').innerHTML = data.price;
    document.getElementById('modalDesc').innerHTML = data.description;
  }
  document.getElementById('modalSubmit') ?
  document.getElementById('modalSubmit').addEventListener("click", function(e) {
    cartData = {
      "img": document.getElementById('modalImg').src,
      "id": document.getElementById('modalItemId').value,
      "sku": document.getElementById('modalSku').innerHTML,
      "name": document.getElementById('modalName').innerHTML,
      "price": document.getElementById('modalPrice').innerHTML,
      "desc": document.getElementById('modalDesc').innerHTML,
      "qty": document.getElementById('modalQty').value
    }
    document.cookie ? 
    document.cookie = `${document.cookie + JSON.stringify(cartData)+ '**'}`:
    document.cookie = `items=${JSON.stringify(cartData)+ '**'}`;
    console.table(document.cookie);
  }): ''
})
  
  
  
  /*
  {
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    image.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    }

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() { 
      modal.style.display = "none";
    }
});
*/