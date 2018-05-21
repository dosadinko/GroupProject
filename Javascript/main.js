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
                        ShowExpensesSum();
                        $('#register-div').hide();
                        $('#login-div').hide();
                        $.ajax({

                            type: 'GET',
                            url: 'RestApi/getAllExpencesController.php',
                            success: function(data) {
                                var obj = JSON.parse(data);
                                var i = 0;
                                $('#root-table').html("");
                                $("#root-table").prepend(`<thead>
                                <tr>
                                    <th>#</th>
                                    <th>Description</th>
                                    <th>The Guy</th>
                                    <th>Amount Payed</th>
                                    <th>Currency</th>
                                    <th>Expence Date</th>
                                    <th>Payed Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>`);
                                obj.expence.forEach(function() {
                                    var date = new Date(+obj.expence[i].expenceDate);
                                    var date2 = new Date(+obj.expence[i].payedDate);
                                    var day = date.getDate();
                                    var monthIndex = date.getMonth();
                                    var year = date.getFullYear();
                                    var formattedTime = day + '/' + (monthIndex + 1) + '/' + year;
                                    var day2 = date2.getDate();
                                    var monthIndex2 = date2.getMonth();
                                    var year2 = date2.getFullYear();
                                    var formattedTime2 = day2 + '/' + (monthIndex2 + 1) + '/' + year2;
                                    var deleteId = obj.expence[i].id;
                                    ShowExpensesSum();
                                    $("#root-table").prepend(`
                                    <tbody>
                                    <tr>
                                        <td id="td` + [i] + `">${obj.expence[i].id}</td>
                                        <td>${obj.expence[i].description}</td>
                                        <td>${obj.expence[i].payee}</td>
                                        <td>${obj.expence[i].amountPayed}</td>
                                        <td>${obj.expence[i].currencyType}</td>
                                        <td>${formattedTime}</td>
                                        <td>${formattedTime2}</td>
                                        <td><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editExpense` + [i] + `" onclick="EditExpenseShow(` + deleteId + `,` + [i] + `);">Edit</button>
                    
                                
                                        <div class="modal" id="editExpense` + [i] + `" role="dialog">
                                            <div class="modal-dialog">
                            
                                                
                                                <div class="modal-content">
                            
                                                    <div class="modal-body">
                                                    <h4>Edit Expense</h4>
                                                    <form id="edit-expense-` + [i] + `">
                                                        <div class="form-group">
                                                            <label for="Description">Description</label>
                                                            <input type="text" class="form-control" id="edit_expense_description_` + [i] + `" aria-describedby="expense_description" placeholder="Type in Description">
                                                            <label for="payee">Expense by:</label>
                                                            <input type="text" class="form-control" id="edit_expense_payee_` + [i] + `"" aria-describedby="expense_payee" placeholder="Enter who made the expense">
                                                            <label for="amount">Amount</label>
                                                            <input type="number" class="form-control" id="edit_expense_amount_` + [i] + `"" aria-describedby="expense_amount" placeholder="Amount">
                                                            <label for="currency">Currency</label>
                                                            <input type="text" class="form-control" id="edit_expense_currency_` + [i] + `"" aria-describedby="expense_currency" placeholder="Currency">
                                                            <label for="expensedate">Expense Date</label>
                                                            <input type="date" class="form-control" id="edit_expense_date_` + [i] + `"" aria-describedby="expense_date" placeholder="Choose Date">
                                                            <label for="paiddate">Paid Date</label>
                                                            <input type="date" class="form-control" id="edit_expense_paidDate_` + [i] + `"" aria-describedby="expense_paiddate" placeholder="Choose Date">
                                                        </div>
                        
                                                    </form>
                                                    <button  class="btn btn-success" type="button" data-dismiss="modal" onclick="EditExpense(` + deleteId + `,` + [i] + `);">Save</button>
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
    var expenseDate = date.getTime();
    var dateTwo = new Date($('#expense_paiddate').val());
    var paidDate = dateTwo.getTime();

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
                    ShowExpensesSum();
                    $("#root-table").html("");
                    $("#root-table").prepend(`<thead>
                                <tr>
                                    <th>#</th>
                                    <th>Description</th>
                                    <th>The Guy</th>
                                    <th>Amount Payed</th>
                                    <th>Currency</th>
                                    <th>Expence Date</th>
                                    <th>Payed Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>`);
                    obj.expence.forEach(function() {
                        var date = new Date(+obj.expence[i].expenceDate);
                        var date2 = new Date(+obj.expence[i].payedDate);
                        var day = date.getDate();
                        var monthIndex = date.getMonth();
                        var year = date.getFullYear();
                        var formattedTime = day + '/' + (monthIndex + 1) + '/' + year;
                        var day2 = date2.getDate();
                        var monthIndex2 = date2.getMonth();
                        var year2 = date2.getFullYear();
                        var formattedTime2 = day2 + '/' + (monthIndex2 + 1) + '/' + year2;
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
                                <td>${formattedTime2}</td>
                                <td>
                                <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editExpense` + [i] + `" onclick="EditExpenseShow(` + deleteId + `,` + [i] + `);">Edit</button>
                    
                                
                                <div class="modal" id="editExpense` + [i] + `" role="dialog">
                                    <div class="modal-dialog">
                    
                                        
                                        <div class="modal-content">
                    
                                            <div class="modal-body">
                                            <h4>Edit Expense</h4>
                                            <form id="edit-expense-` + [i] + `">
                                                <div class="form-group">
                                                    <label for="Description">Description</label>
                                                    <input type="text" class="form-control" id="edit_expense_description_` + [i] + `" aria-describedby="expense_description" placeholder="Type in Description">
                                                    <label for="payee">Expense by:</label>
                                                    <input type="text" class="form-control" id="edit_expense_payee_` + [i] + `"" aria-describedby="expense_payee" placeholder="Enter who made the expense">
                                                    <label for="amount">Amount</label>
                                                    <input type="number" class="form-control" id="edit_expense_amount_` + [i] + `"" aria-describedby="expense_amount" placeholder="Amount">
                                                    <label for="currency">Currency</label>
                                                    <input type="text" class="form-control" id="edit_expense_currency_` + [i] + `"" aria-describedby="expense_currency" placeholder="Currency">
                                                    <label for="expensedate">Expense Date</label>
                                                    <input type="date" class="form-control" id="edit_expense_date_` + [i] + `"" aria-describedby="expense_date" placeholder="Choose Date">
                                                    <label for="paiddate">Paid Date</label>
                                                    <input type="date" class="form-control" id="edit_expense_paidDate_` + [i] + `"" aria-describedby="expense_paiddate" placeholder="Choose Date">
                                                </div>
                
                                            </form>
                                            <button  type="button" class="btn btn-success" data-dismiss="modal" onclick="EditExpense(` + deleteId + `,` + [i] + `);">Save</button>
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

function EditExpense(id, indexId) {
    var expenseDescription = $('#edit_expense_description_' + indexId).val();
    var date = new Date($('#edit_expense_date_' + indexId).val());
    var expenseDate = date.getTime();
    var dateTwo = new Date($('#edit_expense_paidDate_' + indexId).val());
    var paidDate = dateTwo.getTime();
    var expenseCurrency = $('#edit_expense_currency_' + indexId).val();
    var expensePayee = $('#edit_expense_payee_' + indexId).val();
    var expenseAmount = $('#edit_expense_amount_' + indexId).val();
    $.ajax({
        type: "POST",
        url: 'RestApi/updateExpenceController.php',
        data: {
            id: id,
            description: expenseDescription,
            expenceDate: expenseDate,
            payedDate: paidDate,
            currencyType: expenseCurrency,
            payee: expensePayee,
            amountPayed: expenseAmount,
        },
        success: function(data) {
            //removes the "active" class to .popup and .popup-content when the "Close" button is clicked 

            $.ajax({

                type: 'GET',
                url: 'RestApi/getAllExpencesController.php',
                success: function(data) {
                    var obj = JSON.parse(data);
                    var i = 0;
                    ShowExpensesSum();
                    $("#root-table").html("");
                    $("#root-table").prepend(`<thead>
                                <tr>
                                    <th>#</th>
                                    <th>Description</th>
                                    <th>The Guy</th>
                                    <th>Amount Payed</th>
                                    <th>Currency</th>
                                    <th>Expence Date</th>
                                    <th>Payed Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>`);
                    obj.expence.forEach(function() {
                        var date = new Date(+obj.expence[i].expenceDate);
                        var date2 = new Date(+obj.expence[i].payedDate);
                        var day = date.getDate();
                        var monthIndex = date.getMonth();
                        var year = date.getFullYear();
                        var formattedTime = day + '/' + (monthIndex + 1) + '/' + year;
                        var day2 = date2.getDate();
                        var monthIndex2 = date2.getMonth();
                        var year2 = date2.getFullYear();
                        var formattedTime2 = day2 + '/' + (monthIndex2 + 1) + '/' + year2;
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
                                <td>${formattedTime2}</td>
                                <td>           
                                <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editExpense` + [i] + `" onclick="EditExpenseShow(` + deleteId + `,` + [i] + `);">Edit</button>
                    
                                
                                <div class="modal" id="editExpense` + [i] + `" role="dialog">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                            <h4>Edit Expense</h4>
                                            <form id="edit-expense-` + [i] + `">
                                                <div class="form-group">
                                                    <label for="Description">Description</label>
                                                    <input type="text" class="form-control" id="edit_expense_description_` + [i] + `" aria-describedby="expense_description" placeholder="Type in Description">
                                                    <label for="payee">Expense by:</label>
                                                    <input type="text" class="form-control" id="edit_expense_payee_` + [i] + `"" aria-describedby="expense_payee" placeholder="Enter who made the expense">
                                                    <label for="amount">Amount</label>
                                                    <input type="number" class="form-control" id="edit_expense_amount_` + [i] + `"" aria-describedby="expense_amount" placeholder="Amount">
                                                    <label for="currency">Currency</label>
                                                    <input type="text" class="form-control" id="edit_expense_currency_` + [i] + `"" aria-describedby="expense_currency" placeholder="Currency">
                                                    <label for="expensedate">Expense Date</label>
                                                    <input type="date" class="form-control" id="edit_expense_date_` + [i] + `"" aria-describedby="expense_date" placeholder="Choose Date">
                                                    <label for="paiddate">Paid Date</label>
                                                    <input type="date" class="form-control" id="edit_expense_paidDate_` + [i] + `"" aria-describedby="expense_paiddate" placeholder="Choose Date">
                                                </div>
                                            </form>
                                            <button  class="btn btn-success" data-dismiss="modal" onclick="EditExpense(` + deleteId + `,` + [i] + `);">Save</button>
                                            </div>
                    
                                        </div>
                    
                                    </div>
                                </div></td>
                                <td>
                                <button type="button" class="btn btn-danger" onclick="DeleteExpense(` + deleteId + `);">Delete</button>
                                </td>
                            </tr>
                            </tbody>
                            `);

                        i++;

                    })
                },
                error: function() {
                    console.log('error');
                }
            });
        }

    });
}

function EditExpenseShow(id, indexId) {

    $.ajax({

        type: 'GET',
        url: 'RestApi/getExpenceByIdController.php',
        data: { id: id },
        success: function(data) {
            var expense = JSON.parse(data);
            var date = new Date(+expense.expenceDate);
            var date2 = new Date(+expense.payedDate);
            var day = ("0" + date.getDate()).slice(-2);
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var formattedTime = date.getFullYear() + "-" + (month) + "-" + (day);
            var day2 = ("0" + date2.getDate()).slice(-2);
            var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
            var formattedTime2 = date2.getFullYear() + "-" + (month2) + "-" + (day2);
            /* var day2 = date2.getDate();
             var monthIndex2 = date2.getMonth();
             var year2 = date2.getFullYear();
             var formattedTime2 = (monthIndex2 + 1) + '/' + day2 + '/' + year2;*/
            $('input#edit_expense_id_' + indexId).val(expense.id);
            $('input#edit_expense_description_' + indexId).val(expense.description);
            $('input#edit_expense_payee_' + indexId).val(expense.payee);
            $('input#edit_expense_amount_' + indexId).val(expense.amountPayed);
            $('input#edit_expense_currency_' + indexId).val(expense.currencyType);
            $('input#edit_expense_date_' + indexId).val(formattedTime);
            $('input#edit_expense_paidDate_' + indexId).val(formattedTime2);
        }
    });


}

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
                        ShowExpensesSum();
                        $('#root-table').html("");
                        $("#root-table").prepend(`<thead>
                                <tr>
                                    <th>#</th>
                                    <th>Description</th>
                                    <th>The Guy</th>
                                    <th>Amount Payed</th>
                                    <th>Currency</th>
                                    <th>Expence Date</th>
                                    <th>Payed Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>`);
                        obj.expence.forEach(function() {
                            var date = new Date(+obj.expence[i].expenceDate);
                            var date2 = new Date(+obj.expence[i].payedDate);
                            var day = date.getDate();
                            var monthIndex = date.getMonth();
                            var year = date.getFullYear();
                            var formattedTime = day + '/' + (monthIndex + 1) + '/' + year;
                            var day2 = date2.getDate();
                            var monthIndex2 = date2.getMonth();
                            var year2 = date2.getFullYear();
                            var formattedTime2 = day2 + '/' + (monthIndex2 + 1) + '/' + year2;
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
                                <td>${formattedTime2}</td>
                                <td><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editExpense` + [i] + `" onclick="EditExpenseShow(` + deleteId + `,` + [i] + `);">Edit</button>
                    
                                
                                <div class="modal" id="editExpense` + [i] + `" role="dialog">
                                    <div class="modal-dialog">
                    
                                        
                                        <div class="modal-content">
                    
                                            <div class="modal-body">
                                            <h4>Edit Expense</h4>
                                            <form id="edit-expense-` + [i] + `">
                                                <div class="form-group">
                                                    <label for="Description">Description</label>
                                                    <input type="text" class="form-control" id="edit_expense_description_` + [i] + `" aria-describedby="expense_description" placeholder="Type in Description">
                                                    <label for="payee">Expense by:</label>
                                                    <input type="text" class="form-control" id="edit_expense_payee_` + [i] + `"" aria-describedby="expense_payee" placeholder="Enter who made the expense">
                                                    <label for="amount">Amount</label>
                                                    <input type="number" class="form-control" id="edit_expense_amount_` + [i] + `"" aria-describedby="expense_amount" placeholder="Amount">
                                                    <label for="currency">Currency</label>
                                                    <input type="text" class="form-control" id="edit_expense_currency_` + [i] + `"" aria-describedby="expense_currency" placeholder="Currency">
                                                    <label for="expensedate">Expense Date</label>
                                                    <input type="date" class="form-control" id="edit_expense_date_` + [i] + `"" aria-describedby="expense_date" placeholder="Choose Date">
                                                    <label for="paiddate">Paid Date</label>
                                                    <input type="date" class="form-control" id="edit_expense_paidDate_` + [i] + `"" aria-describedby="expense_paiddate" placeholder="Choose Date">
                                                </div>
                
                                            </form>
                                            <button  class="btn btn-success" data-dismiss="modal" onclick="EditExpense(` + deleteId + `,` + [i] + `);">Save</button>
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

function ShowExpensesSum() {

    $.ajax({

        type: 'GET',
        url: 'RestApi/sumExpencesController.php',
        success: function(data) {
            var sum = JSON.parse(data);

            $('#expensesum').html("");
            $('#expensesum').html("Expenses sum: " + data);
        },
        error: function() {
            console.log('error');
        }
    });

}