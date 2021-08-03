<template>
  <div class="TxtReader">
    <p v-if="textArray.length == 0">请上传需要进行识别的txt文件</p>
    <p v-else>已从txt中识别到{{ textArray.length }}条数据</p>
    <input type="file" accept=".txt" @change="loadTextFromFile" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "TxtReader",
  data() {
    return {
      txt_value: "a",
    };
  },
  computed: {
    ...mapState(["textArray"]),
  },
  mounted() {},
  methods: {
    ...mapMutations(["setTextData"]),
    loadTextFromFile(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setTextData(e.target.result);
      };
      reader.readAsText(file);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.TxtReader {
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  width: 20%;
  margin: 0;
}
input {
  width: 20%;
}
</style>
