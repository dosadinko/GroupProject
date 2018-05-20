$(document).ready(function() {
    $('#expenses-section').hide();
    $('#register-div').hide();

    $('#login-forma').submit(function() {
        var username = $("#forma_log_in").val();
        var password = $("#password").val();
        if (username === '' || password === '') {
            $('input[type="text"],input[type="password"]').css("border", "2px solid red");
            $('input[type="text"],input[type="password"]').css("box-shadow", "0 0 3px red");

            if ($('#blankerror').length) {
                $("#blankerror").animate({ opacity: 0 }, 200, "linear", function() {
                    $(this).animate({ opacity: 1 }, 200);
                });
            } else {
                $('#login-div').append('<p id="blankerror">Please enter valid credentials in order to log in.</p>');
            }
        } else {
            $.ajax({
                type: "POST",
                url: 'RestApi/loginController.php',
                data: {
                    username: username,
                    password: password
                },
                success: function(data) {
                    if (data === '"error"') {
                        if ($('#inputerror').length) {
                            $("#inputerror").animate({ opacity: 0 }, 200, "linear", function() {
                                $(this).animate({ opacity: 1 }, 200);
                            });
                        } else {
                            $('#login-div').append('<p id="inputerror">Username or password incorrect.</p>');
                        }
                    } else if (data === '"success"') {
                        $('#expenses-section').show();
                        $('#register-div').hide();
                        $('#login-div').hide();
                        $.ajax({

                            type: 'GET',
                            url: 'RestApi/getAllExpencesController.php',
                            success: function(data) {
                                var obj = JSON.parse(data);
                                var i = 0;
                                $('#root-table').html("");
                                obj.expence.forEach(function() {
                                    var date = new Date(obj.expence[i].expenceDate * 1000);
                                    var day = date.getDate();
                                    var monthIndex = date.getMonth();
                                    var year = date.getFullYear();
                                    var formattedTime = day + ' ' + monthIndex + 1 + ' ' + year;
                                    var deleteId = obj.expence[i].id;
                                    $("#root-table").prepend(`
                                    <tbody>
                                    <tr>
                                        <td id="td` + [i] + `">${obj.expence[i].id}</td>
                                        <td>${obj.expence[i].description}</td>
                                        <td>${obj.expence[i].payee}</td>
                                        <td>${obj.expence[i].amountPayed}</td>
                                        <td>${obj.expence[i].currencyType}</td>
                                        <td>${formattedTime}</td>
                                        <td>${obj.expence[i].payedDate}</td>
                                        <td>            <!-- Trigger the modal with a button -->
                                        <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Edit</button>
                            
                                        <!-- Modal -->
                                        <div class="modal fade" id="myModal" role="dialog">
                                            <div class="modal-dialog">
                            
                                                <!-- Modal content-->
                                                <div class="modal-content">
                            
                                                    <div class="modal-body">
                                                       
                                                    </div>
                            
                                                </div>
                            
                                            </div>
                                        </div></td>
                                        <td>
                                        <button type="button" class="btn btn-danger" onclick="DeleteExpense(` + deleteId + `);">Delete</button>
                                        </td>
                                    </tr>
                                    </tbody>`);
                                    i++;
                                })
                            },
                            error: function() {
                                console.log('error');
                            }
                        });
                    } else {
                        if ($('#unknownerror').length) {
                            $("#unknownerror").animate({ opacity: 0 }, 200, "linear", function() {
                                $(this).animate({ opacity: 1 }, 200);
                            });
                        } else {
                            $('#login-div').append('<p id="unknownerror">Unknown error, please try again.</p>');
                        }
                    }
                }
            });
        }
        //this is mandatory other wise your from will be submitted.
        return false;
    });
    $('#registration').submit(function() {
        var username = $("#reg_username").val();
        var password = $("#reg_password").val();
        var email = $("#reg_email").val();
        if (username === '' || password === '' || email === '') {
            $('input[type="text"],input[type="password"]').css("border", "2px solid red");
            $('input[type="text"],input[type="password"]').css("box-shadow", "0 0 3px red");
            if ($('#reg_error').length) {
                $("#reg_error").animate({ opacity: 0 }, 200, "linear", function() {
                    $(this).animate({ opacity: 1 }, 200);
                });
            } else {
                $('#register-div').append('<p id="reg_error">Please enter valid credentials in order to log in.</p>');
            }

        } else {
            $.ajax({
                type: "POST",
                url: 'RestApi/registerController.php',
                data: {
                    username: username,
                    password: password,
                    email: email
                },
                success: function(data) {
                    if (data === '"error"') {
                        $('#register-div').append('Registration data is incorrect.');
                    } else if (data === '"success"') {
                        $('#register-div').append('Registration is successful. You will be redirected to login screen.');
                        $('#register-div').slideUp(300).delay(10000).fadeOut(400);
                        $('#login-div').show();
                        $('#register-div').hide();
                    } else {
                        $('#register-div').append('Unknown error, please try again.');
                    }
                }
            });
        }
        //this is mandatory other wise your from will be submitted.
        return false;
    });

});

function SwitchToRegForm() {
    $("#login-div").hide();
    $('#register-div').show();
}

function Logout() {
    $(function() {
        $('#logout-btn').on('click', function() {
            $.ajax({
                url: 'RestApi/logoutController.php'
            });
        });
    });
    location.reload();

}
//appends an "active" class to .popup and .popup-content when the "Open" button is clicked
$(".open").on("click", function() {
    $(".popup-overlay, .popup-content").addClass("active");
});

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
/*$(".close").on("click", function() {
    $(".popup-overlay, .popup-content").removeClass("active");
});*/
$('#add-expense-btn').click(function() {


    var description = $("#expense_description").val();
    var payee = $("#expense_payee").val();
    var amount = $("#expense_amount").val();
    var currency = $("#expense_currency").val();
    var date = new Date($("#expense_date").val());
    var expenseDate = parseInt(date.valueOf(), 10);
    var dateTwo = new Date($('#expense_paiddate').val());
    var paidDate = parseInt(dateTwo.valueOf(), 10);

    $.ajax({
        type: "POST",
        url: 'RestApi/createExpenceController.php',
        data: {
            description: description,
            expenceDate: expenseDate,
            payedDate: paidDate,
            currencyType: currency,
            payee: payee,
            amountPayed: amount,
        },
        success: function(data) {
            //removes the "active" class to .popup and .popup-content when the "Close" button is clicked 

            $.ajax({

                type: 'GET',
                url: 'RestApi/getAllExpencesController.php',
                success: function(data) {
                    var obj = JSON.parse(data);
                    var i = 0;
                    $("#root-table").html("");
                    obj.expence.forEach(function() {
                        var date = new Date(obj.expence[i].expenceDate * 1000);
                        var day = date.getDate();
                        var monthIndex = date.getMonth();
                        var year = date.getFullYear();
                        var formattedTime = day + ' ' + monthIndex + 1 + ' ' + year;
                        var deleteId = obj.expence[i].id;
                        $("#root-table").prepend(`
                            <tbody>
                            <tr>
                                <td id="td` + [i] + `">${obj.expence[i].id}</td>
                                <td>${obj.expence[i].description}</td>
                                <td>${obj.expence[i].payee}</td>
                                <td>${obj.expence[i].amountPayed}</td>
                                <td>${obj.expence[i].currencyType}</td>
                                <td>${formattedTime}</td>
                                <td>${obj.expence[i].payedDate}</td>
                                <td>            <!-- Trigger the modal with a button -->
                                <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Edit</button>
                    
                                <!-- Modal -->
                                <div class="modal fade" id="myModal" role="dialog">
                                    <div class="modal-dialog">
                    
                                        <!-- Modal content-->
                                        <div class="modal-content">
                    
                                            <div class="modal-body">
                             
                                                <!--popup's close button-->
                                                <button id="add-expense-btn" type="submit" class="close btn btn-primary">Save</button>
                                            </div>
                    
                                        </div>
                    
                                    </div>
                                </div></td>
                                <td>
                                <button type="button" class="btn btn-danger" onclick="DeleteExpense(` + deleteId + `);">Delete</button>
                                </td>
                            </tr>
                            </tbody>`);
                        i++;
                    })
                },
                error: function() {
                    console.log('error');
                }
            });

        }

    });
});

function DeleteExpense(id) {


    $.ajax({
        type: "POST",
        url: 'RestApi/deleteExpenceController.php',
        data: {
            id: id
        },
        success: function(data) {
            if (data === '"error"') {
                if ($('#inputerror').length) {
                    $("#inputerror").animate({ opacity: 0 }, 200, "linear", function() {
                        $(this).animate({ opacity: 1 }, 200);
                    });
                } else {
                    $('#login-div').append('<p id="inputerror">Username or password incorrect.</p>');
                }
            } else if (data === '"success"') {
                $('#expenses-section').show();
                $('#register-div').hide();
                $('#login-div').hide();
                $.ajax({

                    type: 'GET',
                    url: 'RestApi/getAllExpencesController.php',
                    success: function(data) {
                        var obj = JSON.parse(data);
                        var i = 0;
                        $('#root-table').html("");
                        obj.expence.forEach(function() {
                            var date = new Date(obj.expence[i].expenceDate * 1000);
                            var day = date.getDate();
                            var monthIndex = date.getMonth();
                            var year = date.getFullYear();
                            var formattedTime = day + ' ' + monthIndex + 1 + ' ' + year;
                            var deleteId = obj.expence[i].id;
                            $("#root-table").prepend(`
                            <tbody>
                            <tr>
                                <td id="td` + [i] + `">${obj.expence[i].id}</td>
                                <td>${obj.expence[i].description}</td>
                                <td>${obj.expence[i].payee}</td>
                                <td>${obj.expence[i].amountPayed}</td>
                                <td>${obj.expence[i].currencyType}</td>
                                <td>${formattedTime}</td>
                                <td>${obj.expence[i].payedDate}</td>
                                <td>            <!-- Trigger the modal with a button -->
                                <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Edit</button>
                    
                                <!-- Modal -->
                                <div class="modal fade" id="myModal" role="dialog">
                                    <div class="modal-dialog">
                    
                                        <!-- Modal content-->
                                        <div class="modal-content">
                    
                                            <div class="modal-body">
                                               
                                            </div>
                    
                                        </div>
                    
                                    </div>
                                </div></td>
                                <td>
                                <button type="button" class="btn btn-danger" onclick="DeleteExpense(` + deleteId + `);">Delete</button>
                                </td>
                            </tr>
                            </tbody>`);
                            i++;
                        })
                    },
                    error: function() {
                        console.log('error');
                    }
                });
            } else {
                if ($('#unknownerror').length) {
                    $("#unknownerror").animate({ opacity: 0 }, 200, "linear", function() {
                        $(this).animate({ opacity: 1 }, 200);
                    });
                } else {
                    $('#login-div').append('<p id="unknownerror">Unknown error, please try again.</p>');
                }
            }
        }
    });

}