//Elementi DOM ---------------------------------------------------------------------------//
const $body = document.querySelector("body");
const $sidebar = document.querySelector(".mainSidebar");
const $openSidebarBtn = document.querySelector("#openSidebarBtn");
const $closeSidebarBtn = document.querySelector("#closeSidebarBtn");
const $categoriesList = document.querySelector(".categoriesList");
const $mainContent = document.querySelector(".mainContent");
const $shopCart = document.querySelector(".shopCart");
const $cartProductSection = document.querySelector(".productSection")
const $showCartBtn = document.querySelector("#showCartBtn");
const $closeCartBtn = document.querySelector("#closeCartBtn");
const $loader = document.querySelector(".loader");

//Dichiarazione Array -------------------------------------------------------------------//
let productList = [];
let categoriesList = [];
let productListDisplay = [];
let categoriesListDisplay = [];
let shopCart = [];
//---------------------------------------------------------------------------------------//


(function() {  //Sidebar a comparsa

    $openSidebarBtn.addEventListener("click", function() {
        $sidebar.style.width = "250px";
        $body.style.marginRight = "250px";
    });

    $closeSidebarBtn.addEventListener("click", function() {
        $sidebar.style.width = "0";
        $body.style.marginRight = "0";
    });
})();

(function() { //Apertura e chiusura Carrello

    $showCartBtn.addEventListener("click", function() {
        $shopCart.style.display = "flex";
        $shopCart.style.height = "100%";
    });

    $closeCartBtn.addEventListener("click", function() {
        $shopCart.style.height = "0";
        $shopCart.style.display = "none";
    });
})();



//Lista categorie (sidebar) -------------------------------------------------------------//
fetch("https://fakestoreapi.com/products/categories")
.then(response => response.json())
.then(json => categoriesList.push(...json))
.then(() => {
    // console.log(categoriesList);
    localStorage.setItem("categoriesList", JSON.stringify(categoriesList));
});
const storedCategories = JSON.parse(localStorage.getItem("categoriesList"));

storedCategories.forEach(element => {
    categoriesListDisplay.push(`<li><button id="${element}">${element}</button></li>`);
});
$categoriesList.innerHTML = categoriesListDisplay.join("");
//---------------------------------------------------------------------------------------//


//Lista prodotti (main content) ---------------------------------------------------------//
fetch("https://fakestoreapi.com/products")
.then(response => response.json())
.then(json => productList.push(...json))
.then(() => {
    // console.log(productList);
    localStorage.setItem("productList", JSON.stringify(productList));
});
const storedProducts = JSON.parse(localStorage.getItem("productList"));

storedProducts.forEach(product => {
    productListDisplay.push(`
        <div id="${product.category}" class="productCard">
            <img src="${product.image}">
            <h3>${product.title}</h3>
            <h4>${product.price}€</h4>
            <button id="${product.id}" class="add2CartBtn">Aggiungi al carrello</button>
        </div>
    `);
});
$mainContent.innerHTML = productListDisplay.join("");
//---------------------------------------------------------------------------------------//
// console.log(storedCategories);
// console.log(storedProducts);
//---------------------------------------------------------------------------------------//

//Sorting prodotti per categoria --------------------------------------------------------//
$categoriesList.addEventListener("click", function(event) {
    if(event.target.tagName === "BUTTON") {
        const getProductsByCategory = storedProducts.filter(product => product.category === event.target.id);
        console.log(getProductsByCategory);
        productListDisplay = [];

        getProductsByCategory.forEach(product => {
            productListDisplay.push(`
            <div id="${product.category}" class="productCard">
                <img src="${product.image}">
                <h3>${product.title}</h3>
                <h4>${product.price}€</h4>
                <button id="${product.id}" class="add2CartBtn">Aggiungi al carrello</button>
                </div>
            `);
        });
        $mainContent.innerHTML = productListDisplay.join("");
        // console.log(productListDisplay);
    };
});
//---------------------------------------------------------------------------------------//

//Carrello ------------------------------------------------------------------------------//

$mainContent.addEventListener("click", function(event) {

    if(event.target.className === "add2CartBtn") {
    //    console.log(storedProducts[event.target.id-1])
        shopCart.push(storedProducts[event.target.id-1])
        console.log(shopCart);
 
        productListDisplay = []
        shopCart.forEach(product => {
            productListDisplay.push(`
                <div class="cartItem">
                    <img src="${product.image}">
                    <div class="topCartContainer">
                        <div class="bottomCartContainer">
                            <h3>${product.title}</h3>
                            <h4>${product.price}€</h4>
                        </div>
                        <div class="btnContainer">
                            <button id="${product.id}" class="removeFromCartBtn">X Rimuovi</button>
                        </div>
                    </div>
                </div>
            `)
        });
        $cartProductSection.innerHTML = productListDisplay.join("");
    };
});
//---------------------------------------------------------------------------------------//