
import { data } from './dummy/data.js';

const input_types = document.getElementById("input_types")

var LOBData = []
var OCData = []
var COACHData = []
var AGENTData = []

const LOBdatalistOptions = document.getElementById("LOBdatalistOptions")
const COACHdatalistOptions = document.getElementById("COACHdatalistOptions")
const AGENTdatalistOptions = document.getElementById("AGENTdatalistOptions")

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

Load_data(data)

// 1.Load All lists
function Load_data(data) {
    fill_arrays(data)   
    render_lobs()
    render_ocs(0)
    render_coaches(0, 0)
    render_agents(0,0,0)
}

// 2. Fill global variables 
function fill_arrays(data) {
    // LOB
    data.forEach((item)=>{if(!LOBData.includes(`{"name_lob":"${item.name_lob}","id_lob":"${item.id_lob}"}`))LOBData.push(`{"name_lob":"${item.name_lob}","id_lob":"${item.id_lob}"}`)})
    LOBData.sort()
    LOBData = LOBData.map(item => JSON.parse(item))
    // OC
    data.forEach((item)=>{if(!OCData.includes(`{"name_oc":"${item.name_oc}","id_oc":"${item.id_oc}","name_lob":"${item.name_lob}"}`)) OCData.push(`{"name_oc":"${item.name_oc}","id_oc":"${item.id_oc}","name_lob":"${item.name_lob}"}`)})
    OCData.sort()
    OCData = OCData.map(item => JSON.parse(item))
    // COACH
    data.forEach((item)=>{if(!COACHData.includes(`{"name_coach":"${item.name_coach}","id_coach":"${item.id_coach}","name_lob":"${item.name_lob}","name_oc":"${item.name_oc}"}`)) COACHData.push(`{"name_coach":"${item.name_coach}","id_coach":"${item.id_coach}","name_lob":"${item.name_lob}","name_oc":"${item.name_oc}"}`)})
    COACHData.sort()
    COACHData = COACHData.map(item => JSON.parse(item))
    // AGENT
    AGENTData = data
}

// 3.Render LOB's Datalist
function render_lobs() {
    let LOBoptions = ''
    LOBData.forEach( (item) => {
        LOBoptions += `<option data-value=${item.id_lob}>${item.name_lob}</option>`
    })              
    LOBdatalistOptions.innerHTML = LOBoptions
}

// 4.Render OC's Datalist
function render_ocs(lob_selected) {
    let arrayData = []
    let OCoptions = ''
    if(lob_selected){
        arrayData = OCData.filter( (item) => item.name_lob==lob_selected)
    } else {
        OCData.forEach((item)=>{if(!arrayData.includes(`{"name_oc":"${item.name_oc}","id_oc":"${item.id_oc}"}`)) arrayData.push(`{"name_oc":"${item.name_oc}","id_oc":"${item.id_oc}"}`)})
        arrayData = arrayData.map(item => JSON.parse(item))
    }
    arrayData.forEach( (item) => {
        OCoptions += `<option data-value=${item.id_oc}>${item.name_oc}</option>`
    })
    document.getElementById("OCdatalistOptions").innerHTML = OCoptions
}

// 5.CHANGE LOBLIST Actions
document.getElementById("LOBDataList").addEventListener("change",(e)=>{
    LOBdatalistOptions.classList.remove("is-invalid")
    var lob = e.target.value
    render_ocs(lob)
    render_coaches(lob,0)
    render_agents(lob, 0, 0)
    clean_inputs("lob")  
});

// 6. clean inputs already selected
function clean_inputs(filter) {
    if(filter == "lob"){
        document.getElementById('OCDataList').value = ''
        document.getElementById('COACHDataList').value = ''
    } else if (filter == "oc") {
        document.getElementById('COACHDataList').value = ''
    } 
    document.getElementById('AGENTDataList').value = ''
}

// 4.Render COACHES's Datalist
function render_coaches(lob_selected, oc_selected) {
    let arrayData = []
    let COACHoptions = ''
    let LOB = document.getElementById("LOBDataList").value
    if(lob_selected !== 0 & oc_selected === 0){
        arrayData = COACHData.filter( (item) => item.name_lob==lob_selected)
    } else if (lob_selected === 0 & oc_selected !== 0) {
        arrayData = COACHData.filter( (item) => item.name_oc==oc_selected)
        if( LOB !== ""){
            arrayData = arrayData.filter( (item) => item.name_lob==LOB)
        }
    } else {    
        COACHData.forEach((item)=>{if(!arrayData.includes(`{"name_coach":"${item.name_coach}","id_coach":"${item.id_coach}"}`)) arrayData.push(`{"name_coach":"${item.name_coach}","id_coach":"${item.id_coach}"}`)})
        arrayData = arrayData.map(item => JSON.parse(item)) 
    }
    arrayData.forEach( (item) => {
        COACHoptions += `<option data-value=${item.id_coach}>${item.name_coach}</option>`
    })
    COACHdatalistOptions.innerHTML = COACHoptions
}

document.getElementById("OCDataList").addEventListener("change",(e)=>{
    var oc = e.target.value
    clean_inputs("oc")
    if (document.getElementById("LOBDataList").value) {
        render_coaches(0, oc)
    render_agents(0, oc, 0)
    } else {
        LOBdatalistOptions.classList.add("is-invalid")
    }
    
});

function render_agents(lob_selected , oc_selected, coach_selected ) {
    let arrayData = []
    let AGENToptions = ''
    let LOB = document.getElementById("LOBDataList").value
    if(lob_selected !== 0 & oc_selected ===0 & coach_selected === 0){
        arrayData = AGENTData.filter( (item) => item.name_lob==lob_selected)
    } else if(lob_selected === 0 & oc_selected !==0 & coach_selected === 0){
        arrayData = AGENTData.filter( (item) => item.name_oc==oc_selected)
        if( LOB !== ""){
            arrayData = arrayData.filter( (item) => item.name_lob==LOB)
        }
    } else if(lob_selected === 0 & oc_selected ===0 & coach_selected !== 0){
        arrayData = AGENTData.filter( (item) => item.name_coach==coach_selected)
        if( LOB !== ""){
            arrayData = arrayData.filter( (item) => item.name_lob==LOB)
        }
    } else {
        data.forEach((item)=>{if(!arrayData.includes(`{"name_agent":"${item.name_agent}","id_agent":"${item.id_agent}"}`)) arrayData.push(`{"name_agent":"${item.name_agent}","id_agent":"${item.id_agent}"}`)})
        arrayData = arrayData.map(item => JSON.parse(item))
    }
    arrayData.forEach( (item) => {
        AGENToptions += `<option data-value=${item.id_agent}>${item.name_agent}</option>`
    })
    AGENTdatalistOptions.innerHTML = AGENToptions
}

data_coach.addEventListener("change",(e)=>{
    var coach = e.target.value
    clean_inputs("coach")
    render_agents(0, 0, coach)   
});
