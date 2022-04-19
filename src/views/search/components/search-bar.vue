<template>
  <div>
    <div class="search-bar" :style="'flex-direction:'+searchDirection">
      <div class="searchItem">
        <label class="searchText">
          姓名：
        </label>
        <el-input placeholder="请输入姓名" v-model="searchQuery.name" class="search">
        </el-input>
      </div>
      <div class="searchItem">
        <label class="searchText">
          地址：
        </label>
        <el-input placeholder="请输入地址" v-model="searchQuery.address" class="search"></el-input>
      </div>
      <div class="searchItem">
        <el-button type="primary" icon="el-icon-search" @click="search" id="searchBtn">搜索</el-button>
      </div>
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
      },
      searchDirection: "row",
    }
  },

  mounted() {
    let windowWidth = window.innerWidth;
    if (windowWidth < 768) {
      this.searchDirection = "column";
      for (let item of document.getElementsByClassName('searchItem')){
        item.style.marginTop = "10px";
      }
      document.getElementById('searchBtn').style.width = "262px";
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
  display: flex;
  justify-content: center;

  .searchText {
    margin-right: 10px;
  }

  .search {
    max-width: 200px;
    text-align: center;
    margin-right: 10px;
  }
}
</style>
