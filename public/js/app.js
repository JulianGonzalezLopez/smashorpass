const passBtn = document.getElementById("pass");
const smashBtn = document.getElementById("smash");


let champions;
let personajeActual = 0;

window.addEventListener("load",()=>{
    fetch("http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json")
    .then(res=>res.json())
    .then(res=>champions = Object.values(res["data"]))
    .then(()=>cargarInfo())
    .catch(err=>console.log(err))
})

function cargarInfo(){  
    const hiddenInputName = document.getElementById("name");
    hiddenInputName.value = champions[personajeActual].name;
    const hiddenInputID = document.getElementById("id");
    hiddenInputID.value = champions[personajeActual].key;
    const champImage = document.getElementById("champImage");
    if(window.innerWidth > 800){
        champImage.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions[personajeActual].name}_0.jpg`;
    }
    else{
        champImage.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champions[personajeActual].name}_0.jpg`;
    }
    
    
}

const formulario = document.getElementsByTagName("form")[0];
formulario.addEventListener("submit",(e)=>e.preventDefault());



smashBtn.addEventListener("click",(e)=>{
    e.preventDefault();


    smashBtn.disabled = true;
    passBtn.disabled = true;

    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let eleccion = "smash"
    
    let formData = {
        id,
        name,
        eleccion
    }

    fetch("sop",{
        method: "POST",
        headers:{"Content-Type":"application/json"}
    ,
    body:JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .finally(()=>{
        personajeActual++;
        cargarInfo();
        smashBtn.disabled = false;
        passBtn.disabled = false;
    })
});


passBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    smashBtn.disabled = true;
    passBtn.disabled = true;

    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let eleccion = "pass"
    
    let formData = {
        id,
        name,
        eleccion
    }

    fetch("sop",{
        method: "POST",
        headers:{"Content-Type":"application/json"}
    ,
    body:JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .finally(()=>{
        personajeActual++;
        cargarInfo();
        smashBtn.disabled = false;
        passBtn.disabled = false;
    })
});



