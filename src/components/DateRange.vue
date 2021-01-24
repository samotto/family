<template>
  <div class="dtr">
    <span class="tt" v-if="title">{{ title.substring(0, 1) }}:</span>
    {{ format(start) }}-<span v-if="end">{{ format(end) }}</span>
  </div>
</template>

<script>
import { formatDate } from "./../common";

export default {
  name: "DateRange",
  props: {
    start: Date,
    end: Date,
    title: String,
  },
  data: function () {
    return {};
  },
  methods: {
    format: function (dt) {
      return dt ? formatDate(dt) : "";
    },
  },
};
</script>

<style scoped>
.dtr {
  font-family: "Times New Roman", Times, serif;
  font-size: 0.8em;
}

.flex-container {
  display: flex;
}
</style>