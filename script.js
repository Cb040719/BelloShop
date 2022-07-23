//Oggetti DOM ---------------------------------------------------------------------------//
const $body = document.querySelector("body");
const $sidebar = document.querySelector(".mainSidebar");
const $openSidebarBtn = document.querySelector("#openSidebarBtn");
const $closeSidebarBtn = document.querySelector("#closeSidebarBtn");
const $categoriesList = document.querySelector(".categoriesList");
const $mainContent = document.querySelector(".mainContent");
const $loader = document.querySelector(".loader");

//Oggetti DOM dinamici ------------------------------------------------------------------//
const $productCard = document.querySelector(".productCard");
const $add2CartBtn = document.querySelector(".add2cartBtn");

//Dichiarazione Array 
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
    })

    $closeSidebarBtn.addEventListener("click", function() {
        $sidebar.style.width = "0";
        $body.style.marginRight = "0";
    })
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
            <h4>${product.id}</h4>
            <button id="${product.id}" class="add2CartBtn">Aggiungi al carrello - ${product.id}</button>
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
                <h4>${product.id}</h4>
                <button id="${product.id}" class="add2CartBtn">Aggiungi al carrello - ${product.id}</button>
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
    //    console.log(event.target.id)

       console.log(storedProducts[event.target.id-1])
       shopCart.push(storedProducts[event.target.id-1])
       console.log(shopCart)
    };
});
//---------------------------------------------------------------------------------------//