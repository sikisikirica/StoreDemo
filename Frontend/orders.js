function getData(url, t) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayCustomers(data, t));
}

function displayCustomers(data, t) {
    document.getElementById("app").innerHTML = `
        ${data.map(function (customer) {
        return `
            <div class="product">
                  
            <div>${customer.firstName}</div>
            <div>${customer.lastName}</div>
            <div>${customer.address} </div>
            <div>${customer.email}</div>
            <div>${customer.phoneNumber}</div>            
            <button onclick='getOrders(${customer.id},${t})'>Orders</button>
            <div id="cust${customer.id}"></div>
            </div>
            `
    }).join('')}
                       
        `
}

function getOrders(customerId, t) {

    fetch('http://192.168.0.127:8080/customer/customerOrders', {
        method: 'POST',
        body: `{       
                "id": "${customerId}"
        }`,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => response.json())
        .then(data => displayOrders(data, customerId, t));

}


function displayOrders(data, customerId, t) {
    if (t == 2) {
        document.getElementById("cust" + customerId).innerHTML = `
    ${data.map(function (order) {
            if (order.accepted == false) {
                return `
        <div class="orderItem">
              
        <div class="orderInfo">${order.product.category}</div>
        <div class="orderInfo">${order.product.name}</div>
        <div class="orderInfo">${order.product.description}</div>
        <div class="orderInfo">${order.product.price}</div>
        <div class="orderInfo">${order.quantity}</div>
        <div class="orderInfo">${order.dateTime}</div>    
        <button id="accept${order.id}" onclick='acceptOrder(${order.id})'>Accept</button>
    
        </div>
        `
            }
        }).join('')}
     `} else {
        document.getElementById("cust" + customerId).innerHTML = `
        ${data.map(function (order) {

            return `
            <div class="orderItem">
                  
            <div class="orderInfo">${order.product.category}</div>
            <div class="orderInfo">${order.product.name}</div>
            <div class="orderInfo">${order.product.description}</div>
            <div class="orderInfo">${order.product.price}</div>
            <div class="orderInfo">${order.quantity}</div>
            <div class="orderInfo">${order.dateTime}</div>    
        
            </div>
            `

        }).join('')}
         `
    }
}

function acceptOrder(orderId) {

    fetch('http://192.168.0.127:8080/order/acceptOrder', {
        method: 'POST',
        body: `{       
                "id": "${orderId}"
        }`,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    document.getElementById("accept" + orderId).innerHTML = "Accepted";
}

