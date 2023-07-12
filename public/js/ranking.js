
window.addEventListener("load",  ()=>{

    const tbody = document.getElementById("tbody");

    traerRegistrosDB()
    .then((res)=>{
        tbody.append(res);
    })
});



function  traerRegistrosDB(){

    let frag = document.createDocumentFragment();

    return new Promise((resolve,reject) =>{
        fetch("/registros")
        .then(res=>res.json())
        .then(res =>{
            for(let i = 0; i < res.length; i++){
                let ranking = document.createElement("td");
                text = document.createTextNode(i+1);
                ranking.appendChild(text);
                let reg = crearRegistro(res[i]);
                reg.appendChild(ranking);
                frag.appendChild(reg);
            }
        })
        .then(()=>{
            resolve(frag);
        })
        .catch((error)=>{
            console.error("registros innacesibles")
            reject(error)
        })
    })
};


function crearRegistro(reg){

    let registro = document.createElement("tr");
    
    console.log(reg["name"]);

    let text;

    let nombre = document.createElement("td");
    text = document.createTextNode(reg["name"]);
    nombre.appendChild(text);
    let smashes = document.createElement("td")
    text = document.createTextNode(reg["smash"]);
    smashes.appendChild(text);
    let passes = document.createElement("td");
    text = document.createTextNode(reg["pass"]);
    passes.appendChild(text);


    registro.appendChild(nombre);
    registro.appendChild(smashes);
    registro.appendChild(passes);

    console.log(registro);

    return registro;
}
