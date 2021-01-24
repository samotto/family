<template>
  <div class="generation">
    <div class="section1">
      <PersonList :people="this.getAuntsUncles(0)" title="Aunts/Uncles" />
    </div>
    <div class="section2">
      <PersonCard :person="p" v-for="(p, x, idx) in getCards()" :key="idx" />
    </div>
    <div class="section3">
      <PersonList :people="inLaws" title="In Laws" />
    </div>
  </div>
</template>

<script>
import PersonCard from "./PersonCard.vue";
import PersonList from "./PersonList.vue";
import { familyMixin } from "./../common/mixin.js";

export default {
  name: "ParentsRow",
  mixins: [familyMixin],
  data: function () {
    return {};
  },
  computed: {
    inLaws: function () {
      let ss = this.getSpouses(0);
      let ii = [];
      //console.log("Getting in laws for " + JSON.stringify(ss));
      if (ss && ss.length > 0) {
        ss.forEach((s) => (ii = ii.concat(this.getParents(s.pid))));
      }
      //console.log("In laws " + JSON.stringify(ii));
      return ii;
    },
  },
  methods: {
    getCards() {
      let pp = this.getParents(0);
      if (pp.length == 0) {
        pp.push(this.$store.state.unknown);
        pp.push(this.$store.state.unknown);
      } else if (pp.length == 1) {
        if ("f" == pp[0].gender) {
          pp.unshift(this.$store.state.unknown);
        } else {
          pp.push(this.$store.state.unknown);
        }
      }
      return pp;
    },
  },
  components: {
    PersonCard,
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