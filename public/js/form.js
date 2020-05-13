const myForm = document.getElementById("myForm");
if (myForm) {
    myForm.addEventListener("submit", event => {
        event.preventDefault();
        var string = document.getElementById("text_input");
        var input = string.value;
        if(input.length > 0) {
            const li = `<div class="pBox"><li class = "is-palindrome"> ${input} </li></div>`
            $("#list").append(li);
            $("#myForm").trigger('reset');
            $('#text_input').focus();
        }
    });
}
        