
import { data } from './dummy/data.js';

const input_types = document.getElementById("input_types")
const data_lob = document.getElementById("data_lob")
const data_oc = document.getElementById("data_oc")
const data_coach = document.getElementById("data_coach")
const data_agent = document.getElementById("data_agent")

var LOBData = []
var OCData = []
var COACHData = []
var AGENTData = data

const get_input_types = async () => {
    let response = await fetch('http://127.0.0.1:8000/input_types/')
    let users = await response.json()
    var arr = json2array(users)
    let questions = ''
    arr.map( item => {
        questions+=`<option data-icon="glyphicon glyphicon-eye-open" value=${item.id}>${item.name}</option>`
    })

    let input_types_select = `
                        <label for="input_types" class="form-label">Input types</label>
                        <select class="form-select" id="input_types" required>
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

function get_lobs(data) {
    data.forEach((item)=>{if(!LOBData.includes(`{"name_lob":"${item.name_lob}","id_lob":"${item.id_lob}"}`))LOBData.push(`{"name_lob":"${item.name_lob}","id_lob":"${item.id_lob}"}`)})
    LOBData.sort()
    LOBData = LOBData.map(item => JSON.parse(item))

    let LOBoptions = ''
    LOBData.forEach( (item) => {
        LOBoptions += `<option data-value=${item.id_lob}>${item.name_lob}</option>`
    })

    let datalist = `<label for="LOBDataList" class="form-label">LOB's</label>
                    <input class="form-control" list="LOBdatalistOptions" id="LOBDataList" placeholder="Type to search...">
                    <datalist id="LOBdatalistOptions">
                        ${LOBoptions}
                    </datalist>`
    data_lob.innerHTML = datalist
}

function get_ocs(data, id_lob_selected) {
    if(id_lob_selected){
        const OCdatalistOptions = document.getElementById("OCdatalistOptions")
        const arrayData = data.filter( (item) => item.id_lob==id_lob_selected)
        let OCoptions = ''
        arrayData.forEach( (item) => {
            OCoptions += `<option data-value=${item.id_oc}>${item.name_oc}</option>`
        })
        OCdatalistOptions.innerHTML = OCoptions
    } else {
    data.forEach((item)=>{if(!OCData.includes(`{"name_oc":"${item.name_oc}","id_oc":"${item.id_oc}","id_lob":"${item.id_lob}"}`)) OCData.push(`{"name_oc":"${item.name_oc}","id_oc":"${item.id_oc}","id_lob":"${item.id_lob}"}`)})
    OCData.sort()
    OCData = OCData.map(item => JSON.parse(item))

    let arrayData = []
    OCData.forEach((item)=>{if(!arrayData.includes(`{"name_oc":"${item.name_oc}","id_oc":"${item.id_oc}"}`)) arrayData.push(`{"name_oc":"${item.name_oc}","id_oc":"${item.id_oc}"}`)})
    arrayData = arrayData.map(item => JSON.parse(item))

    let OCoptions = ''
    arrayData.forEach( (item) => {
        OCoptions += `<option data-value=${item.id_oc}>${item.name_oc}</option>`
    })

    let datalist = `<label for="OCDataList" class="form-label">OC's</label>
                    <input class="form-control" list="OCdatalistOptions" id="OCDataList" placeholder="Type to search...">
                    <datalist id="OCdatalistOptions">
                        ${OCoptions}
                    </datalist>`
    data_oc.innerHTML = datalist
    }
}

function get_coaches(data, id_lob_selected, id_oc_selected ) {
    if(id_oc_selected !== null & id_lob_selected !== null){
        const COACHdatalistOptions = document.getElementById("COACHdatalistOptions")
        const arrayData = data.filter( (item) => item.id_oc==id_oc_selected & item.name_lob==id_lob_selected)
        let COACHoptions = ''
        arrayData.forEach( (item) => {
            COACHoptions += `<option data-value=${item.id_coach}>${item.name_coach}</option>`
        })
        COACHdatalistOptions.innerHTML = COACHoptions
    } else if(id_lob_selected){
        const COACHdatalistOptions = document.getElementById("COACHdatalistOptions")
        const arrayData = data.filter( (item) => item.id_lob==id_lob_selected)
        let COACHoptions = ''
        arrayData.forEach( (item) => {
            COACHoptions += `<option data-value=${item.id_coach}>${item.name_coach}</option>`
        })
        COACHdatalistOptions.innerHTML = COACHoptions
    } else {
        data.forEach((item)=>{if(!COACHData.includes(`{"name_coach":"${item.name_coach}","id_coach":"${item.id_coach}","id_lob":"${item.id_lob}","name_lob":"${item.name_lob}","id_oc":"${item.id_oc}"}`)) COACHData.push(`{"name_coach":"${item.name_coach}","id_coach":"${item.id_coach}","id_lob":"${item.id_lob}","name_lob":"${item.name_lob}","id_oc":"${item.id_oc}"}`)})
        COACHData.sort()
        COACHData = COACHData.map(item => JSON.parse(item))

        let arrayData = []
        COACHData.forEach((item)=>{if(!arrayData.includes(`{"name_coach":"${item.name_coach}","id_coach":"${item.id_coach}"}`)) arrayData.push(`{"name_coach":"${item.name_coach}","id_coach":"${item.id_coach}"}`)})
        arrayData = arrayData.map(item => JSON.parse(item))

        let OCoptions = ''
        arrayData.forEach( (item) => {
            OCoptions += `<option data-value=${item.id_coach}>${item.name_coach}</option>`
        })

        let datalist = `<label for="COACHDataList" class="form-label">Coaches</label>
                        <input class="form-control" list="COACHdatalistOptions" id="COACHDataList" placeholder="Type to search...">
                        <datalist id="COACHdatalistOptions">
                            ${OCoptions}
                        </datalist>`
        data_coach.innerHTML = datalist
    }
}

function get_agents(data, id_lob_selected , id_oc_selected, id_coach_selected ) {
    if(id_coach_selected !== null){
        const AGENTdatalistOptions = document.getElementById("AGENTdatalistOptions")
        const arrayData = data.filter( (item) => item.name_lob==id_lob_selected & item.id_coach==id_coach_selected)
        let AGENToptions = ''
        arrayData.forEach( (item) => {
            AGENToptions += `<option data-value=${item.id_agent}>${item.name_agent}</option>`
        })
        AGENTdatalistOptions.innerHTML = AGENToptions
    } else if(id_oc_selected !== null & id_lob_selected !== null){
        const AGENTdatalistOptions = document.getElementById("AGENTdatalistOptions")
        const arrayData = data.filter( (item) => item.name_lob==id_lob_selected & item.id_oc==id_oc_selected)
        let AGENToptions = ''
        arrayData.forEach( (item) => {
            AGENToptions += `<option data-value=${item.id_agent}>${item.name_agent}</option>`
        })
        AGENTdatalistOptions.innerHTML = AGENToptions
    } else if (id_lob_selected){
        const AGENTdatalistOptions = document.getElementById("AGENTdatalistOptions")
        const arrayData = data.filter( (item) => item.id_lob==id_lob_selected)
        let AGENToptions = ''
        arrayData.forEach( (item) => {
            AGENToptions += `<option data-value=${item.id_agent}>${item.name_agent}</option>`
        })
        AGENTdatalistOptions.innerHTML = AGENToptions
    } else {
    let arrayData = []
    data.forEach((item)=>{if(!arrayData.includes(`{"name_agent":"${item.name_agent}","id_agent":"${item.id_agent}"}`)) arrayData.push(`{"name_agent":"${item.name_agent}","id_agent":"${item.id_agent}"}`)})
    arrayData = arrayData.map(item => JSON.parse(item))

    let AGENToptions = ''
    arrayData.forEach( (item) => {
        AGENToptions += `<option data-value=${item.id_agent}>${item.name_agent}</option>`
    })

    let datalist = `<label for="AGENTDataList" class="form-label">Agents</label>
                    <input class="form-control" list="AGENTdatalistOptions" id="AGENTDataList" placeholder="Type to search...">
                    <datalist id="AGENTdatalistOptions">
                        ${AGENToptions}
                    </datalist>`
    data_agent.innerHTML = datalist
    }
}

data_lob.addEventListener("change",(e)=>{
    var target = e.target.value
    var id_lob = 0;
    var datalist = document.getElementById('LOBdatalistOptions').childNodes;
        for (var i = 0; i < datalist.length; i++) {
            if (datalist[i].value === target) {
                id_lob = datalist[i].dataset.value;
                break;
            }
        }
    get_ocs(OCData, id_lob)
    get_coaches(COACHData, id_lob, null)
    get_agents(AGENTData, id_lob, null, null)
    document.getElementById('OCDataList').value = ''
    document.getElementById('COACHDataList').value = ''
    document.getElementById('AGENTDataList').value = ''
});

data_oc.addEventListener("change",(e)=>{
    var target = e.target.value
    var id_oc = 0;
    var datalist = document.getElementById('OCdatalistOptions').childNodes;
    var lob = document.getElementById('LOBDataList').value
        for (var i = 0; i < datalist.length; i++) {
            if (datalist[i].value === target) {
                id_oc = datalist[i].dataset.value;
                break;
            }
        }
    get_coaches(COACHData, lob, id_oc)
    get_agents(AGENTData, lob, id_oc, null)
    document.getElementById('COACHDataList').value = ''
    document.getElementById('AGENTDataList').value = ''
});

data_coach.addEventListener("change",(e)=>{
    var target = e.target.value
    var id_coach = 0;
    var datalist = document.getElementById('COACHdatalistOptions').childNodes;
    var lob = document.getElementById('LOBDataList').value
        for (var i = 0; i < datalist.length; i++) {
            if (datalist[i].value === target) {
                id_coach = datalist[i].dataset.value;
                break;
            }
        }
    get_agents(AGENTData, lob, null, id_coach)
    document.getElementById('AGENTDataList').value = ''
});

get_input_types()
get_lobs(data)
get_ocs(data,null)
get_coaches(data,null, null)
get_agents(data,null, null, null)
