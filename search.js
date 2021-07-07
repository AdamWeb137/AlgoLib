function add_objects(obj1,obj2){
    for(let key in obj2){
        if(key in obj1){
            obj1[key] += obj2[key];
        }else{
            obj1[key] = obj2[key];
        }
    }
}

function search_algo(text){
    text = text.toLowerCase();
    let split = text.split(" ");
    let found = {};
    for(let word of split){
        add_objects(found, search_algo_word(word));
    }
    let return_arr = [];
    for(let i in found){
        return_arr.push([i,found[i]])
    }
    return_arr.sort((a,b)=>{return -a[1] + b[1];});
    for(let i = 0; i < return_arr.length; i++){
        return_arr[i] = Number(return_arr[i][0]);
    }
    return return_arr;
}

function search_algo_word(word){
    let found = {};
    for(let i = 0; i < algos.length; i++){
        let subi = algos[i].name.toLowerCase().indexOf(word);
        if(subi > -1){
            if(i in found){
                found[i]++;
            }else{
                found[i] = 1;
            }
        }
    }
    for(let tag in search_tags){
        let subi = tag.toLowerCase().indexOf(word);
        if(subi > -1){
            for(let j = 0; j < search_tags[tag].length; j++){
                let i = search_tags[tag][j];
                if(i in found){
                    found[i]++;
                }else{
                    found[i] = 1;
                }
            }
        }
    }

    return found;
}