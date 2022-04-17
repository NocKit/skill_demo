<template>
  <div class="header">
    <div>
      <el-button @click="collapseChange" class="collapseBtn" :class="{'is-active': collapse}" circle>
        <i class="el-icon-menu"></i>
      </el-button>
    </div>
    <div class="logoBox" @click="logoClick">
      <img src="~@/assets/logo.svg" alt="logo" class="logo">
    </div>
    <div class="userBox">
      <el-dropdown trigger="click" @command="userClick">
        <div>
          <div class="userName">{{ userInfo.name }}</div>
          <div class="avatar">
            <img :src="userInfo.avatar" alt="avatar" class="avatarImg">
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "myHeader",
  components: {},

  computed: {
    collapse() {
      return this.$store.state.isCollapse
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },

  methods: {
    jump() {
      this.$router.push('/searchHome');
    },
    goBack() {
      this.$router.go(-1);
    },
    logoClick() {
      this.$router.push('/searchHome');
    },
    collapseChange() {
      this.$store.commit('setCollapse', !this.collapse);
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },
    userClick(val){
      switch (val) {
        case 'logout':
          this.logout();
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@header-height: 59px;

.header {
  height: @header-height;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #e5e5e5;

  .is-active {
    background-color: #fff;
  }

  .collapseBtn {
    margin-left: 10px;
  }

  .logoBox {
    width: @header-height - 10px;
    height: @header-height - 10px;
    display: flex;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    .logo {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .menuBox {
    width: calc(100% - 50px - 10px - 10px);
    height: 100%;
    text-align: center;
  }

  .userBox {
    position: absolute;
    right: 10px;
    padding: 0 10px;

    .userName {
      display: inline-block;
      height: @header-height;
      font-size: 14px;
      color: #333;
      vertical-align: top;
      line-height: @header-height;
      user-select: none;
    }

    .avatar {
      display: inline-block;
      width: @header-height - 10px;
      height: @header-height - 10px;
      vertical-align: top;
      margin-left: 10px;

      .avatarImg {
        width: @header-height - 10px;
        height: @header-height - 10px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 5px;
      }
    }
  }

  .userBox:hover {
    background-color: #e4e4e6;
    cursor: pointer;
  }

}
</style>
