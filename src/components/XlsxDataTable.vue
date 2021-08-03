<template>
  <div class="XlsxDataTable">
    <a-table
      :columns="columns"
      :data-source="xlsxArray"
      @change="tableChange"
      bordered
    >
      <template slot="title">
        <XlsxReader />
      </template>
      <template
        v-for="col in ['date', 'serialNumber', 'name', 'amount']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.key == editingKey"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.key == editingKey">
            <a @click="() => save()">保存</a>
            <a @click="() => cancel()">取消</a>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
              >编辑</a
            >
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import XlsxReader from "@/components/XlsxReader.vue";
export default {
  name: "XlsxDataTable",
  components: {
    XlsxReader,
  },
  data() {
    return {
      editingKey: "", //编辑按钮
      tempValue: {}, //编辑暂存数据
      sortedInfo: null, //排序信息
    };
  },
  computed: {
    ...mapState(["xlsxArray"]),
    //table列定义
    columns() {
      let { sortedInfo } = this;
      sortedInfo = sortedInfo || {};
      const columns = [
        {
          title: "序号",
          dataIndex: "key",
          align: "center",
          width: "10%",
          scopedSlots: { customRender: "key" },
          sorter: (a, b) => a.key - b.key,
          sortOrder: sortedInfo.columnKey === "key" && sortedInfo.order,
        },
        {
          title: "交易时间",
          dataIndex: "date",
          align: "center",
          width: "10%",
          scopedSlots: { customRender: "date" },
          sorter: (a, b) => parseFloat(a.date) - parseFloat(b.date),
          sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order,
        },

        {
          title: "交易流水号",
          dataIndex: "serialNumber",
          align: "center",
          width: "20%",
          scopedSlots: { customRender: "serialNumber" },
          sorter: (a, b) =>
            parseFloat(a.serialNumber) - parseFloat(b.serialNumber),
          sortOrder:
            sortedInfo.columnKey === "serialNumber" && sortedInfo.order,
        },
        {
          title: "对方户名",
          dataIndex: "name",
          align: "center",
          width: "35%",
          scopedSlots: { customRender: "name" },
          sorter: (a, b) => a.name.length - b.name.length,
          sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
        },
        {
          title: "金额",
          dataIndex: "amount",
          align: "center",
          width: "10%",
          scopedSlots: { customRender: "amount" },
          sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
          sortOrder: sortedInfo.columnKey === "amount" && sortedInfo.order,
        },
        {
          title: "操作",
          dataIndex: "operation",
          align: "center",
          scopedSlots: { customRender: "operation" },
        },
      ];
      return columns;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations(["saveXlsxData"]),
    //table排序事件触发
    tableChange(pagination, filters, sorter) {
      this.sortedInfo = sorter;
    },
    //编辑事件触发
    handleChange(value, key, column) {
      this.tempValue["key"] = key;
      this.tempValue[column] = value;
    },
    //编辑
    edit(key) {
      this.editingKey = key;
    },
    //保存
    save() {
      this.saveXlsxData(this.tempValue);
      this.editingKey = "";
    },
    //取消
    cancel() {
      this.editingKey = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
