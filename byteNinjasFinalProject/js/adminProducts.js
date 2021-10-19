/*
=============
Global
=============
*/

// DOM Elements
const addProductTitle = document.querySelector("#addProductTitle");
const productNameInput = document.querySelector("#addProductName");
const productBrandInput = document.querySelector("#addProductBrand");
const productPriceInput = document.querySelector("#addProductPrice");
const productDescInput = document.querySelector("#addProductDescription");
const productCategoryInput = document.querySelector("#addProductCategory");
const productImageInput = document.querySelector("#addProductImageUrl");
const productSaveButton = document.querySelector("#addProductSave");

// Constants
const productsKey = "products";

// Variables
var products;
var maxId;
var productToUpdate = null;
var indexToDelete = -1;

/*
=============
Add Product
=============
*/
function addProduct() {
	const selectedOption = productCategoryInput.options[productCategoryInput.selectedIndex];
	const selectedCategoryId = Number(selectedOption.dataset.id);

	const addedCategory = { "id": selectedCategoryId, "name": productCategoryInput.value };
	let product = {
		"id": ++maxId,
		"title": productNameInput.value,
		"brand": productBrandInput.value,
		"description": productDescInput.value,
		"image": productImageInput.value,
		"price": productPriceInput.value,
		"category": addedCategory,
		"rating": 0,
		"ratingCount": 0
	};
  	products.push(product);
	saveToLocalStorage();

	displayProductItems(products);
	clearAddProductForm();
}

/*
=============
Update Product
=============
*/
function updateProduct() {
	const selectedOption = productCategoryInput.options[productCategoryInput.selectedIndex];
	const selectedCategoryId = Number(selectedOption.dataset.id);

	const updatedCategory = { "id": selectedCategoryId, "name": productCategoryInput.value };

	productToUpdate.title = productNameInput.value;
	productToUpdate.brand = productBrandInput.value;
	productToUpdate.price = productPriceInput.value;
	productToUpdate.description = productDescInput.value;
	productToUpdate.category = updatedCategory;
	productToUpdate.image = productImageInput.value;
	
	saveToLocalStorage();
	displayProductItems(products);
	clearAddProductForm();
}

/*
=============
Delete Product
=============
*/
function deleteProduct() {
	if (indexToDelete === -1)
		return;

	products.splice(indexToDelete, 1);
	saveToLocalStorage();
	displayProductItems(products);
	indexToDelete = -1;
}

/*
=============
Products Helpers
=============
*/

// Clear Add Product Form
function clearAddProductForm() {
	productNameInput.value = "";
	productBrandInput.value = "";
	productPriceInput.value = "";
	productDescInput.value = "";
	productCategoryInput.value = "";
	productImageInput.value = "";
}

// Save to Local Storage
function saveToLocalStorage() {
	localStorage.setItem(productsKey, JSON.stringify(products));
}

// Show Update Product Modal
function showUpdateProductModal(productId) {
	let productIndex = products.findIndex(p => p.id === productId);
	
	var titleString = "";
	if (productIndex !== -1) {
		titleString = "Update Product";
		productToUpdate = products[productIndex];

		productNameInput.value = productToUpdate.title;
		productBrandInput.value = productToUpdate.brand;
		productPriceInput.value = productToUpdate.price;
		productDescInput.value = productToUpdate.description;
		productCategoryInput.value = productToUpdate.category.name;
		productImageInput.value = productToUpdate.image;
	} else {
		titleString = "Add Product";
		productToUpdate = null;
		clearAddProductForm();
	}

	addProductTitle.innerHTML = titleString;
	productSaveButton.innerHTML = titleString;

	$("#addProductModal").modal("show");
}

// Show Delete Product Modal
function showDeleteProductModal(productId) {
	$("#deleteProductModal").modal("show");
	indexToDelete = products.findIndex(p => p.id === productId);
}

// Save Product Clicked
function addProductSaveClicked() {
	if (productToUpdate === null)
		addProduct();
	else
		updateProduct();
}

async function getProducts() {
	let localProducts = JSON.parse(localStorage.getItem(productsKey));
	// console.log(localStorage.getItem(productsKey));

	if (localProducts !== null) { // if in local storage
		products = localProducts;
	} else {
		try {
			const results = await fetch("./data/products.json");
			const data = await results.json();
			
			products = data.products;
			localStorage.setItem(productsKey, JSON.stringify(products));
		} catch (err) {
			console.log(err);
		}
	}

	maxId = products.reduce((a, p) => Math.max(a, p.id), 0);
};

/*
=============
Load Category Products
=============
*/
const categoryCenter = document.querySelector(".category__center");

window.addEventListener("DOMContentLoaded", async function () {
	// localStorage.removeItem(productsKey);
	await getProducts();
	displayProductItems(products);
});

/* <li>
	<a data-tip="Add To Wishlist" data-place="left" href="#">
		<img src="images/Icon/heart.svg" alt="heart">
	</a>
</li> */

const displayProductItems = items => {
  categoryCenter.innerHTML = "";
  let displayProduct = items.map(product => `<div class="product category__products">
					<div class="product__header">
					  <img src=${product.image} alt="product">
					</div>
					<div class="product__footer">
					  <h3>${product.title}</h3>
					  <div class="product__price">
						<h4>$${product.price}</h4>
					  </div>
					  <a href="#"><button type="submit" class="product__btn" onclick="showDeleteProductModal(${product.id})" href="javascript:;">Delete</button></a>
					</div>
					<ul>
					  <li>
						<a data-tip="Quick View" data-place="left" onclick="showUpdateProductModal(${product.id})" href="javascript:;">
						  <img src="images/Icon/eve.svg" alt="eve">
						</a>
					  </li>
					  <li>
						<a data-tip="Add To Compare" data-place="left" onclick="showDeleteProductModal(${product.id})" href="javascript:;">
						  <img src="images/Icon/trash.svg" alt="comapare">
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

const categoryContainer = document.getElementById("products");

if (categoryContainer) {
  	categoryContainer.addEventListener("click", async e => {
		const filterBtn = document.querySelectorAll(".filter-btn");
		
		const target = e.target.closest(".section__title");
		if (!target) return;

		const id = target.dataset.id;
		console.log("id before: " + id);

		if (id) {
			console.log("id: " + id);
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

			if (target.dataset.id === "-1") {
				displayProductItems(products);
			} else {
				displayProductItems(menuCategory);
			}
		}
	});
}

/*
=============
Product Details Left
=============
*/
const pic1 = document.getElementById("pic1");
const pic2 = document.getElementById("pic2");
const pic3 = document.getElementById("pic3");
const pic4 = document.getElementById("pic4");
const pic5 = document.getElementById("pic5");
const picContainer = document.querySelector(".product__pictures");
const zoom = document.getElementById("zoom");
const pic = document.getElementById("pic");

// Picture List
const picList = [pic1, pic2, pic3, pic4, pic5];

// Active Picture
let picActive = 1;

["mouseover", "touchstart"].forEach(event => {
  if (picContainer) {
	picContainer.addEventListener(event, e => {
	  const target = e.target.closest("img");
	  if (!target) return;
	  const id = target.id.slice(3);
	  changeImage(`./images/products/iPhone/iphone${id}.jpeg`, id);
	});
  }
});

// change active image
const changeImage = (imgSrc, n) => {
  // change the main image
  pic.src = imgSrc;
  // change the background-image
  zoom.style.backgroundImage = `url(${imgSrc})`;
  //   remove the border from the previous active side image
  picList[picActive - 1].classList.remove("img-active");
  // add to the active image
  picList[n - 1].classList.add("img-active");
  //   update the active side picture
  picActive = n;
};

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
