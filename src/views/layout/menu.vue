<template>
  <div class="menu">
    <el-menu
        :default-active="activeIndex"
        class="menuContent"
        :style="{ width: menuWidth }"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        :collapse="isCollapse">
      <el-menu-item index="searchHome">
        <i class="el-icon-menu"></i>
        <span slot="title">列表</span>
      </el-menu-item>
      <el-menu-item index="chartHome">
        <i class="el-icon-setting"></i>
        <span slot="title">图表</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "myMenu",

  data() {
    return {
      menuWidth: '200px',
    }
  },

  computed: {
    isCollapse() {
      return this.$store.state.isCollapse
    },
    activeIndex() {
      return this.$store.state.activeIndex
    }
  },

  watch: {
    isCollapse(val) {
      if (val) {
        this.menuWidth = '60px';
      } else {
        this.menuWidth = '200px';
      }
    }
  },

  methods: {
    handleSelect(index, key, item) {
      console.log(index, key, item);
      switch (index) {
        case 'searchHome':
          this.$router.push('/searchHome');
          break;
        case 'chartHome':
          this.$router.push('/chartHome');
          break;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  min-height: 400px;
  user-select: none;

  .menuContent {
    height: 100%;
  }
}
</style>
