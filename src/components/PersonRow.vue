<template>
  <div class="generation">
    <div class="section section1">
      <PersonList :people="cousins" title="Cousins / Step Siblings" />
    </div>
    <div class="section section2">
      <PersonCardList
        :people="this.getSiblings(0)"
        title="Siblings"
      />
    </div>
    <div class="section section3">
      <PersonCard :person="this.getPerson(0)" :main="true" />
    </div>
    <div class="section section4">
      <PersonCardList
        :people="getSpouses(0)"
        title="Spouses"
        eventType="Marraige"
      />
    </div>
    <div class="section section5">
      <PersonList
        :people="this.getBroSisInLaws(0)"
        title="In Laws"
      />
    </div>
  </div>
</template>

<script>
import PersonList from "./PersonList.vue";
import PersonCard from "./PersonCard.vue";
import PersonCardList from "./PersonCardList.vue";
import { familyMixin } from "./../common/mixin.js"

export default {
  name: "PersonRow",
  mixins: [familyMixin],
  props: {},
  data: function () {
    return {};
  },
  components: {
    PersonCard,
    PersonCardList,
    PersonList,
  },
  computed: {
    thePerson: function(){
      console.log('The person for PersonRow is ' + JSON.stringify(this.getPerson(0)));
      return this.getPerson(0);
    },
    cousins: function () {
      let au = this.getAuntsUncles(0);
      let cc = [];
      if (au && au.length > 0)
        au.forEach(
          (a) => (cc = cc.concat(this.getChildren(a.pid)))
        );
      return cc;
    },
    inLaws: function () {
      let ss = this.getSpouses(0);
      let ii = [];
      if (ss && ss.length > 0)
        ss.forEach(
          (s) => (ii = ii.concat(this.getSiblings(s.pid)))
        );
      return ii;
    },
  },
};
</script>

<style scoped>
.section1 {
  grid-column: 1;
}
.section2 {
  grid-column: 2;
}
.section3 {
  grid-column: 3;
  display: flex;
  justify-content: center;
}
.section4 {
  grid-column: 4;
}
.section5 {
  grid-column: 5 ;
}
</style>