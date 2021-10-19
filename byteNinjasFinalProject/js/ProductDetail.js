

window.addEventListener("DOMContentLoaded", async function () {
    getProductFromJson();

  });

/*
=====================
Product Details 
=====================
 */

const selectedProductContainer = document.querySelector(".SelectedProductCenter");

async function getProductFromJson(){
var selectedProduct = JSON.parse(localStorage.getItem("selectedProductDetails"));
  displaySelectedProduct(selectedProduct);
}

function displaySelectedProduct(Sproduct){
  let SelectedProductHTML = 
  `<section class="section product-details__section">
        <div class="product-detail__container">
          <div class="product-detail__left">
            <div class="details__container--left">
              <div class="product__pictures">
                <div class="pictures__container">
                  <img class="picture" src="" id="pic1" />
                </div>
                <div class="pictures__container">
                  <img class="picture" src="" id="pic2" />
                </div>
                <div class="pictures__container">
                  <img class="picture" src="" id="pic3" />
                </div>
                <div class="pictures__container">
                  <img class="picture" src="" id="pic4" />
                </div>
                <div class="pictures__container">
                  <img class="picture" src="" id="pic5" />
                </div>
              </div>
              <div class="product__picture" id="product__picture">
                <!-- <div class="rect" id="rect"></div> -->
                <div class="picture__container">
                  <img src="${Sproduct.image}" id="pic" />
                </div>
              </div>
              <div class="zoom" id="zoom"></div>
            </div>

            <div class="product-details__btn">
              <a class="add" href="">
                <span>
                  <img src="images/Icon/cart.svg" alt="add Cart">
                </span>
                ADD TO CART</a>
              <a class="buy" href="">
                <span>
                  <img src="images/Icon/card.svg" alt="card">
                </span>
                BUY NOW
              </a>
            </div>
          </div>

          <div class="product-detail__right">
            <div class="product-detail__content">
              <h3 >${Sproduct.title}</h3>
              <div class="price">
                <spanclass="new__price">$${Sproduct.price}</span>
              </div>
              <div class="product__review">
                <div class="rating">
                  <img src="images/Icon/starFull.svg" alt="star Full">
                  <img src="images/Icon/starFull.svg" alt="star Full">
                  <img src="images/Icon/starFull.svg" alt="star Full">
                  <img src="images/Icon/starFull.svg" alt="star Full">
                  <img src="images/Icon/starEmpty.svg" alt="star empty">
                </div>
                <a class="rating__quatity">3 reviews</a>
              </div>

              <div class="product__info-container">

                    <div class="input-counter">
                      <span>Quantity:</span>
                      <div>
                        <span class="minus-btn">
                          <img src="images/Icon/minus.svg" alt="minus">
                        </span>
                        <input type="text" min="1" value="1" max="10" class="counter-btn">
                        <span class="plus-btn">
                          <img src="images/Icon/plus.svg" alt="plus">
                        </span>
                      </div>
                    </div>
                  </li>

                  <li>
                    <span>Subtotal:</span>
                    <a id="ProductSubTotal" class="new__price">$250.99</a>
                  </li>
                  <li>
                    <span>Brand:</span>
                    <a>${Sproduct.brand}</a>
                  </li>
                  <li>
                    <span>Product Type:</span>
                    <a>${Sproduct.category.name}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="product-detail__bottom">
        
          <div class="title__container tabs">
            <div class="section__titles category__titles ">
              <div class="section__title detail-btn active" data-id="description">
                <span class="dot"></span>
                <h1 class="primary__title">Description</h1>
              </div>
            </div>

            <div class="section__titles">
              <div class="section__title detail-btn" data-id="shipping">
                <span class="dot"></span>
                <h1 class="primary__title">Return Policy</h1>
              </div>
            </div>
          </div>

          <div class="detail__content">
            <div class="content active" id="description">
              <p>${Sproduct.description}</p>
            </div>

            <div class="content" id="shipping">
              <h3>Returns Policy</h3>
              <p>You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay
                the return shipping costs if the return is a result of our error (you received an incorrect or defective
                item, etc.).</p>
              <p>You should expect to receive your refund within four weeks of giving your package to the return
                shipper, however, in many cases you will receive a refund more quickly. This time period includes the
                transit time for us to receive your return from the shipper (5 to 10 business days), the time it takes
                us to process your return once we receive it (3 to 5 business days), and the time it takes your bank to
                process our refund request (5 to 10 business days).
              </p>
              <p>If you need to return an item, simply login to your account, view the order using the 'Complete
                Orders' link under the My Account menu and click the Return Item(s) button. We'll notify you via
                e-mail of your refund once we've received and processed the returned item.
              </p>
              <h3>Shipping</h3>
              <p>We can ship to virtually any address in the world. Note that there are restrictions on some products,
                and some products cannot be shipped to international destinations.</p>
              <p>When you place an order, we will estimate shipping and delivery dates for you based on the
                availability of your items and the shipping options you choose. Depending on the shipping provider you
                choose, shipping date estimates may appear on the shipping quotes page.
              </p>
              <p>Please also note that the shipping rates for many items we sell are weight-based. The weight of any
                such item can be found on its detail page. To reflect the policies of the shipping companies we use, all
                weights will be rounded up to the next full pound.
              </p>
            </div>
          </div>
        </div>
      </section>`
 selectedProductContainer.innerHTML = SelectedProductHTML;
}
