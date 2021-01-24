<template>
  <div class="outerpane">
    <div class="tt" v-if="title">{{ title }}</div>
    <div class="scrollpane">       
      <div class="pp" v-for="p in people" :key="p.pid" @dblclick.stop="select(p)"> {{p.fname}} {{p.lname}}   </div>     
    </div>
  </div>
</template> 

<script>

export default {
  name: "PersonList",
  props: {
    people: Array,
    title: String,
  },
  data: function () {
    return {};
  },
  methods: {
    select: function(p) {
      this.$store.commit('SET_THE_PERSON', p.pid)
    }
  },
  components: {
  },
};
</script>

<style scoped>
.outerpane {
   border: 1px solid black;
   border-radius: 3px;
   background-color: white;
   margin: 2px;
   padding: 2px;
   min-height: 6em;
}
.tt {
  font-size: 0.8em;
  font-weight: bold;
  border-bottom: 1px solid black;
}
.scrollpane {
   overflow-x: hidden;
   overflow-y: auto;
   border: 0px solid black;
}
.pp {
    font-size: 0.8em;
}
.pp:hover {
  color: blue;
  cursor: pointer;
}
</style>