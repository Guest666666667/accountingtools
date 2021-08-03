import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    textArray: [],
    xlsxArray: [],
  },
  mutations: {
    //设置文本内容
    setTextData(state, data) {
      let textArray_tmp = data.match(/中国建设银行([\s\S]*?)第二日打印/g);
      textArray_tmp.forEach((sourceData, index) => {
        let obj = {};
        obj.key = index + 1;
        obj.date = sourceData.match(/日期：([\s\S]*?)凭证号/g).toString().replace(/日期：/g, '').replace(/凭证号/g, '');
        obj.name = sourceData.match(/付款人全称([\s\S]*?)收款人全称/g).toString().replace(/付款人全称/g, '').replace(/收款人全称/g, '');
        obj.amount = sourceData.match(/小写金额([\s\S]*?)用途/g).toString().replace(/小写金额/g, '').replace(/用途/g, '').replace(/,/g, '').trim();
        obj.serialNumber = sourceData.match(/流水号：([\s\S]*?)付款人全称/g).toString().replace(/流水号：/g, '').replace(/付款人全称/g, '').trim();
        state.textArray.push(obj);
      });
    },
    //保存文本内容
    saveTextData(state, data) {
      if (data.key) {
        Object.assign(state.textArray.filter((item) => data.key === item.key)[0], data);
      }
    },
    //设置表格内容
    setXlsxData(state, data) {
      console.log(data)
      for (let i = 1; i < data.length; i++) {
        let obj = {};
        obj.key = i;
        obj.date = data[i].__EMPTY;
        obj.amount = data[i].A;
        obj.name = data[i].B;
        obj.serialNumber = data[i].C;
        obj.totalNumber = data[i].D;
        state.xlsxArray.push(obj);
      }
    },
    //保存表格内容
    saveXlsxData(state, data) {
      if (data.key) {
        Object.assign(state.xlsxArray.filter((item) => data.key === item.key)[0], data);
      }
    },
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
})
