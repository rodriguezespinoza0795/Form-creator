
const input_types = document.getElementById("input_types")

const get_input_types = async () => {
    let response = await fetch('http://127.0.0.1:8000/input_types/')
    let users = await response.json()
    var arr = json2array(users)
    let questions = ''
    arr.map( item => {
        questions+=`<option data-icon="glyphicon glyphicon-eye-open" value=${item.id}>${item.name}</option>`
    })

    input_types_select = `<select class="form-select" required>
                            <option value="">Select option</option>
                            ${questions}
                        </select>`
    input_types.innerHTML = input_types_select;
}

function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

get_input_types()
