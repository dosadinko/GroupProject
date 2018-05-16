$(document).ready(function () {
    $("#login-btn").click(function (e) {
        e.preventDefault();
        var username = $("#email1").val();
        var password = $("#password1").val();
        $.ajax({
            type:'POST',
            url:'api/loginController.php',
            data:{username:username, password:password},
            success:function (data) {

            },
            error:function () {
                console.log("error");
            }
        })
    })
})