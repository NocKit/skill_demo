<template>
  <div>
    <div class="search-bar">
      <label class="searchText">
      姓名：
      </label>
      <el-input placeholder="请输入姓名" v-model="searchQuery.name" class="search">
      </el-input>
      <label class="searchText">
      地址：
      </label>
      <el-input placeholder="请输入地址" v-model="searchQuery.address" class="search"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-bar",

  data() {
    return {
      searchQuery: {
        name: "",
        address: ""
      }
    }
  },

  methods: {
    search() {
      this.$emit("search", this.searchQuery)
    }
  }

}
</script>

<style lang="less" scoped>
.search-bar {
  text-align: center;

  .searchText{
    margin-right: 10px;
  }

  .search {
    max-width: 200px;
    text-align: center;
    margin-right: 10px;
  }
}
</style>
