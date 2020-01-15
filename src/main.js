// DOM
import box from './data/box.js';
import * as queue from './queue.js';

const emergencyWaitingQueue = [];

window.addEventListener('load', () => {
  const cont = document.getElementById('root');
  box.map(el => cont.innerHTML += queue.boxes(el.patient, el.category, el.number, el.occupied))
  queue.showBoxes(box)
})

// ----------------

// Template para formulario
const formTemplate = () => {
  return `
  <div id="patientCont">
    <div id="dataPatient">
      <div>
        <label for="patientName">Nombre paciente</label>
        <input id="patientName" type="text">
      </div>
      <div>
        <label for="age">Edad paciente</label>
        <input id="age" type="number">
      </div>
      <div>
        <label for="sex">Sexo paciente</label>
        <select name="sex" id="sex">
          <option value="fem">Femenino</option>
          <option value="masc">Masculino</option>
          <option value="other">Otros</option>
        </select>
      </div>
      <div>
        <label for="description">Descripción</label>
        <textarea name="description" id="description" cols="30" rows="10"></textarea>
      </div>
      <div>
        <label for="severity">Categoría</label>
        <select name="" id="severity">
          <option value="a">Grave</option>
          <option value="b">Mediana gravedad</option>
          <option value="c">Menos grave</option>
          <option value="d">Leve</option>
          <option value="e">Atención general</option>
        </select>
      </div>
      <div>
        <button id="sendBtn">Enviar</button>
      </div>
    </div>
  </div>`
}
// --------------



const addPatientToQueue = () => {
  const rootCont = document.getElementById('root');
  document.getElementById('add').addEventListener('click', ()=> {
    rootCont.innerHTML = formTemplate();
    rootCont.classList.add('patientCont');
    document.getElementById('sendBtn').addEventListener('click', () => {
      let patientName = document.getElementById('patientName').value;
      let patientAge = document.getElementById('age').value;
      let patientSex = document.getElementById('sex').value;
      let description = document.getElementById('description').value;
      let severity = document.getElementById('severity')
      let category = severity.options[severity.selectedIndex].text;
      let level = document.getElementById('severity').value;

      let newPatient= {
        name: patientName,
        age: patientAge,
        sex: patientSex,
        description: description,
        category: category,
        level: level
      }
      emergencyWaitingQueue.push(newPatient)
      return emergencyWaitingQueue.sort(queue.orderQueue)
    })
  })
}
addPatientToQueue()

const queueTemplate = (name, category) => {
  return `<div class="queuePatient">
            <p>Paciente: ${name}</p>
            <p>Categoría: ${category}</p>
            <button class="addToBoxBtn">Agregar a box</button>
          </div>`
}

const showQueue = () => {
  const cont = document.getElementById('root');
  document.querySelector('#queue').addEventListener('click', () => {
    if(emergencyWaitingQueue.length > 0){
      cont.innerHTML = '';
      let queue = emergencyWaitingQueue.map(el => cont.innerHTML += queueTemplate(el.name, el.category))
      let allBtnToBox = document.querySelectorAll('.addToBoxBtn');
      allBtnToBox.forEach(el => el.addEventListener('click', ()=> {addToBox()}))
      cont.classList.add('patientCont')   
    }
    else{
      cont.innerHTML = `<p>No hay pacientes actualmente.</p>`
    }
  })
}
showQueue()

const addToBox = () => {
  for(let i = 0; i < box.length; i++){
    if(box[i].occupied === "Libre"){      
      box[i].patient = emergencyWaitingQueue[i].name;
      box[i].category= emergencyWaitingQueue[i].category;
      box[i].occupied= 'Ocupado';
      showNextPatient(box[i].patient, box[i].number)
      break;
    } else {
      console.log('ocupado')
    }
  }
}

window.addEventListener('load', () => {
  const nextPatientArr = document.querySelectorAll('.nextPatient');
  nextPatientArr.forEach(el => el.addEventListener('click', ()=>{
    addToBox()
  }))
})

const showNextPatient = (name, box) => {
  window.location.href = "#add"
  document.getElementById('root').innerHTML = nextTemplate(name, box)
  document.getElementById('next').classList.add('active');
  document.getElementById('queue').classList.remove('active')
}

// Template pestaña Siguiente
const nextTemplate = (name, box) => {
  return `<div id="nextPatientContainer" >
    <h2>${name}</h2>
    <h2>${box}</h2>
  </div>`
}

// Menu a pestaña Siguiente
document.getElementById('next').addEventListener('click', ()=> {
  document.getElementById('root').innerHTML = nextTemplate('Paciente', 'Box')
})