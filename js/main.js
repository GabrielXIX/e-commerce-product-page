//Thumbnail elements
const thumbnailContainer = document.querySelector("[data-thumbnail-container]");
const thumbnails = document.querySelectorAll("[data-thumbnail]");
const productImg = document.querySelector("[data-product-img]");

//Product quantity elements
const quantityContainer = document.querySelector('[data-quantity-container]');
const minus = document.querySelector('[data-minus]');
const plus = document.querySelector('[data-plus]');
const quantity = document.querySelector('[data-quantity]');

window.onload = () => {

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

        if(quantity.textContent != '0') {
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