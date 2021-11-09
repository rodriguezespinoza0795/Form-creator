
const form_creator = document.getElementById("form_creator")

const get_input_types = async () => {
    let response = await fetch('http://127.0.0.1:8000/input_types/')
    let users = await response.json()
    var arr = json2array(users)
    let questions = ''
    arr.map( item => {
        questions+=`<option data-icon="glyphicon glyphicon-eye-open" value=${item.id}>${item.name}</option>`
    })

    input_types = `<select class="form-select" required>
                        <option value="">Select option</option>
                            ${questions}
                    </select>
                    <input type="submit" value="Create form" class="btn btn-primary"></input>`
    form_creator.innerHTML = input_types;
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
