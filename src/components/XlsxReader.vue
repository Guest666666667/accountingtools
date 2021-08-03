<template>
  <div class="XlsxReader">
    <p v-if="xlsxArray.length == 0">请上传需要进行匹配的xlsx文件</p>
    <p v-else>已从xlsx中识别到{{ xlsxArray.length }}条数据</p>
    <input
      type="file"
      accept=".xls,.xlsx"
      @change="readExcel"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import XLSX from 'xlsx'
export default {
  name: "XlsxReaderr",
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["xlsxArray"]),
  },
  mounted() {
  },
  methods: {
    ...mapMutations(["setXlsxData"]),
    readExcel(e) {
      //表格导入
      var that = this;
      const files = e.target.files;
      if (files.length <= 0) {
        //如果没有文件名
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0]; //取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
          this.setXlsxData(ws)
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.XlsxReader {
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
