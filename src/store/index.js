import Vue from 'vue'
import Vuex from 'vuex'
//const clone = require("rfdc")()

Vue.use(Vuex)

// cache of people from datastore
export default new Vuex.Store({
  state: {
    pid: 1, // the current centered person
    dlgPerson: null,
    dlgData: false,
    msg: null,
    unknown: { pid: -1, fname: 'Unknown', lname: '' },
    people: []
  },
  getters: {
    getPerson: (state) => (pid) => {
      return state.people.find(p => p.pid == pid)
    }
  },
  mutations: {
    SET_THE_PERSON(state, pid) {
      //console.log('SET_THE_PERSON = ' + pid);
      state.pid = pid
    },
    CACHE_PERSON(state, p) {
      state.people.push(p)
    },
    UPD_PERSON(state, person) {
      var idx = state.people.findIndex(p => p.pid == person.pid)
      if (idx == -1) {
        state.people.push(person)
      } else {
        //state.people[idx] = person // shouldnt have to do this
      }
      console.log('Updated: ' + JSON.stringify(person))
    },
    REM_PERSON(state, pid) {
      if (pid && pid > 0)
        state.people.splice(state.people.findIndex(p => p.pid == pid), 1)
    },
    DLG_PERSON(state, p) {
      //console.log('setting dlg to ' + show)
      state.dlgPerson = p
    },
    DLG_DATA(state, s) {
      state.dlgData = s
    },
    MSG(state, m) {
      state.msg = m
    }
  },
  actions: {
  },
  modules: {
  }
})
