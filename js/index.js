const hamtoogle = document.querySelector(".ham-toogle");
// const sidebardiv = document.querySelector(".sidebar-div");
let visible = false
hamtoogle.addEventListener("click", () => {
    const sidebardiv = document.querySelector(".sidebar-div");
    if (!visible) {
        sidebardiv.style.visibility = "visible"
        sidebardiv.style.transition = "all 0.35s cubic-bezier(0.6, -0.28, 0.74, 0.05) 0s"
        sidebardiv.style.left = "0"
        visible = true
    }
    else if (visible) {
        sidebardiv.style.transition = "all 0.35s cubic-bezier(0.6, -0.28, 0.74, 0.05) 0s"
        sidebardiv.style.left = "0%"
        sidebardiv.style.visibility = "hidden"
        visible = false
    }
})
body.addEventListener("click", () => {
    if (visible) {
        sidebardiv.style.transition = "all 0.35s cubic-bezier(0.6, -0.28, 0.74, 0.05) 0s"
        sidebardiv.style.left = "0%"
        sidebardiv.style.visibility = "hidden"
        visible = false
    }
})

hamtoogle.addEventListener("click", function(){
    sidebardiv.classList.toggle('show_sidebar');
    console.log('don')

})