window.addEventListener("load", (event)=>{
  let cartData; //holder for cart data

  const buildModal = (data, prefix) => { //build modals
    console.log(data);
    document.getElementById(prefix + 'Img').src = data.img;
    //document.getElementById(prefix + 'ItemId').value = data.id;
    document.getElementById(prefix + 'Sku').innerHTML = data.sku;
    document.getElementById(prefix + 'Name').innerHTML = data.item_name;
    document.getElementById(prefix + 'Price').innerHTML = data.price;
    document.getElementById(prefix + 'Desc').innerHTML = data.description;
  }

  const buildCookie = (data)=> {  //build cookies
    document.cookie ? 
    document.cookie = `${document.cookie + JSON.stringify(data)+ '**'}`:
    document.cookie = `items=${JSON.stringify(data)+ '**'}`;
  } 

  const filterData = (data, term, filter) => { //filter data
    console.log('filtering');
    if(term === '' && filter === '')return; //guard clasue for no input
    let cat = filter.replace(' ', '_').toLowerCase(); //convert the category to match data in attribute
    let title = new RegExp(term, 'gi'); //create a regex for the search term
    for(let i = 0; i < data.length; i++){
      let tags = JSON.parse(data[i].dataset.iteminfo); //get the tags from the data attribute
      console.log(tags);
      title.test(tags.item_name) && tags.item_category === cat ? 
        (data[i].style.display = "block", console.log('should match some items')): data[i].style.display = "none"; //if the filter matches the name and category, display it
    }
  }

  if(document.getElementById('pgCatalogue')){ //catalogue page exclusive javascript
    (()=>{ //add event listeners to each grocery image
      var groceryItems = document.getElementsByClassName('groceryImg') ?? {};
      let groceryBtns = document.getElementsByClassName('addCartButtonStyle') ?? {};
      for (let i = 0; i < groceryBtns.length; i++) {
        groceryItems[i] ? groceryBtns[i].addEventListener("click", function(e) {
          let groceryData = JSON.parse(JSON.parse(JSON.stringify(groceryItems[i].parentElement.dataset.iteminfo)));
          buildModal(groceryData, 'catamodal');
        }) : ""
      }
    })();
    document.getElementById('catamodalSubmit').addEventListener("click", function(e) { //add event listener to modal submit button
      cartData = {
        "img": document.getElementById('catamodalImg').src,
        //"id": document.getElementById('catamodalItemId').value,
        "sku": document.getElementById('catamodalSku').innerHTML,
        "name": document.getElementById('catamodalName').innerHTML,
        "price": document.getElementById('catamodalPrice').innerHTML,
        "desc": document.getElementById('catamodalDesc').innerHTML,
        "qty": document.getElementById('catamodalQty').value
      }
      buildCookie(cartData);
    })
    document.getElementById('searchTerm').addEventListener("change", function(e) { //add event listener to search bar
      filterData(document.getElementsByClassName('catalogueItem'), e.target.value, document.getElementById('categorySelect').value);
    }) 
    document.getElementById('categorySelect').addEventListener("change", function(e) {//add event listener to category select
      filterData(document.getElementsByClassName('catalogueItem'), document.getElementById('searchTerm').value, e.target.value);
    }) 
  }

  if(document.getElementById('pgHome')){ //home page exclusive javascript
    for(let i of document.getElementsByClassName('addCartButtonStyle')){
      i.addEventListener("click", function(e) {
        console.log();
        cartData = {
          "img": JSON.parse(this.parentNode.parentNode.parentNode.dataset.iteminfo).img,
          "id": JSON.parse(this.parentNode.parentNode.parentNode.dataset.iteminfo).id,
          "sku": JSON.parse(this.parentNode.parentNode.parentNode.dataset.iteminfo).sku,
          "name": JSON.parse(this.parentNode.parentNode.parentNode.dataset.iteminfo).item_name,
          "price": JSON.parse(this.parentNode.parentNode.parentNode.dataset.iteminfo).price,
          "desc": JSON.parse(this.parentNode.parentNode.parentNode.dataset.iteminfo).description,
          "qty": this.parentNode.previousSibling.previousSibling.value
        }
        buildCookie(cartData);
      })
    }

  }

  if(document.getElementById('pgCart')){//cart page exclusive javascript
    for(let i of document.getElementsByClassName('remBtn')){//add event listeners to remove buttons
      i.addEventListener("click", function(e) {
        e.target.parentNode.parentNode.style.display = "none"; //hide the item for now, doesnt completely remove
      })
    } 
  } 
})