$(function ready() {
    $("#submitForm").submit(function (event) {
        event.preventDefault();
        if(confirm("Submit the order?") == true){
            var pizzaSize;
            $.each($("input[name='pizzaSize']:checked"), function(){
                pizzaSize=($(this).val());
            });

            var typeOfCrust;
            $.each($("input[name='typeOfCrust']:checked"), function(){
                typeOfCrust=($(this).val());
            });

            var toppings=[];
            $.each($("input[name='toppings']:checked"), function(){
                toppings.push($(this).val());
            });

            var orderInfo = JSON.stringify({
                customerName: $('#customerName').val(),
                phoneNumber: $('#phoneNumber').val(),
                address: $('#address').val(),
                pizzaSize: pizzaSize,
                typeOfCrust: typeOfCrust,
                toppings: toppings,
                quantity: parseInt($('#quantity').val()),
            });

            $.ajax({
                url: '/api/orders',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: orderInfo,
                success: function (json, status, request) {
                    $('#statusMsg').removeClass();
                    $('#statusMsg').addClass('alert alert-success');
                    $('#statusMsg').html('Order submitted');
                },
                error: function (request, status) {
                    $('#statusMsg').removeClass();
                    $('#statusMsg').addClass('alert alert-danger');
                    $('#statusMsg').html('Error create order');
                    console.log('Request failed : ', status);
                }
            });
        }else{
            location.reload();
        }        

    });
});