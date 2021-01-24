import { retrievePerson } from "./../cache";
import { upsertEvent } from "./../cache";

export const familyMixin = {
  data: function () {
    return {
    };
  },
  methods: {
    getPerson: function (pid) {
      //console.log('getPerson() with ' + pid)
      if (pid === 0) pid = this.$store.state.pid;
      else if (!pid) return this.$store.state.unknown;

      //console.log('getPerson() with ' + pid)
      var p = this.$store.state.people.find(p => p.pid === pid);
      if (!p) {
        console.log(pid + ' not in Cache, retrieving...')
        p = retrievePerson(pid) // get children pids and events as well
        if (p) {
          console.log(JSON.stringify(p) + " retreived , adding to cache");
          this.$store.commit("CACHE_PERSON", p);
        } else {
          p = this.$store.state.unknown;
        }
      }
      //console.log('Returning: ' + JSON.stringify(p))
      return p;
    },
    getSpouses: function (pid) {
      //console.log('getSpouses()!!!!!!!!' + this.$store.state.pid)
      if (pid == 0) pid = this.$store.state.pid
      else if (!pid) return [];

      let p = this.getPerson(pid);
      let mm = p.events ? p.events.filter((e) => e.type == "Marraige") : null;
      let ss = [];
      if (mm) {
        mm.forEach((e) => {
          ss.push(
            this.getPerson(e.pid1 == p.pid ? e.pid2 : e.pid1)
          );
        });
      }
      return ss;
    },
    getChildren: function (pid) {
      if (pid == 0) pid = this.$store.state.pid
      else if (!pid) return []

      let cc = []
      var p = this.getPerson(pid)
      if (p.children)
        p.children.forEach((c) =>
          cc.push(this.getPerson(c))
        );
      //console.log("Children for " + pid + "are " + JSON.stringify(cc));
      return cc;
    },
    getParents: function (pid) {
      if (pid == 0) pid = this.$store.state.pid
      else if (!pid) return [];

      let p = this.getPerson(pid);
      let pp = [];
      let d = p.dad_id ? this.getPerson(p.dad_id) : null;
      if (d) pp.push(d);
      let m = p.mom_id ? this.getPerson(p.mom_id) : null;
      if (m) pp.push(m);
      //console.log("Parents are: " + JSON.stringify(pp))
      return pp;
    },
    getSiblings: function (pid) {
      //console.log('getSiblings for ' + pid)
      if (pid == 0) pid = this.$store.state.pid
      else if (!pid) return [];

      let p = this.getPerson(pid);
      let cc = [];
      let m = p.mom_id ? this.getPerson(p.mom_id) : null;
      if (m && m.children) {
        cc = m.children.filter(cid => cid != p.pid);
      }
      let d = p.dad_id ? this.getPerson(p.dad_id) : null;
      if (d && d.children) {
        cc = cc.concat(d.children.filter(cid => cid != p.pid && !cc.includes(cid)));
      }

      let ss = [];
      cc.forEach((c) => {
        ss.push(this.getPerson(c));
      });
      //console.log('Returning siblings: ' + JSON.stringify(ss));
      return ss;
    },
    getAuntsUncles: function (pid) {
      if (pid == 0) pid = this.$store.state.pid
      else if (!pid) return [];

      let pp = this.getParents(pid);
      let cc = [];
      if (pp && pp.length > 0) {
        cc = this.getSiblings(pp[0].pid);
        //console.log('parents length is ' + pp.length)
        if (pp.length > 1) {
          //console.log('get parent #2 siblings...')
          cc = cc.concat(this.getSiblings(pp[1].pid));
        }
      }
      return cc;
    },
    getBroSisInLaws: function (pid) {
      if (pid == 0) pid = this.$store.state.pid
      else if (!pid) return [];

      let ss = this.getSpouses(pid);
      let ii = [];
      if (ss && ss.length > 0)
        ss.forEach((s) => ii = ii.concat(this.getSiblings(s.pid)));
      return ii;
    },

    formatDate: function (dt) {
      var str = '';
      if (dt)
        str = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
      return str;
    },

    fullName: function (p) {
      if (typeof p === 'string' || typeof p === 'number')
        p = this.getPerson(p)
      if (p)
        return p.fname + ' ' + (p.mname ? p.mname : '') + ' ' + p.lname
      else
        return ''
    },
    upsertEvent: function (e) {
      upsertEvent(e)
      this.$store.commit('REM_PERSON', e.pid1)
      var p = this.getPerson(e.pid1)
      console.log('reget person and ' + JSON.stringify(p))
      if (e.pid2 && e.pid2 > 0) {
        this.$store.commit('REM_PERSON', e.pid2)
        this.getPerson(e.pid2)
      }
    }
  }
};