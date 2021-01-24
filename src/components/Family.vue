<template>
  <div>
    <GrandParentsRow/>
    <ParentsRow/>
    <PersonRow/>
    <ChildrenRow/>
    <GrandKidsRow/>
    <PersonDlg/>
    <DataDlg/>

  </div>
</template>

<script>
import PersonRow from "./PersonRow.vue";
import ParentsRow from "./ParentsRow.vue";
import GrandParentsRow from "./GrandParentsRow.vue";
import GrandKidsRow from "./GrandKidsRow.vue";
import ChildrenRow from "./ChildrenRow.vue";
import PersonDlg from "./PersonDlg.vue";
import DataDlg from "./DataDlg.vue";

export default {
  name: "Family",
  props: {},
  components: {
    PersonRow,
    ParentsRow,
    GrandParentsRow,
    GrandKidsRow,
    ChildrenRow,
    PersonDlg,
    DataDlg
  },
  data: function () {
    return { dialog: false };
  },
  created: function() {
    this.$store.commit('SET_THE_PERSON',1)
  }
};
</script>

<style scoped>
</style>
