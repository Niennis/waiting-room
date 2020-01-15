// LÓGICA
const emergencyWaitingQueue = [];

export const getEmergencyWaitingQueue = () => {
  
  return emergencyWaitingQueue;
};

export const addPatientToWaitingQueue = (/* patient */) => {

};

//-------------- Menu
const menu = document.querySelectorAll('.topnav a')

const turnOn = (eachMenu) => {
  eachMenu.classList.add('active')
}

for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener('click', () => {
    menu.forEach(el => el.classList.remove('active'))
    turnOn(menu[i])
  })
}
//------------------------

// ------------Página inicial Boxes de atención
export const boxes = (name, category, boxNumber, state) => {
  return `<div class="boxCont">
    <ul>
      <li>Nombre: ${name}</li>
      <li>Categoría: ${category}</li>
      <li>Box: ${boxNumber}</li>
      <li>${state}</li>
      <li><button class="nextPatient">Siguiente</button></li>
    </ul>
  </div>`
}

export const showBoxes = (attentionBox) => {
  document.getElementById('boxes').addEventListener('click', () => {
    const cont = document.getElementById('root');
    cont.classList.remove('patientCont')
    cont.innerHTML = '';
    attentionBox.map(el => cont.innerHTML += boxes(el.patient, el.category, el.number, el.occupied))
  })
}
//------------------------



// ------ Ordenar lista de espera

export const orderQueue = (a,b) => {
  let comparison = 0;
  if (a.level > b.level) {
    comparison = 1;
  } else if (a.level < b.level) {
    comparison = -1;
  }
  return comparison;
}