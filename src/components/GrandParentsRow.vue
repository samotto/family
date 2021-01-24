<template>
  <div class="generation">
    <div class="section1">
      <PersonCard :person="dd" />
      <PersonCard :person="dm" />
      <PersonCard :person="md" />
      <PersonCard :person="mm" />
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
    person: function () {
      return this.getPerson(0);
    },
    dd: function () {
      let pp = this.getParents(this.person.dad_id);
      if (pp.length == 0) return this.$store.state.unknown;
      else if (pp.length == 1)
        return "f" == pp[0].gender ? this.$store.state.unknown : pp[0];
      else return "f" == pp[0].gender ? pp[1] : pp[0];
    },
    dm: function () {
      let pp = this.getParents(this.person.dad_id);
      if (pp.length == 0) return this.$store.state.unknown;
      else if (pp.length == 1)
        return "f" == pp[0].gender ? pp[0] : this.$store.state.unknown;
      else return "f" == pp[0].gender ? pp[0] : pp[1];
    },
    md: function () {
      let pp = this.getParents(this.person.mom_id);
      if (pp.length == 0) return this.$store.state.unknown;
      else if (pp.length == 1)
        return "f" == pp[0].gender ? this.$store.state.unknown : pp[0];
      else return "f" == pp[0].gender ? pp[1] : pp[0];
    },
    mm: function () {
      let pp = this.getParents(this.person.mom_id);
      if (pp.length == 0) return this.$store.state.unknown;
      else if (pp.length == 1)
        return "f" == pp[0].gender ?pp[0]: this.$store.state.unknown;
      else return "f" == pp[0].gender ? pp[0] : pp[1];
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