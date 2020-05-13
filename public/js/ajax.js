/*
$(document).ready(function(){
    $("#user-posts").click(function(){
        $("#get-posts").show();
    });
});
*/

$(function () {
    $('#get-posts').on('click', function () {
        $.ajax({
            type: "GET",
            url: "/admin/",
        });
    });
});