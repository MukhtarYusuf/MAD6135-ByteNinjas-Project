/*
=============
Global
=============
*/

// DOM Elements
const categoriesContainer = document.querySelector("#categoriesContainer");
const productCategoryInput1 = document.querySelector("#addProductCategory");
const productCategoriesHeader = document.querySelector("#categoriesHeader");
const slider6 = document.getElementById("glide6");

const addEditCategoryTitle = document.querySelector("#addEditCategoryTitle");
const addEditCategoryNameInput = document.querySelector("#addEditCategoryName");
const addEditCategoryImageInput = document.querySelector("#addEditCategoryImage");
const addEditCategorySaveButton = document.querySelector("#addEditCategorySave");

const categoryCenter1 = document.querySelector(".category__center");

// Constants
const categoriesKey = "categories";
const productsKey1 = "products";
const defaultCategories = {
    "categories": [
        {
            "id": 1,
            "name": "Smart Phones",
            "image": "./images/Icon/smartphone.svg" 
        },
        {
            "id": 2,
            "name": "Headphones",
            "image": "./images/Icon/headphones1.svg" 
        },
        {
            "id": 3,
            "name": "Laptops",
            "image": "./images/Icon/laptop.svg" 
        },
        {
            "id": 4,
            "name": "Printers",
            "image": "./images/Icon/printer.svg" 
        },
        {
            "id": 5,
            "name": "Televisions",
            "image": "./images/Icon/television.svg" 
        }
    ]};

// Variables
var categories = null;
var maxCategoryId = 0;
var categoryToUpdate = null;
var categoryIndexToDelete = -1;

var products1 = null;

/*
=============
Document Loaded
=============
*/
window.addEventListener("DOMContentLoaded", function () {
    getProducts1();
	getCategories();

    updateCategoriesUI();
});

/*
=============
Get Categories
=============
*/
function getCategories() {
    let localCategories = localStorage.getItem(categoriesKey);
    
    console.log("local cat: " + localCategories);
    if (localCategories !== null) {
        categories = JSON.parse(localCategories);
    } else {
        categories = defaultCategories.categories;
        saveToLocalStorage1();
    }

    maxCategoryId = categories.reduce((a, c) => Math.max(a, c.id), 0);
}

/*
=============
Add Category
=============
*/
function addCategory() {
    let category = {
        "id": ++maxCategoryId,
        "name": addEditCategoryNameInput.value,
        "image": addEditCategoryImageInput.value
    };
    categories.push(category);
    
    saveToLocalStorage1();
    updateCategoriesUI();
}

/*
=============
Update Category
=============
*/
function updateCategory() {
    if (categoryToUpdate === null)
        return;

    categoryToUpdate.name = addEditCategoryNameInput.value;
    categoryToUpdate.image = addEditCategoryImageInput.value;

    for (let product of products) {
        if (product.category.id === categoryToUpdate.id) {
            product.category.name = categoryToUpdate.name;
        }
    }

    saveToLocalStorage1();
    updateCategoriesUI();
}

/*
=============
Delete Category
=============
*/
function deleteCategory() {
    if (categoryIndexToDelete === -1)
        return;

    let productsToKeep = products1.filter(p => {
        console.log("product cat id: " + p.category.id);
        console.log("cat delete id: " + categories[categoryIndexToDelete].id);
        return p.category.id !== categories[categoryIndexToDelete].id;
    });

    console.log("products to keep count: " + productsToKeep.length);
    products1 = productsToKeep;

    categories.splice(categoryIndexToDelete, 1);

    saveToLocalStorage1();
    updateCategoriesUI();
    displayProductsItems1();
}

/*
=============
Get Products
=============
*/
async function getProducts1() {
    let localProducts = JSON.parse(localStorage.getItem(productsKey1));

	if (localProducts !== null) { // if in local storage
		products1 = localProducts;
	} else {
		try {
			const results = await fetch("./data/products.json");
			const data = await results.json();
			
			products1 = data.products;
			localStorage.setItem(productsKey1, JSON.stringify(products1));
		} catch (err) {
			console.log(err);
		}
	}
}

/*
=============
Display Categories Header
=============
*/
function displayCategoriesHeader() {
    if (categoriesHeader === null)
        return;

    categoriesHeader.innerHTML = "";

    // Populate category header from categories
    let displayCategoriesHeader = categories.map(c => `
        <li class="glide__slide">
            <div class="section__titles section__titles__center">
                <div class="section__title filter-btn" data-id=${c.id}>
                <img class="cateIcon" src=${c.image} alt="samrtphones">
                <h1 class="primary__title">${c.name}</h1>
                </div>
            </div>
        </li>
    `);

    // Add all category
    displayCategoriesHeader.unshift(`
        <li class="glide__slide">
            <div class="section__titles section__titles__center">
                <div class="section__title filter-btn active" data-id=${-1}>
                <img class="cateIcon" src="images/Icon/smartphone.svg" alt="samrtphones">
                <h1 class="primary__title">All</h1>
                </div>
            </div>
        </li>
    `);

    displayCategoriesHeader = displayCategoriesHeader.join("");

    categoriesHeader.innerHTML = displayCategoriesHeader;
}

/*
=============
Display Categories
=============
*/
function displayCategories() {
    if (categoriesContainer === null)
        return;
    
    categoriesContainer.innerHTML = "";

    let displayCategories = categories.map(c => `<div class="product category__products">
					<div class="product__header">
					  <img src=${c.image} alt="product">
					</div>
					<div class="product__footer">
					  <h4>${c.name}</h4>
					  <a href="#"><button type="submit" class="product__btn" onclick="showDeleteCategoryModal(${c.id})" href="javascript:;">Delete</button></a>
					</div>
					<ul>
					  <li>
						<a data-tip="Quick View" data-place="left" onclick="showAddEditCategoryModal(${c.id})" href="javascript:;">
						  <img src="images/Icon/eve.svg" alt="eve">
						</a>
					  </li>
					  <li>
						<a data-tip="Add To Compare" data-place="left" onclick="showDeleteCategoryModal(${c.id})" href="javascript:;">
						  <img src="images/Icon/trash.svg" alt="comapare">
						</a>
					  </li>
					</ul>
				</div>`
    );
    displayCategories = displayCategories.join("");

    categoriesContainer.innerHTML = displayCategories;
}

/*
=============
Display Categories Options in Add Product
=============
*/
function displayCategoriesOptions() {
    if (productCategoryInput1 === null)
        return;

    productCategoryInput1.innerHTML = "";

    let displayCategoriesOptions = categories.map(c => `
        <option data-id=${c.id}>${c.name}</option>
    `);
    displayCategoriesOptions = displayCategoriesOptions.join("");

    productCategoryInput1.innerHTML = displayCategoriesOptions;
}

function displayProductsItems1() {
    categoryCenter.innerHTML = "";
    let displayProduct = products1.map(product => `<div class="product category__products">
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
                <img src="images/Icon/compare.svg" alt="comapare">
                </a>
            </li>
            </ul>
        </div>`
    );

    displayProduct = displayProduct.join("");
    if (categoryCenter1) {
        categoryCenter1.innerHTML = displayProduct;
    }
}

/*
=============
Categories Helpers
=============
*/
// Save to Local Storage
function saveToLocalStorage1() {
    localStorage.setItem(categoriesKey, JSON.stringify(categories));
    localStorage.setItem(productsKey1, JSON.stringify(products1));
}

// Mount Categories Slider
function mountSlider6() {
    if (slider6) {
        console.log("In slider 6");
        new Glide(slider6, {
            type: "slider",
            startAt: 0,
            perView: 5,
            bound: true,
            animationDuration: 400,
            animationTimingFunc: "linear",
        }).mount();
    }
}

// Add Edit Category Save Clicked
function addEditCategorySaveClicked() {
    if (categoryToUpdate === null)
        addCategory();
    else
        updateCategory();
}

// Update Categories UI
function updateCategoriesUI() {
    displayCategories();
    displayCategoriesHeader();
    mountSlider6();
    
    displayCategoriesOptions();
}

// Show Add Edit Category Modal
function showAddEditCategoryModal(categoryId) {
    if (categories === null)
        return;

    let categoryIndex = categories.findIndex(c => c.id === categoryId);

    var titleString = "";
    if (categoryIndex !== -1) {
        titleString = "Update Category";
        categoryToUpdate = categories[categoryIndex];

        addEditCategoryNameInput.value = categoryToUpdate.name;
        addEditCategoryImageInput.value = categoryToUpdate.image;
    } else {
        titleString = "Add Category";
        categoryToUpdate = null;
        clearAddEditCategoryForm();
    }

    addEditCategoryTitle.innerHTML = titleString;
    addEditCategorySaveButton.innerHTML = titleString;

    $("#addEditCategoryModal").modal("show");
}

// Show Delete Category Modal
function showDeleteCategoryModal(categoryId) {
    $("#deleteCategoryModal").modal("show");
	categoryIndexToDelete = categories.findIndex(c => c.id === categoryId);
}

function clearAddEditCategoryForm() {
    addEditCategoryNameInput.value = "";
    addEditCategoryImageInput.value = "";
}