const tbody = document.getElementById("tbody");
let desc = new Boolean();

window.addEventListener("load",  ()=>{


    desc = true;

    traerRegistrosDB("/registros")
    .then((res)=>{
        tbody.append(res);
    })
});



function  traerRegistrosDB(fuente){
    
    let frag = document.createDocumentFragment();

    return new Promise((resolve,reject) =>{
        fetch(fuente)
        .then(res=>res.json())
        .then(res =>{
            for(let i = 0; i < res.length; i++){
                let reg = crearRegistro(res[i]);
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


const btnOrden = document.getElementById("btn-orden");
btnOrden.addEventListener("click",()=>{
    tbody.innerHTML = "";
    if(desc == true){
        traerRegistrosDB("/registros_ASC")
        .then((res)=>{
            tbody.append(res);
        })
        desc = false;
    }
    else{
        traerRegistrosDB("/registros")
        .then((res)=>{
            tbody.append(res);
        })
        desc = true;
    }
});


const btnOrdenAlf = document.getElementById("btn-orden-alf");
btnOrdenAlf.addEventListener("click",()=>{
    tbody.innerHTML = "";
    if(desc == true){
        traerRegistrosDB("/registros_alf_ASC")
        .then((res)=>{
            tbody.append(res);
        })
        desc = false;
    }
    else{
        traerRegistrosDB("/registros_alf")
        .then((res)=>{
            tbody.append(res);
        })
        desc = true;
    }
});

const btnOrdenPass = document.getElementById("btn-orden-pass");
btnOrdenPass.addEventListener("click",()=>{
    tbody.innerHTML = "";
    if(desc == true){
        traerRegistrosDB("/registros_pass_ASC")
        .then((res)=>{
            tbody.append(res);
        })
        desc = false;
    }
    else{
        traerRegistrosDB("/registros_pass")
        .then((res)=>{
            tbody.append(res);
        })
        desc = true;
    }
});