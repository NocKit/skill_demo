<template>
  <div class="home">
    <my-header></my-header>
    <div class="content">
      <my-menu class="myMenu"></my-menu>
      <div class="contentRight">
        <my-breadcrumb class="myBreadcrumb"></my-breadcrumb>
        <router-view class="routerView"></router-view>
      </div>
    </div>
    <my-footer class="myFooter"></my-footer>
  </div>
</template>

<script>
import myFooter from "@/views/layout/footer";
import myHeader from "@/views/layout/header";
import myMenu from "@/views/layout/menu";
import myBreadcrumb from "@/views/layout/breadcrumb";


export default {
  name: 'HomeView',
  components: {
    myFooter, myHeader, myMenu, myBreadcrumb
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;

  .content {
    height: calc(100% - 60px);
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;

    .myMenu {
      display: inline-block;
      height: 100%;
    }

    .contentRight {
      height: 100%;
      padding-left: 10px;
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #e4e4e6;

      .myBreadcrumb {
        display: inline-block;
        height: 20px;
        margin-top: 10px;
      }

      .routerView {
        display: inline-block;
        height: calc(100% - 60px);
        width: calc(100% - 30px);
        text-align: left;
        padding: 10px;
        background-color: #ffffff;
        border-radius: 5px;
        overflow: auto;

      }
    }
  }

  .myFooter {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

}
</style>
