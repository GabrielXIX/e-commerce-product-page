//Thumbnail elements
const thumbnailContainer = document.querySelector("[data-thumbnail-container]");
const thumbnails = document.querySelectorAll("[data-thumbnail]");
const productImg = document.querySelector("[data-product-img]");

//Product quantity elements
const quantityContainer = document.querySelector('[data-quantity-container]');
const minus = document.querySelector('[data-minus]');
const plus = document.querySelector('[data-plus]');
const quantity = document.querySelector('[data-quantity]');

//Cart adding
const addBtn = document.querySelector("[data-add]");
const cartEmptyText = document.querySelector("[data-empty]");
const amountIndicator = document.querySelector("[data-indicator]");
var amount = parseInt(quantity.textContent);

//Pricing variable
var discountPrice = document.querySelector('[data-discount-price]').textContent;
discountPrice = parseInt(discountPrice.substring(1));

//Dropdown
const dropdownMenu = document.querySelector('[data-dropdown-menu]');

window.onload = () => {

    //Convert discount price to integer
    

}

//Thumbnail change event listener
thumbnailContainer.addEventListener("click", e => {

    if(e.target.hasAttribute('data-thumbnail')) {    

        if(!e.target.hasAttribute('active')) {   
            let imgIndex;    

            //Remove previous active thumbnail
            thumbnails.forEach(a => {
                if(a.hasAttribute('active')) {
                    a.removeAttribute('active');
                }
            });
            
            //Add active attribute to clicked thumbnail
            thumbnails.forEach(b => {
                if(e.target === b) {
                    imgIndex = Array.from(thumbnails).indexOf(b);
                    b.setAttribute('active', '');
                }
            });

            //Change the image src to get large preview
            productImg.firstElementChild.src = "./images/image-product-" + (imgIndex + 1) + ".jpg";
            productImg.firstElementChild.alt = "image-product-" + (imgIndex + 1 );
        }
    }  
});

//Quantity selector
quantityContainer.addEventListener("click", e => {

    if(e.target.hasAttribute('data-minus')) {

        if(quantity.textContent != '1') {
            quantity.textContent = (parseInt(quantity.textContent) - 1).toString();
        }       
    }
    else if(e.target.hasAttribute('data-plus')) {

        if(quantity.textContent != '99') {
            quantity.textContent = (parseInt(quantity.textContent) + 1).toString();
        } 
    }
});

//Cart dropdown opening
document.addEventListener("click", e => {

    let currentDropdown = null;
    const isDropdownBtn = e.target.matches('[data-dropdown-btn]');

    //Click inside dropdown menu
    if((!isDropdownBtn && e.target.closest("[data-dropdown]"))) return;

    //Toogle dropdown menu
    if(isDropdownBtn) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.toggleAttribute("active");
    }

    //Removes other active dropdowns
    document.querySelectorAll("[data-dropdown][active]").forEach(e => {
        if(e === currentDropdown) return;
        e.removeAttribute("active");
    });
});

//Adding a product btn
addBtn.addEventListener("click", e => {

    let total = discountPrice * amount; 

    cartEmptyText.remove();
    
    //Creating the product element inside the cart

    //Products parent
    if(document.querySelector('.dropdown__details') == null) {
        var dropdownDetails = document.createElement('div');
        dropdownDetails.className = "dropdown__details";
        dropdownMenu.appendChild(dropdownDetails);
    }
    else {
        var dropdownDetails = document.querySelector(".dropdown__details");
    }

    //Product parent
    const dropdownProduct = document.createElement('div');
    dropdownProduct.className = "dropdown__product";
    dropdownDetails.appendChild(dropdownProduct);

    //Product children
    const dropdownImg = document.createElement('img');
    dropdownImg.src = "./images/image-product-1-thumbnail.jpg";
    dropdownImg.alt = "image-product-1-thumbnail";
    dropdownImg.className = "dropdown__img";
    dropdownProduct.appendChild(dropdownImg);

    const cartProductTitle = document.createElement('h5');
    cartProductTitle.textContent = "Fall Limitied Edition Sneakers";
    dropdownProduct.appendChild(cartProductTitle);

    const dropdownDelete = document.createElement('button');
    dropdownDelete.className = "dropdown__delete";
    dropdownDelete.setAttribute("data-delete", "");
    dropdownProduct.appendChild(dropdownDelete);

    const dropdownDeleteIcon = document.createElement('img');
    dropdownDeleteIcon.src = "./images/icon-delete.svg";
    dropdownDeleteIcon.alt = "icon-delete";
    dropdownDeleteIcon.setAttribute("data-delete", "");
    dropdownDelete.appendChild(dropdownDeleteIcon);

    const priceAmount = document.createElement('p');
    priceAmount.textContent = "$" + discountPrice.toString() + " x " + amount.toString();
    dropdownProduct.appendChild(priceAmount);

    const totalElement = document.createElement('p');
    totalElement.textContent = "$" + total.toString() + ".00";
    totalElement.className = "dropdown__total";
    dropdownProduct.appendChild(totalElement);

    if(document.querySelector(".dropdown__checkout") == null) {

        //Checkout parent element
        const checkout = document.createElement('div');
        checkout.className = "dropdown__checkout";
        dropdownMenu.appendChild(checkout);

        //Checkout button
        const checkoutBtn = document.createElement('button');
        checkoutBtn.classList.add('primary-btn', 'primary-btn--cart');
        checkoutBtn.textContent = "Checkout";
        checkout.appendChild(checkoutBtn);
    }

    //Updating the cart quantity indicator
    if(amountIndicator.textContent == "0") {
        amount = parseInt(quantity.textContent);
    }
    else {
        amount += parseInt(quantity.textContent);
    }
    amountIndicator.textContent = amount.toString();
    amountIndicator.style.opacity = 1;
})