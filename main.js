function render_algo(i){
    let algo = algos[i];
    let holder = document.querySelector(".algo_holder");
    holder.style.display = "flex";
    let div = holder.children[0];
    div.querySelector("h2").innerHTML = algo.name;
    let info = "";
    if(algo.time && algo.space){
        info = `Time: O(${algo.time}) | Space: O(${algo.space})`;
    }else if(algo.time){
        info = `Time: O(${algo.time}`;
    }else if(algo.space){
        info = `Space: O(${algo.space})`;
    }
    div.querySelector("#complexity").innerHTML = info;
    div.querySelector("code").innerHTML = get_untabbed_code(algo.code);
    div.querySelector(".button").onmouseup = () => {copy_code(i)};
}

function render_title(i){
    let info = ``;
    let algo = algos[i];
    if(algo.time && algo.space){
        info = `<p class="center">Time: O(${algo.time}) | Space: O(${algo.space})</p>`;
    }else if(algo.time){
        info = `<p class="center">Time: O(${algo.time})</p>`;
    }else if(algo.space){
        info = `<p class="center">Space: O(${algo.space})</p>`;
    }
    let box = document.querySelector("#algos");
    let html = `<div class="algo atitle" id="algo${i}" onmouseup="render_algo(${i})"><h2 class="center">${algo.name}</h2>${info}</div>`;
    box.innerHTML += html;
}

// function change_dis(el, type){
//     let algos_div = document.querySelector("#algos");
//     let algos_divs = document.querySelectorAll(".algo");
//     if(type == "block"){
//         for(let algo of algos_divs){
//             console.log(algo == el.parentElement);
//             if(algo != el.parentElement){
//                 algo.style.display = "none";
//             }
//         }
//         console.log(el);
//     }else{
//         for(let algo of algos_divs){
//             algo.style.display = "block";
//         }
//     }
//     el.style.display = type;
//     // algos_div.style.flexWrap = (type == "block") ? "no-wrap" : "wrap";
// }

function render_all_algos(arr){
    let box = document.querySelector("#algos");
    box.innerHTML = "";
    for(let i = 0; i < arr.length; i++){
        //render_algo(arr[i]);
        render_title(arr[i]);
    }
}

function render_all_all_algos(){
    let found = [];
    for(i = 0; i < algos.length; i++){
        found.push(i);
    }
    render_all_algos(found);
}

function copy(text){
    let fake = document.querySelector("#fake");
    fake.value = text;
    fake.innerHTML = text;
    fake.style.display = "block";
    fake.select();
    document.execCommand("copy");
    fake.style.display = "none";
}

function copy_code(i){
    copy(get_untabbed_code(algos[i].code));
}

window.addEventListener("load",()=>{
    let searchbar = document.querySelector("#search");
    searchbar.addEventListener("input",(e)=>{
        if(searchbar.value.length > 0){
            let found = search_algo(searchbar.value);
            render_all_algos(found);
        }else{
            render_all_all_algos();
        }
    });
    render_all_all_algos();

    let holder = document.querySelector(".algo_holder");
    holder.addEventListener("click",(e)=>{
        if(e.target == holder){
            holder.style.display = "none";
        }
    });

});
