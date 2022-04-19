<template>
  <div class="login">
    <div class="loginForm" id="loginForm">
      <div class="loginHint">登&emsp;录</div>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="loginBtn">登&emsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "user",
      password: "pass"
    }
  },

  mounted() {
    let windowWidth = window.innerWidth;
    if (windowWidth < 768) {
      document.getElementById('loginForm').style.width = '100%';
    }
  },

  methods: {
    login() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password,

      }).then(() => {
        this.$router.push("/searchHome");
      });
    }
  }
}
</script>

<style>
.login .el-input__inner {
  width: 100%;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  border-radius: 0;
  background: transparent;
  color: #ffffff;
}
.login .el-form-item__label {
  color: #ffffff;
}
</style>

<style lang="less" scoped>
.login {
  height: 100%;
  position: relative;
  background: url("~@/assets/login_bg.jpg") no-repeat;
  background-size: cover;
}

.loginForm {
  position: absolute;
  right: 0;
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  backdrop-filter: blur(10px);

  .loginHint {
    font-size: 5vh;
    color: #ffffff;
    margin-top: 200px;
    margin-bottom: 20px;
    font-weight: bolder;
  }

  .loginBtn{
    width: 100%;
  }
}

</style>
