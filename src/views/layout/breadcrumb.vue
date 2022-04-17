<template>
<div class="breadcrumb">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in items" :to="item.path" :key="item.label">
            {{item.label}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>

<script>
export default {
  name: "myBreadcrumb",

  computed: {
    items() {
      return this.$store.state.breadcrumbs;
    }
  }
}
</script>

<style lang="less" scoped>
</style>
