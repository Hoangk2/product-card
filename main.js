var products = [
    {
        id: 1,
        name: "Biru Putaran 1",
        description: "Especially good for container gardening, the Angelonia will keep blooming all summer even if old flowers are removed. Once tall enough to cut, bring them inside and you'll notice a light scent that some say is reminiscent of apples.",
        price: "$50"
    },
    {
        id: 2,
        name: "Biru Putaran 2",
        description: "Especially good for container gardening, the Angelonia will keep blooming all summer even if old flowers are removed. Once tall enough to cut, bring them inside and you'll notice a light scent that some say is reminiscent of apples.",
        price: "$500"
    },
    {
        id: 3,
        name: "Biru Putaran 3",
        description: "Especially good for container gardening, the Angelonia will keep blooming all summer even if old flowers are removed. Once tall enough to cut, bring them inside and you'll notice a light scent that some say is reminiscent of apples.",
        price: "$150"
    }
];

var isEdit = false;
var tempProductId = 0;
//Hàm lấy ra đối tượng
function getHTML(seletor) {
    var html = document.querySelector(seletor);
    return html
}

//Hàm render sản phẩm
function renderProducts() {
    var producstElement = getHTML(".product");
    var itemElement = '';
    var productsLength = products.length;
    for(i = 0; i < productsLength; i++) {
        itemElement += `
                        <li id=${i} class="item">
                                <div class="item-delete" onclick="deleteProduct()">
                                    <i class="fa-solid fa-circle-xmark"></i>
                                </div>
                                <h1 class="item-name">${products[i].name}</h1>
                                <p class="item-description">${products[i].description}</p>
                                <button class="item-btn">
                                    <div class="item-btn-price">${products[i].price}</div>
                                    <div class="item-btn-cart">
                                        <i class="fa-solid fa-cart-shopping"></i>
                                    </div>
                                    <div class="item-btn-buy">Buy</div>
                                </button>
                                <button class="item-btn-edit" onclick="editProduct()">Edit</button>
                            </li>
                        `
                    };
        producstElement.innerHTML = itemElement;
};

//Hàm lấy giá trị input
function getInputValue(selector) {
    var inputValue = getHTML(selector).value;
    return inputValue
}

//Hàm tạo giá trị input
function setInputValue(selector, value) {
    getHTML(selector).value = value;
}

//Hàm tạo sản phẩm
function createProduct() {
    var nameInputValue = getInputValue("#name");
    var desInputValue = getInputValue("#description");
    var priceInputValue = getInputValue("#price");
    var idProduct = products.length + 1;
    var newProduct = {
        id: idProduct,
        name: nameInputValue,
        description: desInputValue,
        price: priceInputValue
    }
    products.push(newProduct);
};

//Hàm focus vào input 
function focusInput() {
   setInputValue("#name", "");
   setInputValue("#description", "");
   setInputValue("#price", "");
}

//Hàm xóa sản phẩm
function deleteProduct() {
    var itemProduct = event.target.closest("li");
    for(i = 0; i < products.length; i++) {
        if(i == itemProduct.id) {
            products.splice(i, 1);
        }
    };
    renderProducts();
}

//Hàm sửa sản phẩm
function editProduct() {
    isEdit = true;
    if(isEdit) {
        getHTML(".form-button").innerHTML = "Update";
    };
    tempProductId = event.target.closest("li").id;
    setInputValue("#name", products[tempProductId].name);
    setInputValue("#description", products[tempProductId].description);
    setInputValue("#price", products[tempProductId].price);
}

//Xử lý tải trang
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});

//Xử lý tạo và update sản phẩm
getHTML(".form-button").addEventListener("click", () => {
    if(isEdit) {
        products[tempProductId].name = getInputValue("#name");
        products[tempProductId].description = getInputValue("#description");
        products[tempProductId].price = getInputValue("#price");
        getHTML(".form-button").innerHTML = "Create";
        isEdit = false
    } else {
        createProduct();
    }
    renderProducts();
    focusInput();
});



