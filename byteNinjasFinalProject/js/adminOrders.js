/*
- orderId
- customer
    -id
    -name
- orderTime
- orderItems
    -product
    -quantity
- orderStatus
- orderTotal
 */

 /*
=============
Global
=============
*/
// DOM Elements
const ordersTableBody = document.querySelector("#ordersTableBody");
const searchOrdersInput = document.querySelector("#searchOrdersInput");

// Constants
const ordersKey = "orders";

const today = new Date().valueOf();
const yesterday = today - (1000 * 60 * 60 * 24);
const oneWeekAgo = today - (1000 * 60 * 60 * 24 * 7);
const oneMonthAgo = today - (1000 * 60 * 60 * 24 * 7 * 4);
const oneYearAgo = today - (1000 * 60 * 60 * 24 * 7 * 4 * 12);

const orderStatuses = ["Pending", "Ready for Shipment", "Shipped", "Completed", "Cancelled"];

const defaultOrders = [
    {
        "id": 1,
        "customer": {"id": 1, "name": "Mukhtar Yusuf"},
        "orderTime": moment().year(2021).month(8).date(25).valueOf(),
        "orderItems": [
            {
                "product": {"id": 1, "name": "Apple iPhone 11", "price": 760, "category": "Smart Phones"},
                "quantity": 2,
                "subTotal": 1520
            },
            {
                "product": {"id": 7, "name": "Boat Rocker", "price": 265, "category": "Headphones"},
                "quantity": 2,
                "subTotal": 530
            }
        ],
        "orderStatus": orderStatuses[0],
        "orderTotal": 2050
    },
    {
        "id": 2,
        "customer": {"id": 2, "name": "Johnny Appleseed"},
        "orderTime": moment().year(2021).month(8).date(20).valueOf(),
        "orderItems": [
            {
                "product": {"id": 14, "name": "Acer laptop4", "price": 1800, "category": "Laptops"},
                "quantity": 1,
                "subtotal": 1800
            },
            {
                "product": {"id": 7, "name": "Boat Rocker", "price": 265, "category": "Headphones"},
                "quantity": 1,
                "subTotal": 265
            }
        ],
        "orderStatus": orderStatuses[0],
        "orderTotal": 2065
    },
    {
        "id": 3,
        "customer": {"id": 3, "name": "Tim Cook"},
        "orderTime": moment().year(2021).month(8).date(2).valueOf(),
        "orderItems": [
            {
                "product": {"id": 14, "name": "Acer laptop4", "price": 1800, "category": "Laptops"},
                "quantity": 1,
                "subTotal": 1800
            },
            {
                "product": {"id": 7, "name": "Boat Rocker", "price": 265, "category": "Headphones"},
                "quantity": 2,
                "subTotal": 530
            }
        ],
        "orderStatus": orderStatuses[0],
        "orderTotal": 2330
    },
    {
        "id": 4,
        "customer": {"id": 4, "name": "Mark Zuckerberg"},
        "orderTime": moment().year(2021).month(5).date(23).valueOf(),
        "orderItems": [
            {
                "product": {"id": 14, "name": "Acer laptop4", "price": 1800, "category": "Laptops"},
                "quantity": 1,
                "subTotal": 1800,
            },
            {
                "product": {"id": 7, "name": "Boat Rocker", "price": 265, "category": "Headphones"},
                "quantity": 3,
                "subTotal": 795
            }
        ],
        "orderStatus": orderStatuses[0],
        "orderTotal": 2595
    },
    {
        "id": 4,
        "customer": {"id": 5, "name": "Prikshit Soni"},
        "orderTime": moment().year(2021).month(4).date(12).valueOf(),
        "orderItems": [
            {
                "product": {"id": 14, "name": "Acer laptop4", "price": 1800, "category": "Laptops"},
                "quantity": 1,
                "subTotal": 1800
            },
            {
                "product": {"id": 7, "name": "Boat Rocker", "price": 265, "category": "Headphones"},
                "quantity": 4,
                "subTotal": 1060
            }
        ],
        "orderStatus": orderStatuses[0],
        "orderTotal": 2860
    },
    {
        "id": 5,
        "customer": {"id": 1, "name": "Mukhtar Yusuf"},
        "orderTime": moment().year(2021).month(3).date(17).valueOf(),
        "orderItems": [
            {
                "product": {"id": 14, "name": "Acer laptop4", "price": 1800, "category": "Laptops"},
                "quantity": 2,
                "subTotal": 3600
            },
            {
                "product": {"id": 7, "name": "Boat Rocker", "price": 265, "category": "Headphones"},
                "quantity": 2,
                "subTotal": 530
            }
        ],
        "orderStatus": orderStatuses[0],
        "orderTotal": 4130
    }
];

// Variables
var fixedOrders = null;
var orders = null;
var maxOrdersId = -1;

/*
=============
Document Loaded
=============
*/
window.addEventListener("DOMContentLoaded", function () {
    // localStorage.removeItem(ordersKey);
    getOrders();
    displayOrders();
});

/*
=============
Get Orders
=============
*/
function getOrders() {
    let localOrders = localStorage.getItem(ordersKey);

    if (localOrders !== null) {
        fixedOrders = JSON.parse(localOrders);
        orders = JSON.parse(localOrders);
    } else {
        fixedOrders = defaultOrders.map(o => o);
        orders = defaultOrders;
        saveToLocalStorage2();
    }

    maxOrdersId = orders.reduce((a, o) => Math.max(a, o.id), 0);
}

/*
=============
Orders Helpers
=============
*/
function saveToLocalStorage2() {
    localStorage.setItem(ordersKey, JSON.stringify(fixedOrders));
}

function displayOrders() {
    if (ordersTableBody === null)
        return;

    ordersTableBody.innerHTML = "";

    let displayOrders = orders.map(o => `
        <tr>
        <th scope="row">${o.id}</th>
        <td>${o.customer.name}</td>
        <td>${formatTimeFromTimeStamp(o.orderTime)}</td>
        <td>
            <select id="orderStatusSelect" class="form-control form-control-lg" onchange="updateOrderStatus()" data-id=${o.id}>
                <option>${orderStatuses[0]}</option>
                <option>${orderStatuses[1]}</option>
                <option>${orderStatuses[2]}</option>
                <option>${orderStatuses[3]}</option>
                <option>${orderStatuses[4]}</option>
            </select>
        </td>
        <td>$${o.orderTotal}</td>
        <td><button class="btn table__btn">View</button></td>
        </tr>
    `);

    displayOrders = displayOrders.join("");

    ordersTableBody.innerHTML = displayOrders;
}

function filterOrders() {
    console.log("in filter");
    const searchString = searchOrdersInput.value;
    if (searchString === null || searchString.length === 0) {
        orders = fixedOrders.map(o => o);
    } else {
        let searchNumber = Number(searchString);
        console.log(typeof searchString);
        console.log(typeof searchNumber);
        if (isNaN(searchNumber)) {
            orders = fixedOrders.filter(o => o.customer.name.includes(searchString));
        } else {
            orders = fixedOrders.filter(o => o.id === searchNumber);
        }
    }

    displayOrders();
}

function updateOrderStatus() {
    // productCategoryInput.options[productCategoryInput.selectedIndex]
    console.log("in status select");
    let orderStatusSelect = document.querySelector("#orderStatusSelect");
    if (orderStatusSelect === null)
        return;
    
    let orderId = Number(orderStatusSelect.dataset.id);
    let selectedIndex = orderStatusSelect.options[orderStatusSelect.selectedIndex];

    let order = orders.find(o => o.id === orderId);
    order.orderStatus = orderStatusSelect.value;

    saveToLocalStorage2();
}

function formatTimeFromTimeStamp(timestamp) {
    let date = new Date(timestamp);
    let dateString = moment(date).format("MMMM Do, YYYY");

    let momentDate = moment().year(2021).month(4).date(15).valueOf();
    console.log(moment(momentDate).format("MMMM Do, YYYY"));
    // console.log(typeof momentDate);
    // console.log(dateString);
    return dateString;
}