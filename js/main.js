//Main thumbnail elements
const thumbnailContainer = document.querySelector("[data-thumbnail-container]");
const openLightbox = document.querySelector("[data-open-lightbox]");

//lightbox thumbnail elements
const lighboxContainer = document.querySelector("[data-lightbox-container]");
const lightbox = document.querySelector("[data-lightbox]");
const close = document.querySelector("[data-close]");

//Array for main and lightbox product image large view
const productImgs = [
    document.querySelector("[data-product-img]"),
    document.querySelector("[data-product-img-lightbox]")
];

//Thumbnail groups nested array
var imgIndex;
const thumbnailGroups = [
    Array.from(document.querySelectorAll("[data-thumbnail]")),
    Array.from(document.querySelectorAll("[data-thumbnail-lightbox]"))
];

//Product elements
const productName = document.querySelector("[data-name]");
const quantityContainer = document.querySelector('[data-quantity-container]');
const minus = document.querySelector('[data-minus]');
const plus = document.querySelector('[data-plus]');
const quantity = document.querySelector('[data-quantity]');

//Cart adding/removing
const addBtn = document.querySelector("[data-add]");
const cartEmptyText = document.querySelector("[data-empty]");
const amountIndicator = document.querySelector("[data-indicator]");
var amount;
var total;

//Pricing variable
var discountPrice = document.querySelector('[data-discount-price]').textContent;
discountPrice = parseInt(discountPrice.substring(1));

//Dropdown
const dropdownMenu = document.querySelector('[data-dropdown-menu]');

//Mobile menu 
const mobileMenuContainer = document.querySelector("[data-menu]");
//const mobileMenu = document.querySelector("[data-menu-inner]");
const openMenu = document.querySelector("[data-open-menu]");

//EVENT LISTENERS

//Main thumbnail change event listener
thumbnailContainer.addEventListener("click", e => {

    if(e.target.hasAttribute('data-thumbnail')) {    

        if(!e.target.matches('.active-thumbnail')) {   

            ChangeActiveThumbnail(0, e);
            ChangeProductImg(imgIndex, 0, 1);
        }
    }  
});

//Lightbox thumbnail change event listener
lightbox.addEventListener("click", e => {

    if(e.target.hasAttribute('data-thumbnail-lightbox')) {    

        if(!e.target.matches('.active-thumbnail')) {   

            ChangeActiveThumbnail(1, e);
            ChangeProductImg(imgIndex, 1, 1)
        }
    } 
    else if (e.target.hasAttribute('data-previous')) {

        //if first has active attribute
        if(thumbnailGroups[1][0].matches('.active-thumbnail')) {

            thumbnailGroups[1][0].classList.remove('active-thumbnail');
            thumbnailGroups[1][thumbnailGroups[1].length - 1].classList.add('active-thumbnail');

            ChangeProductImg(0, 1, 4);
        }
        else {

            ChangeActiveThumbnail(1, e, true);
            ChangeProductImg(imgIndex, 1);
        }
    }
    else if (e.target.hasAttribute('data-next')) {

        //if fourth has active attribute
        if(thumbnailGroups[1][thumbnailGroups[1].length - 1].matches('.active-thumbnail')) {

            thumbnailGroups[1][thumbnailGroups[1].length - 1].classList.remove('active-thumbnail');
            thumbnailGroups[1][0].classList.add('active-thumbnail');

            ChangeProductImg(0, 1, 1);
        }
        else {

            ChangeActiveThumbnail(1, e, true);
            ChangeProductImg(imgIndex, 1, 2);
        }
    }
    else if (e.target.hasAttribute('data-close')) {

        lighboxContainer.classList.remove('active-lightbox');
    }
});

//Close lightbox when clicking outside of it
lighboxContainer.addEventListener("click", e => {

    if(e.target == lighboxContainer) {
        lighboxContainer.classList.remove('active-lightbox');
    }
});

//Open lightbox
openLightbox.addEventListener("click", () => {

    lighboxContainer.classList.add('active-lightbox');
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
  
    const isDropdownBtn = e.target.matches('[data-dropdown-btn]');

    //Click inside dropdown menu
    if((!isDropdownBtn && e.target.closest("[data-dropdown]"))) return;

    let currentDropdown = null;

    //Toggle dropdown menu
    if(isDropdownBtn) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle("active-dropdown");
    }

    //Removes other active dropdowns
    document.querySelectorAll(".active-dropdown[data-dropdown]").forEach(e => {
        if(e === currentDropdown) return;
        e.classList.remove("active-dropdown");
    });
}, {capture : true});

//Adding a product btn
addBtn.addEventListener("click", () => {

    const products = Array.from(document.querySelectorAll("[data-product]"));
    let repeatedProduct = products.filter(e => e.children[1].textContent == productName.textContent)[0];

    //Remove empty cart text when adding first product
    if(products.length == 0) {
        cartEmptyText.remove();
    }

    amount = parseInt(quantity.textContent); 

    if(repeatedProduct == null) {

        UpdateTotal();
        CreateProduct();

        //console.log("Added product to cart");
    }
    else { //If product already exists

        let previousAmount = repeatedProduct.children[3].textContent.substring(repeatedProduct.children[3].textContent.length - 1);
        repeatedProduct.children[3].textContent = "$" + discountPrice.toString() + " x " + (amount + parseInt(previousAmount)).toString();

        UpdateTotal(parseInt(previousAmount));

        repeatedProduct.children[4].textContent = "$" + total.toString() + ".00";
       
        //console.log("Updated product in cart");
    }

    UpdateAmountIndicator();
    quantity.textContent = "1";
});

//Deleting products from cart
dropdownMenu.addEventListener("click", e => {

    if(e.target.hasAttribute('data-delete')) {

        //Remove product
        e.target.closest("[data-product]").remove();

        //Update indicator
        let productAmpunt = e.target.nextElementSibling.textContent;
        productAmount = parseInt(productAmpunt.substring(productAmpunt.length - 1));
        amountIndicator.textContent = (parseInt(amountIndicator.textContent) - productAmount).toString();
        
        //Display empty for no products
        if(document.querySelectorAll('[data-product]').length == 0) {

            //Remove product list and checkout button
            document.querySelector('[data-dropdown-details]').remove();
            document.querySelector('[data-dropdown-checkout]').remove();

            //Display cart empty text
            dropdownMenu.appendChild(cartEmptyText);

            //Update indicator
            amountIndicator.style.opacity = 0;
        }  
    }
});

openMenu.addEventListener("click", () => {

    mobileMenuContainer.classList.add("active-menu");
});

mobileMenuContainer.addEventListener("click", e => {

    if(e.target.matches("[data-menu]") || e.target.matches("[data-close-menu]")) {
        mobileMenuContainer.classList.remove("active-menu");
    }
});

//UTILITY FUNCTIONS

function ChangeProductImg(imgIndex, productImgIndex, aux = 0) {

    if(productImgIndex == 0) {
        productImgs[productImgIndex].firstElementChild.firstElementChild.src = "./images/image-product-" + (imgIndex + aux) + ".jpg";
        productImgs[productImgIndex].firstElementChild.firstElementChild.alt = "image-product-" + (imgIndex + aux);
    }
    else {
        productImgs[productImgIndex].firstElementChild.src = "./images/image-product-" + (imgIndex + aux) + ".jpg";
        productImgs[productImgIndex].firstElementChild.alt = "image-product-" + (imgIndex + aux);
    }
}

function ChangeActiveThumbnail(group, e, arrow = false) {

    if(!arrow) { //Clicked on thumbnail to change

        //Remove previous active thumbnail
        thumbnailGroups[group].filter(a => a.classList.contains('active-thumbnail'))[0].classList.remove('active-thumbnail');

        //Add active class to clicked thumbnail and save img index for large view change
        imgIndex = thumbnailGroups[group].indexOf(e.target);
        e.target.classList.add('active-thumbnail');
    }
    else { //Clicked on arrow to change

        //Remove previous active thumbnail and store its img
        let activeElement = thumbnailGroups[group].filter(a => a.classList.contains('active-thumbnail'))[0];
        activeElement.classList.remove('active-thumbnail');
        imgIndex = thumbnailGroups[group].indexOf(activeElement);
        
        let previousNext;

        //Check for previous or next arrow
        if(e.target.hasAttribute('data-previous')) previousNext = -1;
        else previousNext = 1;

        //Add active class to previous or next element respectively
        thumbnailGroups[group][imgIndex + (previousNext)].classList.add('active-thumbnail');
    }
}

function CreateProduct() {

    //Products container
    if(document.querySelector('.dropdown__details') == null) {
        var dropdownDetails = document.createElement('div');
        dropdownDetails.className = "dropdown__details";
        dropdownDetails.setAttribute('data-dropdown-details', '');
        dropdownMenu.appendChild(dropdownDetails);
    }
    else {
        var dropdownDetails = document.querySelector(".dropdown__details");
    }

    //Product container
    const dropdownProduct = document.createElement('div');
    dropdownProduct.className = "dropdown__product";
    dropdownProduct.setAttribute('data-product', '');
    dropdownDetails.appendChild(dropdownProduct);

    //Product children
    const dropdownImg = document.createElement('img');
    dropdownImg.src = "./images/image-product-1-thumbnail.jpg";
    dropdownImg.alt = "image-product-1-thumbnail";
    dropdownImg.className = "dropdown__img";
    dropdownProduct.appendChild(dropdownImg);

    const cartProductTitle = document.createElement('h5');
    cartProductTitle.textContent = "Fall Limited Edition Sneakers";
    dropdownProduct.appendChild(cartProductTitle);

    const dropdownDelete = document.createElement('button');
    dropdownDelete.className = "dropdown__delete";
    dropdownDelete.setAttribute("data-delete", "");
    dropdownProduct.appendChild(dropdownDelete);

    const dropdownDeleteIcon = document.createElement('img');
    dropdownDeleteIcon.src = "./images/icon-delete.svg";
    dropdownDeleteIcon.alt = "icon-delete";
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
        checkout.setAttribute('data-dropdown-checkout', '');
        dropdownMenu.appendChild(checkout);

        //Checkout button
        const checkoutBtn = document.createElement('button');
        checkoutBtn.classList.add('primary-btn', 'primary-btn--cart');
        checkoutBtn.textContent = "Checkout";
        checkout.appendChild(checkoutBtn);
    }
}

function UpdateAmountIndicator() {

    //Change number of products indicator
    amountIndicator.textContent = (parseInt(amountIndicator.textContent) + amount).toString();

    //display indicator if there is one or more products
    if(amountIndicator.style.opacity == 0) amountIndicator.style.opacity = 1;
}

function UpdateTotal(previousAmount = 0) {

    if(previousAmount == 0) {
        total = discountPrice * amount;
    }
    else {
        total = discountPrice * (amount + previousAmount); 
    }
}