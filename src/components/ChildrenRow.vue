<template>
  <div class="generation">
    <div class="section1">
      <PersonList :people="neicesNephews" title="Neices/Nephews" />
    </div>
    <div class="section2">
      <PersonCardList :people="this.getChildren(0)" />
    </div>
    <div class="section3">
      <PersonList :people="stepChildren" title="In Laws / Step Children" />
    </div>
  </div>
</template>

<script>
import PersonCardList from "./PersonCardList.vue";
import PersonList from "./PersonList.vue";
import { familyMixin } from "./../common/mixin.js";

export default {
  name: "ChildrenRow",
  mixins: [familyMixin],
  props: {},
  data: function () {
    return {};
  },
  computed: {
    neicesNephews: function () {
      let nn = [];
      let ss = this.getBroSisInLaws(0);
      ss = ss ? ss.concat(this.getSiblings(0)) : [];

      //console.log("Getting in NN for " + JSON.stringify(ss));
      if (ss && ss.length > 0) {
        ss.forEach((s) => (nn = nn.concat(this.getChildren(s.pid))));
      }
      //console.log("NN " + JSON.stringify(nn));
      return nn;
    },
    stepChildren: function () {
      return null;
    },
  },
  components: {
    PersonCardList,
    PersonList,
  },
};
</script>

<style scoped>
.section1 {
  grid-column: 1;
}
.section2 {
  grid-column: 2 / span 3;
  display: flex;
  justify-content: center;
}
.section3 {
  grid-column: 5;
}
</style>