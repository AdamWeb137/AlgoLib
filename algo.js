function get_untabbed_code(code){
    let new_code = "";
    let space_allowed = false;
    let total_unneeded = 0;
    let current_unneeded = 0;
    let hit_code = false;

    if(code[0] == "\n"){
        code = code.slice(1);
    }

    for(let i = 0; i < code.length; i++){
        if(hit_code){
            switch(code[i]){
                case " ":
                    current_unneeded++;
                    if(space_allowed) new_code += " ";
                    if(current_unneeded == total_unneeded) space_allowed = true;
                    break;
                case "\n":
                    new_code += code[i];
                    space_allowed = false;
                    current_unneeded = 0;
                    break;
                default:
                    new_code += code[i];
                    space_allowed = true;
                    break;
            }
        }else{
            switch(code[i]){
                case " ":
                    total_unneeded++;
                    break;
                default:
                    hit_code = true;
                    space_allowed = true;
                    new_code += code[i];
                    break;
            }
        }
    }
    return new_code;
}

let algos = [
    {
        name:"Linear Search",
        code:`
            //find index of n in array
            function linear_search(array, n){
                for(let i = 0; i < array.length; i++){
                    if(array[i] == n) return i;
                }
                return -1;
            }
        `,
        time:"n",
        space:"1",
    },
    {
        name:"Binary Search",
        code:`
            //find index of n in a sorted array
            function binary_search(array, n){
                let upper =  array.length - 1;
                let lower = 0;

                let i = Math.floor((upper + lower) / 2);

                while(lower <= upper){
                    if(array[i] == n){
                        return i;
                    }else if(array[i] > n){
                        upper = i-1;
                        i = Math.floor((upper + lower) / 2);
                    }else{
                        lower = i+1;
                        i = Math.floor((upper + lower) / 2);
                    }
                }

                return -1;
            }
        `,
        time:"log(n)",
        space:"1",
    },
    {
        name:"2D Distance",
        code:`
            //find distance between 2 2D points
            function distance_between_points(x1,y1,x2,y2){
                let dx = x2-x1;
                let dy = y2-y1;
                return (dx**2 + dy**2)**0.5;
            }
        `,
        time:"1",
        space:"1"
    },
    {
        name:"Selection Sort",
        code:`
            //sorts an array
            function selection_sort(array){
                for(let i = 0; i < array.length-1; i++){
                    let min_index = i;
                    for(let j = i+1; j < array.length; j++){
                        if(arr[j] < arr[min_index]){
                            min_index = j;
                        }
                    }
                    [array[min_index], array[i]] = [array[i], array[min_index]];
                }
            }
        `,
        time:"n^2",
        space:"1"
    },
    {
        name:"Bubble Sort",
        code:`
            //sorts an array
            function bubble_sort(array){
                for(let i = 0; i < array.length-1; i++){
                    for(let j = 0; j < array.length-i-1; j++){
                        if(arr[j+1] < arr[j]){
                            [array[j+1], array[j]] = [array[j], array[j+1]];
                        }
                    }
                }
            }
        `,
        time:"n^2",
        space:"1"
    },
    {
        name:"MinMax Sort",
        code:`
            //sorts an array
            function min_max_sort(array){
                for(let i = 0; i < Math.floor(array.length/2); i++){
                    let max_i = i;
                    let min_i = i;
                    for(let j = i+1; j < array.length - i; j++){
                        if(array[j] < array[min_i]){
                            min_i = j;
                        }else if(array[j] > array[max_i]){
                            max_i = j;
                        }
                    }
                    if(max_i == i) max_i = min_i;
                    [array[i], array[min_i]] = [array[min_i], array[i]];
                    if(min_i == array.length-i-1) min_i = max_i;
                    [array[array.length-i-1], array[max_i]] = [array[max_i],array[array.length-i-1]];
                }
            }
        `,
        time:"n^2",
        space:"1"
    },
    {
        name:"Merge Sort",
        code:`
            //creates a new sorted array
            function merge_sort(array){
                if(array.length == 0) return [];
                const merge = (a1, a2) => {
                    if(a1.length > a2.length){
                        [a2, a1] = [a1, a2];
                    }
                    let arr = [];
                    let li = 0;
                    let ri = -1;
                    for(li = 0; li < a1.length; li++){
                        while(ri+1 < a2.length && a2[ri+1] < a1[li]){
                            ri++;
                            arr.push(a2[ri]);
                        }
                        arr.push(a1[li]);
                    }
                    while(ri+1 < a2.length){
                        ri++;
                        arr.push(a2[ri]);
                    }
                    return arr;
                };
                const get_smallest = ()=>{
                    let arr = [];
                    for(let i = 0; i < array.length; i++){
                        arr.push([array[i]]);
                    }
                    return arr;
                }
                let arrs = get_smallest(array);
                while(arrs.length > 1){
                    console.log(arrs);
                    let i = 0;
                    let new_arrs = [];
                    for(i = 0; i < arrs.length-1; i += 2){
                        new_arrs.push(merge(arrs[i],arrs[i+1]));
                    }
                    if(i == arrs.length-1){
                        new_arrs[new_arrs.length-1] = merge(new_arrs[new_arrs.length-1],arrs[arrs.length-1]);
                    }
                    arrs = new_arrs;
                }
                return arrs[0];
            }
        `,
        time:"n*log(n)",
        space:"n"
    },
    {
        name:"Counting Sort",
        code:`
            //sorting algorithm used only when array countains only integer in the range 0 to k (exclusive of k)
            function counting_sort(array,k){
                let count = new Array(k);
                for(let i = 0; i < k; i++){
                    count[i] = 0;
                }
                for(let j = 0; j < array.length; j++){
                    count[array[j]] += 1;
                }
                let cur_n = 0;
                for(let i = 0; i < array.length; i++){
                    while(count[cur_n] <= 0){
                        cur_n++;
                    }
                    array[i] = cur_n;
                    count[cur_n]--;
                }
            }
        `,
        time:"n+k",
        space:"k"
    }
];

let search_tags = {};
function set_algo_tags(obj){
    for(let i in obj){
        let tags = obj[i];
        algos[i].tags = tags;
        for(let t of tags){
            if(t in search_tags){
                search_tags[t].push(i);
            }else{
                search_tags[t] = [i];
            }
        }
    }
}

set_algo_tags({
    0:["search","linear","array"],
    1:["search","binary","logarithmic","array"],
    2:["geometry","2d","distance","triangle"],
    3:["sort", "quadratic", "selection", "array"],
    4:["sort", "quadratic", "bubble", "array"],
    5:["sort", "quadratic", "array"],
    6:["sort", "logarithmic", "array","divide","conquer"],
    7:["linear","sort","integer"]
});
