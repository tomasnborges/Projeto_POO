import * as User from "../models/UserModel.js";
import * as Epoch from "../models/EpochModel.js";

function epochsView(epochs= []) {
    User.init()
    Epoch.init()
    //searchEpoch()
    //as funções a seguir já estão documentadas

    renderEpochs()

    document.querySelector("[type='checkbox']").addEventListener("change", function () {
        removeBlockedEpochs(this)
    })

    //ORDENAR ULTIMAS PUBLICADAS
    // const ordenarAsc = document.querySelector("#ordenarAsc")
    
    // ordenarAsc.addEventListener("click", ()=>{
    //     Epoch.sortEpochPublicacion(); 
    //     renderEpochs(Epoch.getEpochs());
    //     document.querySelectorAll(".btnOrdenar") 

    //     let btnOrdenar = document.querySelectorAll(".btnOrdenar")
    //     for (const btn of btnOrdenar) {
    //         btn.innerHTML =  ordenarAsc.innerHTML
    //     }
    // })

    //RENDARIZAR  EPOCA EXPECIFICA 
    document.querySelector('.imputProcurar').addEventListener("input", () => {
        renderEpochs(document.querySelector('.imputProcurar').value)
    })
    // ORDENAR EPOCAS
    
    //ORDENAR POR ORDEM DECRESCENTE
    
  /*   const ordenarAsc = document.querySelector("#ordenarAsc")
    
    ordenarAsc.addEventListener("click", ()=>{
        let epochs = Epoch.getEpochs()

        for (const epoch of epochs) {
            let period = epoch.period
            
            if(!period.includes(" - ")){
                let space = period.indexOf(" ")
                period = period.slice(space).trim()
                const periodDecimal = romanToInt(+period)



                console.log(period,periodDecimal);
            }

        }
        //romanToInt()
        document.querySelector(".btnOrdenar").innerHTML = ordenarAsc.innerHTML
        
    }) 
    
    //ORDENAR POR ORDEM DECRESCENTE
    const ordenarDesc = document.querySelector("#ordenarDesc")
    
    ordenarDesc.addEventListener("click", ()=>{
        
        
        
        
       // romanToInt()
        document.querySelector(".btnOrdenar").innerHTML = ordenarDesc.innerHTML
        
    })*/
    
    //ORDENAR AS EPOCAS POR ORDEM ALFABETICA
    
    // const ordenarAlf = document.querySelector("#ordenarAlf")
    
    // ordenarAlf.addEventListener("click", ()=>{
    //     Epoch.sortEpoch();
    //     renderEpochs(Epoch.getEpochs());
    //     let btnOrdenar = document.querySelectorAll(".btnOrdenar")
    //     for (const btn of btnOrdenar) {
    //         btn.innerHTML = ordenarAlf.innerHTML
    //     }

    // })

}

/**
 * RENDERIZAR AS CARDS 
 */
function renderEpochs(filterTxt = "") {
    let epochs = Epoch.getEpochs()
    let result = ""

    /**
     * ARRAY COM AS ÉPOCAS QUE O UTILIZADOR JÁ DESBLOQUEOU
     * @type {Array}
     */

    const unlockedEpochs = User.isLogged() ? User.getUserLogged().epochs.map(element => element = element[0] ) : []

    let index = 0

    for (const epoch of epochs && Epoch.getEpochsByName(filterTxt))  {
        /**
         * INDEX DO ELEMENTO DO ARRAY {@link unlockedEpochs} QUE PROVA QUE A {@link epoch} ESTÁ DESBLOQUEADA
         * @type {number}
         */
        const indexId = unlockedEpochs.findIndex(idEpoch => idEpoch === epoch.idEpoch)
        /**
         * TEXTO HTML QUE PINTA A CARD DE PRETO SE ESTIVER BLOQUEADA
         * @type {string}
         */
        const blockingDiv = indexId === -1 ? `<div class="blocked">${epoch.requirement}</div>` : ''
        
        
        result += `
        <div class="col">
            <div class="card card-most-popular-right mb-4 position-relative" style="max-width: 514px;max-height: 180px;">
                ${blockingDiv}
                <div class="row g-0">
                    <div class="col-4"
                        style="height:180px;${epoch.image.includes('/assets/img') ? 'background-image: url(.' + epoch.image + ')' : 'background-image: url(' + epoch.image + ')'};${epoch.imageStyle}">
                    </div>
                    <div class="col-8">
                        <div class="card-body">
                            <h6 class="century-title">${epoch.period}</h6>
                            <h5 class="card-title epoch-card-text">${epoch.epochTitle}</h5>
                            <p class="card-text epoch-card-text">${epoch.description}</p>
                            <div class="text-end">
                                <button class="btn btn-card btn-md rounded-pill btn-explore-epoch"
                                    role="button">Aprender</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

        index++
    }
    document.querySelector('#placeCardsHere').innerHTML = result

    bindLearnButtons(epochs)
}

/**
 * ADICIONAR EVENT "CLICK" NOS BOTÕES DAS CARDS
 */
function bindLearnButtons(epochs) {
    document.querySelectorAll('.btn-explore-epoch').forEach((element,index) => {
        element.addEventListener("click", () => {
            Epoch.setChoosenEpoch(epochs[index])
            location.href = "./epoch.html";
        })
    });
}

/**
 * ESCONDER/MOSTRAR AS ÉPOCAS BLOQUEADAS
 */
function removeBlockedEpochs(checkbox) {
    document.querySelectorAll('.blocked').forEach(div => {
        if (checkbox.checked) {
            div.parentNode.parentNode.style.display = "none"
        } else {
            div.parentNode.parentNode.style.display = ""
        }
    });
}



/// TRANSFORMAR NUMEROS RUMANOS EM DECIMAIS 
const romanNubers = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
};

function romanToInt(s) {
    let accumulator = 0;
    for (let i = 0; i < s.length; i++) {
        if(s[i] === "I" && s[i + 1] === "V") {
            accumulator += 4;
            i++;
        } else if (s[i] === "I" && s[i + 1] === "X") {
            accumulator += 9;
            i++;
        } else if (s[i] === "X" && s[i + 1] === "L") {
            accumulator += 40;
            i++;
        } else if (s[i] === "X" && s[i + 1] === "C") {
            accumulator += 90;
            i++;
        } else if (s[i] === "C" && s[i + 1] === "D") {
            accumulator += 400;
            i++;
        } else if (s[i] === "C" && s[i + 1] === "M") {
            accumulator += 900;
            i++;
        } else {
            accumulator += romanNubers[s[i]];
        }
    }
    return accumulator;

}

epochsView()