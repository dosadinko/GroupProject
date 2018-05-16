$(document).ready(function() {

    $('#register-div').hide();
    // end of document.ready
});

function SwitchToRegForm() {

    $('#login-div').hide();
    $('#register-div').show();
}

function Login() {

    $("#login-btn").click(function(e) {
        var password = $("#password").val();
        var username = $("#forma_log_in").val();
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
    e.preventDefault();

}