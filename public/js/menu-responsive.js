const nav = document.getElementById("nav-header");
const btn = document.getElementById("burger");


btn.addEventListener("click",()=>{
    nav.classList.toggle("showNav");
})

nav.addEventListener("click",()=>{
    nav.classList.toggle("showNav");
})