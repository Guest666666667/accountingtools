<template>
  <div class="home">
    <TxtDataTable />
    <XlsxDataTable />
  </div>
</template>

<script>
// @ is an alias to /src
import TxtDataTable from "@/components/TxtDataTable.vue";
import XlsxDataTable from "@/components/XlsxDataTable.vue";

export default {
  name: "Home",
  components: {
    TxtDataTable,
    XlsxDataTable,
  },
};
</script>
