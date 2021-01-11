function getData() {
    fetch('http://192.168.0.127:8080/product/productList')
        .then(response => response.json())
        .then(data => displayProducts(data));
}

function displayProducts(data) {
    document.getElementById("app").innerHTML = `
        ${data.map(function (product) {
        return `
            <div class="product">
                  
            <div>${product.category}</div>
            <div>${product.name}</div>
            <div>${product.description}</div>
            <div>${product.price}</div>           
            
            <label for="quantity">Quantity:</label>
            <input type="number" value="1" name="quantity" id="quantity${product.id}" class="qinput">                      
            <img src="${product.imageURL}"> 
            
            <button onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>
            
            </div>
            `
    }).join('')}
                       
        `
        viewCart();
}

function viewCart() {

    document.getElementById("cart").innerHTML = ""
    var totalPrice = 0;
    for (i = 0; i < sessionStorage.length; i++) {
        var id = JSON.parse(sessionStorage.getItem(sessionStorage.key(i))).id;
        var name = JSON.parse(sessionStorage.getItem(sessionStorage.key(i))).name;
        console.log(name);
        document.getElementById("cart").insertAdjacentHTML("beforeend", 
        `<div class="product">
        <button id="removeItem" onclick='removeCartItem("${name}")'>Remove</button>
        <div>${JSON.parse(sessionStorage.getItem(sessionStorage.key(i))).category}</div>
        <div>${JSON.parse(sessionStorage.getItem(sessionStorage.key(i))).name}</div>
        <div>${JSON.parse(sessionStorage.getItem(sessionStorage.key(i))).price}</div>
        <div>${(document.querySelector('#quantity' + id)).value}</div>
        </div>`);
        totalPrice += (JSON.parse(sessionStorage.getItem(sessionStorage.key(i))).price) * (document.querySelector('#quantity' + id).value);
    }
    document.getElementById("cart").insertAdjacentHTML("beforeend", `Total price: ${totalPrice}`);
    document.getElementById("cart").insertAdjacentHTML("beforeend", `<button id="getInfo" onclick='getInformation()'>Checkout</button>`);

}


function addToCart(product) {
    sessionStorage.setItem(product.name, JSON.stringify(product));
    viewCart();
    console.log(product);
    console.log(sessionStorage);
}
function removeCartItem(product){
    sessionStorage.removeItem(product);
    viewCart();
    console.log(product);
}

function buy(customerInfo) {

    for (i = 0; i < sessionStorage.length; i++) {
        var product = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));

        fetch('http://192.168.0.127:8080/order/newOrder', {
            method: 'POST',
            body: `{       
            "customer": {
                "id": ${customerInfo.id}
            },
            "product": {
                "id": ${product.id}
            },
            "quantity": ${(document.querySelector('#quantity' + product.id)).value}
        }`,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            if (response.ok) {
                alert("ok");
            } else {
                alert("bad");
            }

        });
    }
        sessionStorage.clear();
        viewCart();
   

    }

function getInformation(){
    document.getElementById("getInfo").remove();
    document.getElementById("cart").insertAdjacentHTML("beforeend", `<div class="infoForm" id="infoForm">
    <div class="infoFormEntry">
      <label for="first_name">First name:</label>
      <input name="first_name" id="first_name">
    </div>
    <div class="infoFormEntry">
      <label for="last_name">Last name:</label>
      <input name="last_name" id="last_name">
    </div>
    <div class="infoFormEntry">
        <label for="email">Email:</label>
        <input name="email" id="email">
    </div>
    <div class="infoFormEntry">
        <label for="phone">Phone number:</label>
        <input name="phone" id="phone">
    </div>
    <div class="infoFormEntry">
        <label for="city">City:</label>
        <input name="city" id="city">
    </div>
    <div class="infoFormEntry">
        <label for="street">Street:</label>
        <input name="street" id="street">
    </div>
    <div class="infoFormEntry">
        <label for="number">Street number:</label>
        <input name="number" id="number">
    </div>
    
    <button onclick="validateInfo()">Buy</button>      
    
    <div id="message"></div>
</div>`
    );
}


function sendCustomer(){
    let firstName = document.querySelector('#first_name'); 
    let lastName = document.querySelector('#last_name');
    let email = document.querySelector('#email');
    let phone = document.querySelector('#phone');
    let city = document.querySelector('#city');
    let street = document.querySelector('#street');
    let number = document.querySelector('#number');

    fetch('http://192.168.0.127:8080/customer/newCustomer', {
	method: 'POST',
	body: JSON.stringify({
        
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phoneNumber: phone.value,
    address: street.value +" "+ number.value +" "+ city.value 
    
		
	}),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(response => response.json())
.then(data => buy(data));
}

function validateInfo(){

    let firstName = document.querySelector('#first_name'); 
    let lastName = document.querySelector('#last_name');
    let email = document.querySelector('#email');
    let phone = document.querySelector('#phone');
    let city = document.querySelector('#city');
    let street = document.querySelector('#street');
    let number = document.querySelector('#number');

    var allOk = true;
   
    var nullRegex = /$^/;
    var reqRegex = /Required field!/;
    var emailRegex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(nullRegex.test(firstName.value) || reqRegex.test(firstName.value)){
        firstName.value = "Required field!";
        allOk = false;       
    }
    if(nullRegex.test(lastName.value) || reqRegex.test(lastName.value)){
        lastName.value = "Required field!";
        allOk = false;       
    }
    if(nullRegex.test(phone.value) || reqRegex.test(phone.value)){
        phone.value = "Required field!";
        allOk = false;       
    }
    if(nullRegex.test(city.value) || reqRegex.test(city.value)){
        city.value = "Required field!";
        allOk = false;       
    }
    if(nullRegex.test(street.value) || reqRegex.test(street.value)){
        street.value = "Required field!";
        allOk = false;       
    }
    if(nullRegex.test(number.value) || reqRegex.test(number.value)){
        number.value = "Required field!";
        allOk = false;        
    }
    if(!emailRegex.test(email.value)){
        email.value = "Invalid email!";
        allOk = false; 
        
    }

    if(allOk){
    sendCustomer();

    }else{
        document.getElementById("message").innerHTML = `Please enter correct information.`;
        
    }
    
}