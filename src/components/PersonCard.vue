<template>
  <div :class="clazz" @dblclick="select()">
    <div class="nm">
      {{ fullName(person) }}
      <div style="float: right">
        <v-icon
          small
          color="primary"
          @click.stop="showDlg()"
          title="View/Edit Person's Details"
          >mdi-information</v-icon
        >
      </div>
    </div>
    <div class="second">
      <div class="img">
        <img class="pic" :src="profilePic" />
      </div>
      <div class="birth">
        <DateRange :start="person.birth_dt" :end="person.death_dt" />
      </div>
      <div class="event">
        <DateRange
          :start="event.dt"
          :title="event.type"
          v-if="event"
        />
      </div>
    </div>
  </div>
</template> 

<script>
import { familyMixin } from "./../common/mixin.js";
import DateRange from "./DateRange.vue";

export default {
  name: "PersonCard",
  mixins: [familyMixin],
  props: {
    person: { type: Object, require: true },
    event: Object,
    main: Boolean,
  },
  data: function () {
    return {}
  },
  computed: {
    clazz: function () {
      return this.main ? "main" : "card";
    },
    profilePic: function () {
      if (this.person.pic) {
        return this.person.pic;
      } else {
        let images = require.context("../assets/", false, /\.jpg$/);
        let img = "f" == this.person.gender ? "./female.jpg" : "./male.jpg";
        return images(img);
      }
    },
  },
  methods: {
    select: function () {
      if (this.person.pid != this.$store.state.unknown.pid)
        this.$store.commit("SET_THE_PERSON", this.person.pid);
    },
    showDlg() {
      //console.log('Person for dlg is ' + this.person.pid);
      this.$store.commit("DLG_PERSON", this.person); 
    },
  },
  components: {
    DateRange,
  },
};
</script>

<style scoped>
.card {
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  width: 12em;
  height: 5em;
  box-shadow: 5px 5px 3px grey;
  display: inline-block;
  margin: 3px 5px 3px 5px;
  text-align: left;
  font-size: 0.9em;
}
.card:hover {
  background-color: #fff9c4;
}
.main {
  background-color: #fff9c4;
  border: 2px solid black;
  border-radius: 5px;
  width: 12em;
  height: 5em;
  box-shadow: 10px 10px 5px grey;
  display: inline-block;
  margin: 3px 15px 3px 15px;
  text-align: left;
  font-size: 0.9em;
}
.main:hover {
  background-color: yellow;
}
.grid-container {
  display: grid;
}
.nm {
  font-weight: bold;
  text-align: left;
  padding-left: 2px;
}
.pic {
  height: 40px;
  width: 40px;
}
.second {
  display: grid;
  grid-template-columns: 40px 1fr;
}
.img {
  grid-row: 1 / span 2;
  grid-column: 1;
}
.birth {
  grid-row: 1;
  grid-column: 2;
}
.event {
  grid-row: 2;
  grid-column: 2;
}
</style>