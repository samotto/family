<template>
  <div class="outerpane">
    <div class="tt" v-if="title">{{ title }}</div>
    <div class="scrollpane">       
      <PersonCard :person="p" v-for="p in people" :key="p.pid" :event="getEvent(p)"/>        
    </div>
  </div>
</template> 

<script>
import PersonCard from "./PersonCard.vue";

export default {
  name: "PersonCardList",
  props: {
    people: Array,
    title: String,
    eventType: String,
  },
  data: function () {
    return {};
  },
  methods:{
    getEvent: function(p) {
      let e = null; 
      if (this.eventType && p.events){
        e = p.events.find(e => e.type == this.eventType);
      }
      //console.log("event for " + p.fname + ": " + JSON.stringify(e))
      return e;
    }
  },
  components: {
    PersonCard,
  },
};
</script>

<style scoped>
.outerpane {
  border: 0px solid red;
}
.tt {
  font-size: 0.8em;
  font-weight: bold;
}
.scrollpane {
  white-space: nowrap;
  overflow-x: auto;
  max-width: 100%;
}
</style>