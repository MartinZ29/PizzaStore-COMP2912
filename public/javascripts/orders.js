$(function ready() {
    $.getJSON("/api/orders", function (data) {
        if(data != null){   
            $('#orders').append('<thead><tr><th>Customer Name</th>'
                                            +'<th>Phone number</th>'
                                            +'<th>Address</th>'
                                            +'<th>Pizza size</th>'
                                            +'<th>Type of crust</th>'
                                            +'<th>Toppings</th>'
                                            +'<th>Quantity</th>'
                                            +'<th>Price</th>'
                                            +'<th>Create on</th></tr></thead>');
            data.forEach(function (item) {
                $('#orders').append('<tr><td>'+ item.customerName + '</td><td>' 
                                            + item.phoneNumber + '</td><td>'
                                            + item.address + '</td><td>'
                                            + item.pizzaSize + '</td><td>'
                                            + item.typeOfCrust + '</td><td>'
                                            + item.toppings + '</td><td>'
                                            + item.quantity + '</td><td>'
                                            + item.price + '</td><td>'
                                            + item.createdOn + '</td></tr>');
            });
        }
    });

    $("#searchCustomerName").submit(function (event) {
        event.preventDefault();

        const requestURL = "/api/orders/" + $("#searchName").val();
        //clear input for next search use. Enhance UX.
        $("#searchName").val("");
            
        $.ajax({
            url: requestURL,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            
            success: function (json, status, request) {
                $('#orders').empty();
                $('#orders').append('<thead><tr><th>Customer Name</th>'
                                    +'<th>Phone number</th>'
                                    +'<th>Address</th>'
                                    +'<th>Pizza size</th>'
                                    +'<th>Type of crust</th>'
                                    +'<th>Toppings</th>'
                                    +'<th>Quantity</th>'
                                    +'<th>Price</th>'
                                    +'<th>Create on</th></tr></thead>');
                json.forEach(function (item) {
                    $('#orders').append('<tr><td>'+ item.customerName + '</td><td>' 
                                                + item.phoneNumber + '</td><td>'
                                                + item.address + '</td><td>'
                                                + item.pizzaSize + '</td><td>'
                                                + item.typeOfCrust + '</td><td>'
                                                + item.toppings + '</td><td>'
                                                + item.quantity + '</td><td>'
                                                + item.price + '</td><td>'
                                                + item.createdOn + '</td></tr>');
                });
            },
            error: function (request, status) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error with search');
                console.log('Request failed : ', status);
            }
        });

    });

    $("#searchPhone").submit(function (event) {
        event.preventDefault();
        
        const requestURL = "/api/orders/phone/" + $("#searchNumber").val();
        //clear input for next search use. Enhance UX.
        $("#searchNumber").val("");
        $.ajax({
            url: requestURL,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            
            success: function (json, status, request) {                               
                $('#orders').empty();
                $('#orders').append('<thead><tr><th>Customer Name</th>'
                                    +'<th>Phone number</th>'
                                    +'<th>Address</th>'
                                    +'<th>Pizza size</th>'
                                    +'<th>Type of crust</th>'
                                    +'<th>Toppings</th>'
                                    +'<th>Quantity</th>'
                                    +'<th>Price</th>'
                                    +'<th>Create on</th></tr></thead>');
                json.forEach(function (item) {
                    $('#orders').append('<tr><td>'+ item.customerName + '</td><td>' 
                                                + item.phoneNumber + '</td><td>'
                                                + item.address + '</td><td>'
                                                + item.pizzaSize + '</td><td>'
                                                + item.typeOfCrust + '</td><td>'
                                                + item.toppings + '</td><td>'
                                                + item.quantity + '</td><td>'
                                                + item.price + '</td><td>'
                                                + item.createdOn + '</td></tr>');
                });
            },
            error: function (request, status) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error with search');
                console.log('Request failed : ', status);
            }
        });

    });
});