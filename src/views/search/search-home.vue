<template>
  <div class="searchHome">
    <div class="search-home">
      <search-bar
          @search="search"
      ></search-bar>
      <div class="addBar">
        <el-button @click="addNew" type="primary">新增</el-button>
      </div>
      <search-result
          class="searchResult"
          @edit="edit"
          @check="check"
          @deleteItem="deleteItem"
          :table-data="tableData"
          :page-data="pageData"
          :loading="loading"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      ></search-result>
    </div>
    <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.visible"
        width="60%"
        :before-close="dialogClose">
      <div>
        <el-form
            :model="dialog.data"
            :rules="rules"
            ref="form"
            label-width="80px">
          <el-form-item label="日期：" prop="date">
            <el-date-picker
                v-model="dialog.data.date"
                type="date"
                placeholder="选择日期"
                v-if="dialog.type !== 'check'"
                value-format="yyyy-MM-dd"
                class="datepicker"
            >
            </el-date-picker>
            <div v-else> {{ dialog.data.date }}</div>

          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="dialog.data.name" placeholder="请输入姓名" v-if="dialog.type !== 'check'"></el-input>
            <div v-else> {{ dialog.data.name }}</div>
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-input v-model="dialog.data.address" placeholder="请输入地址" v-if="dialog.type !== 'check'"></el-input>
            <div v-else> {{ dialog.data.address }}</div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" v-if="dialog.type !== 'check'">
    <el-button @click="dialogClose">取 消</el-button>
    <el-button type="primary" @click="dialogSubmit">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import searchBar from './components/search-bar.vue';
import searchResult from "./components/search-result";

export default {
  name: "search-home",

  components: {
    searchBar, searchResult
  },

  data() {
    return {
      title: '搜索',
      tableData: [],
      searchValue: {
        name: '',
        address: '',
      },
      dialog: {
        title: '提示',
        visible: false,
        type: '',
        data: {
          date: "",
          name: "",
          address: ""
        }
      },
      pageData: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
        pageSizes: [5, 10, 20, 30, 40, 50]
      },
      loading: false,
      rules: {},
    };
  },

  mounted() {
    this.getTableData();
  },

  methods: {
    search(value) {
      this.searchValue = value;
      this.pageData.currentPage = 1;
      this.getTableData();
    },

    handleSizeChange(val) {
      this.pageData.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.pageData.currentPage = val;
      this.getTableData();
    },
    getTableData() {
      this.loading = true;
      let params = {
        page: this.pageData.currentPage,
        pageSize: this.pageData.pageSize,
        search: this.searchValue
      };
      this.$http.get('/list', params).then(res => {
        this.tableData = res.data.data.list;
        this.pageData.total = res.data.data.total;
        this.loading = false;
      });
    },
    check(detail) {
      this.dialog.data = JSON.parse(JSON.stringify(detail));
      this.dialog.title = '参看详情';
      this.dialog.type = 'check';
      this.dialog.visible = true;
    },
    edit(detail) {
      this.dialog.data = JSON.parse(JSON.stringify(detail));
      this.dialog.title = '编辑详情';
      this.dialog.type = 'edit';
      this.dialog.visible = true;
    },
    deleteItem(detail) {
      this.$http.post('/delete', detail).then(() => {
        this.getTableData();
      });
    },
    addNew() {
      this.dialog.title = '新增详情';
      this.dialog.type = 'add';
      this.dialog.visible = true;
    },
    dialogClose() {
      this.dialog.visible = false;
    },
    dialogSubmit() {
      this.dialog.visible = false;
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.dialog.type === 'add') {
            this.$http.post('/add', this.dialog.data).then(() => {
              this.getTableData();
            });
          } else if (this.dialog.type === 'edit') {
            this.$http.post('/edit', this.dialog.data).then(() => {
              this.getTableData();
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

  }
}
</script>
<style>
.searchHome .el-date-editor {
  width: 100%;
}
</style>

<style lang="less" scoped>
.addBar{
  margin-top: 10px;
}
.searchResult {
  margin-top: 20px;

}
</style>
