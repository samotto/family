const PEOPLE_FILE = require('../assets/people.json');
const EVENTS_FILE = require('../assets/events.json');
const axios = require('axios');

let data = getData()

//--------------------------------------------------------------------------------------------
function getData() {
   var dd = {}
   dd.people = PEOPLE_FILE
   dd.events = EVENTS_FILE
   convert(dd);
   return dd;
}

//--------------------------------------------------------------------------------------------
function convert(data) {
   data.people.forEach(p => {
      if (p.birth_dt) p.birth_dt = new Date(p.birth_dt);
      if (p.death_dt) p.death_dt = new Date(p.death_dt);
   })
   data.events.forEach(e => {
      if (e.dt) e.dt = new Date(e.dt);
   })
}

//--------------------------------------------------------------------------------------------
export function retrievePerson(pid) {
   console.log('Calling server for ' + pid)
   return axios.get('http://localhost:3000/persons/' + pid)
}

//--------------------------------------------------------------------------------------------
export function retrievePersonxxxxxxxxxx(pid) {
   //console.log("getPerson: " + pid);
   var person = data.people.find(p => p.pid == pid);
   if (person) {
      var cc = data.people.filter(c => c.dad_id == pid || c.mom_id == pid);  // need to add adoption and bornTo
      if (cc) {
         person.children = [];
         cc.forEach(c => person.children.push(c.pid))
      }
      var ee = data.events.filter(e => e.pid1 == pid || e.pid2 == pid);
      person.events = ee ? ee : [];
   }
   //console.log("PERSON: " + JSON.stringify(person));
   return person;
}

//--------------------------------------------------------------------------------------------
// Create Person
export function insertPerson(person) {
   if (person.pid) {
      console.error('Person already has a pid: ' + person.pid);
      return;
   }
   person.pid = Math.max(...data.people.map(p => p.pid)) + 1
   data.people.push(person);

   //console.log("PERSON after insert: " + JSON.stringify(person));
   return person
}

//--------------------------------------------------------------------------------------------
// update person and events.
export function updatePerson(person) {

   if (!person.pid || person.pid <= 0) {
      console.error('Person already has a pid: ' + person.pid);
      return;
   }

   var idx = data.people.findIndex(p => p.pid == person.pid)
   if (idx < 0) {
      console.error('Person not found: ' + person.pid);
      return;
   }
   data.people[idx] = person;
   return person
}

//--------------------------------------------------------------------------------------------
export function upsertEvent(evt) {
   if (!evt.event_id || evt.event_id <= 0) {
      evt.event_id = Math.max(...data.events.map(e => e.event_id)) + 1
      data.events.push(evt)
   } else {
      var event = data.events.find(e => e.event_id == evt.event_id)
      if (event) event.dt = evt.dt // only date can be changed
   }
   return evt
}