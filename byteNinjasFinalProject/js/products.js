var products1 = null;
const productsKey = "products";

async function getProducts() {
	let localProducts = JSON.parse(localStorage.getItem(productsKey));
	// console.log(localStorage.getItem(productsKey));

	if (localProducts !== null) { // if in local storage
		products1 = localProducts;
	} else {
		try {
			const results = await fetch("./data/products.json");
			const data = await results.json();
			
			products1 = data.products;
			localStorage.setItem(productsKey, JSON.stringify(products1));
		} catch (err) {
			console.log(err);
		}
	}
  return products1;
};


/*
==========================
Collections button methods
==========================
*/

//to finlter Laptops on collection button
async function LaptopFilter(){
  const allLaptop = await getProducts();
  let LaptopCategory = allLaptop.filter(product => {
    if (product.category.name === "Laptops") {
      return product;
    }
  });
  displayProductItems(LaptopCategory);
}
//to finlter Mobile on collection button
async function MobileFilter(){
  const allMobile = await getProducts();
  let MobileCategory = allMobile.filter(product => {
    if (product.category.name === "Smart Phones") {
      return product;
    }
  });
  displayProductItems(MobileCategory);
}
//to finlter Headphones on collection button
async function HeadphoneFilter(){
  const allHeadphones = await getProducts();
  let HeadphonesCategory = allHeadphones.filter(product => {
    if (product.category.name === "Headphones") {
      return product;
    }
  });
  displayProductItems(HeadphonesCategory);
}
//to finlter Television on collection button
async function TelevisionFilter(){
  const allTelevision = await getProducts();
  let TelevisionCategory = allTelevision.filter(product => {
    if (product.category.name === "Televisions") {
      return product;
    }
  });
  displayProductItems(TelevisionCategory);
}



/*
=======================
Load Category Products
=======================
 */

const categoryCenter = document.querySelector(".category__center");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  //Search Function
  searchFunc();
  updateLatestProduct();
  displayProductItems(products1);
});

const displayProductItems = items => {
  let displayProduct = items.map(product => 
    `<div class="product category__products">
                    <div class="product__header">
                      <img src=${product.image} alt="product">
                    </div>
                    <div class="product__footer">
                      <h3>${product.title}</h3>
                      <div class="rating">
                        <img src="images/Icon/starFull.svg" alt="star Full">
                        <img src="images/Icon/starFull.svg" alt="star Full">
                        <img src="images/Icon/starFull.svg" alt="star Full">
                        <img src="images/Icon/starFull.svg" alt="star Full">
                        <img src="images/Icon/starEmpty.svg" alt="star empty">
                      </div>
                      <div class="product__price">
                        <h4>$${product.price}</h4>
                      </div>
                      <a><button type="submit" class="product__btn" onclick="AddProductToCart(${product.id})" >Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" onclick="setSelectedProductDetails(${product.id})">
                          <img src="images/Icon/eve.svg" alt="eve">
                        </a>
                      </li>
                    </ul>
                  </div>`
                  );

  displayProduct = displayProduct.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayProduct;
  }
};

/*
=============
Filtering
=============
 */

const filterBtn = document.querySelectorAll(".filter-btn");

const categoryContainer = document.getElementById("products");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async e => {
    const target = e.target.closest(".section__title");
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // remove active from buttons
      Array.from(filterBtn).forEach(btn => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      			// Load Products
			let menuCategory = products.filter(product => {
				console.log("cat:" + product.category.id);
				if (`${product.category.id}` === id) {
					return product;
				}
			});

      // // Load Products
      // let menuCategory = products.filter(product => {
      //   if (product.category.id === id) {
      //     return product;
      //   }
      // });

      if (id === "all") {
        displayProductItems(products);
      } else {
        displayProductItems(menuCategory);

      }
    }
  });
}



/*
==================
Searching Product
==================
*/

function searchFunc(){
  var data = products1;

  $('#txt-search').keyup(function(){
          var searchField = $(this).val();
    if(searchField === '')  {
      $('#filter-records').html('');
      return;
    }
    var regex = new RegExp(searchField, "i");
    var output = '<div class="row">';
    var count = 1;
      $.each(data, function(key, val){
      if ((val.category.name.search(regex) != -1) || (val.title.search(regex) != -1)) {
        console.log(val.title);
        output += `<div class="card" onclick="setSelectedProductDetails(${val.id})">`;
        output += '<div class="productImage"><img src="'+val.image+'" id = "pImage" alt="'+ val.title +'" /></div>';
        output += '<div class="ResultText">';
        output += '<h5 style="font-size: 20px;" >' + val.title + '</h5>';
        output += '<p style="font-size: 20px;" >' + val.category.name + '</p>'
        output += '</div>';
        output += '</div>';
        if(count%2 == 0){
        output += '</div><div class="row">'
        }
        count++;
      }
      });
      output += '</div>';
      $('#filter-records').html(output);
      });
}

//close search results
function closeSearch(){
  var x = document.getElementById("searchDIV");
  x.style.display = "none";
  console.log("Closed");
}

//Open Search results
function showSearch(){
  var x = document.getElementById("searchDIV");
  x.style.display = "block";
  console.log("Open");
}


/*
==================
Latest product Aile
==================
*/

const latestProductCenter = document.querySelector(".latestProduct__center");

function updateLatestProduct(){
  var data = products1;
  var data_filter = [];
  for( let i = data.length-6; i < data.length; i++){
   data_filter.push(data[i]);
  }
  displayLatestProductItems(data_filter);
}

const displayLatestProductItems = items => {
  let displayLatestProduct = items.map(product => `<div class="product category__products">
                    <div class="product__header">
                      <img src=${product.image} alt="product">
                    </div>
                    <div class="product__footer">
                      <h3>${product.title}</h3>
                      <div class="rating">
                        <img src="images/Icon/starFull.svg" alt="star Full">
                        <img src="images/Icon/starFull.svg" alt="star Full">
                        <img src="images/Icon/starFull.svg" alt="star Full">
                        <img src="images/Icon/starFull.svg" alt="star Full">
                        <img src="images/Icon/starEmpty.svg" alt="star empty">
                      </div>
                      <div class="product__price">
                        <h4>$${product.price}</h4>
                      </div>
                      <a><button type="submit" class="product__btn" onclick="AddProductToCart(${product.id})" >Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" onclick="setSelectedProductDetails(${product.id})">
                          <img src="images/Icon/eve.svg" alt="eve" >
                        </a>
                      </li>
                    </ul>
                  </div>`
                  );

  displayLatestProduct = displayLatestProduct.join("");
  if (latestProductCenter) {
    latestProductCenter.innerHTML = displayLatestProduct;
  }
};

function setSelectedProductDetails(ID){
  var product;
  for (let p of products1) {
    console.log(typeof p.id);
    console.log("p id: " + p.id);
    console.log("ID: " + ID);
    if (p.id === ID)
      product = p;
  }
  localStorage.setItem ("selectedProductDetails",JSON.stringify(product));
  window.open("product.html");
}

/*
===================
Add product to cart
===================
*/

function moveToCartPage(){
  window.open("cart.html");
}


/*
=============
Product Details Bottom
=============
 */

const btns = document.querySelectorAll(".detail-btn");
const detail = document.querySelector(".product-detail__bottom");
const contents = document.querySelectorAll(".content");

if (detail) {
  detail.addEventListener("click", e => {
    const target = e.target.closest(".detail-btn");
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      Array.from(btns).forEach(btn => {
        // remove active from all btn
        btn.classList.remove("active");
        e.target.closest(".detail-btn").classList.add("active");
      });
      // hide other active
      Array.from(contents).forEach(content => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
}
