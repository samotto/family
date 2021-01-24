<template>
  <div class="generation">
    <div class="section1">
      <PersonCard :person="p" v-for="p in grandKids" :key="p.pid" />
    </div>
  </div>
</template>

<script>
import PersonCard from "./PersonCard.vue";
import { familyMixin } from "./../common/mixin.js";

export default {
  name: "GrandParentsRow",
  mixins: [familyMixin],
  props: {},
  data: function () {
    return {};
  },
  computed: {
    grandKids: function () {
      let gg = [];
      let cc = this.getChildren(0);
      if (cc) {
        //console.log("cc: " + JSON.stringify(cc));
        cc.forEach((c) => (gg = gg.concat(this.getChildren(c.pid))));
      }
      //console.log("gg: " + JSON.stringify(gg));
      return gg;
    },
  },
  components: {
    PersonCard,
  },
};
</script>

<style scoped>
.section1 {
  grid-column: 1 / span 5;
  display: flex;
  justify-content: center;
}
</style>