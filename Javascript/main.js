$(document).ready(function() {
    $("#login-btn").click(function(e) {
        e.preventDefault();
        var username = $("#forma_log_in").val();
        var password = $("#password").val();
        $.ajax({
            type: 'POST',
            url: 'api/loginController.php',
            data: { username: username, password: password },
            success: function(data) {

            },
            error: function() {
                console.log("error");
            }
        });
    });
    document.title = 'Expenses-Tracker';
});