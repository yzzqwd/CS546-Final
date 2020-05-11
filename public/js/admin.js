(function() {
    const getPosts = document.getElementById("get-posts")
    const userPosts = document.getElementById("user-posts")

    getPosts.addEventListener("click", function() {
        userPosts.classList.remove("hidden")
    })
})