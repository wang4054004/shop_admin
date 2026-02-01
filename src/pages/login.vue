<template>
  <div>
    <el-row class="login-container">
      <el-col :lg="16" :md="12" class="login-welcome">
        <div>
          <h1>欢迎光临</h1>
          <br />
          <span>欢迎来到阿力的前端实习学习项目-Shop Admin 项目</span>
        </div>
      </el-col>
      <el-col :lg="8" :md="12" class="login-form">
        <h2>登录</h2>
        <el-form :model="loginForm" :rules="rules" @keyup.enter="login">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import router from "~/router";
import { loginapi } from "~/api/login";
import { ElNotification } from "element-plus";
import { useUserStore } from "~/store";
const userStore = useUserStore();

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const loginForm = reactive({ username: "", password: "" });
const login = () => {
  loginForm.username = loginForm.username.trim();
  loginForm.password = loginForm.password.trim();
  if (!loginForm.username || !loginForm.password) {
    alert("请输入用户名和密码");
    return;
  }
  loginapi(loginForm.username, loginForm.password).then((res) => {
    console.log(res);
    if (res.msg === "ok") {
      // alert("登录成功");
      ElNotification({
        // title: 'Error',
        message: "登陆成功",
        type: "success",
        duration: 500,
        onClose: () => {
          userStore.setToken(res.data.token);
          console.log(userStore.token);
          userStore.setUserInfo({
            id: Date.now().toString(),
            name: loginForm.username,
            avatar: "",
            role: "1",
          });
          console.log(userStore.userInfo);
          router.push("/");
        },
      });
    } else {
      ElNotification({
        // title: 'Error',
        message: res.msg,
        type: "error",
      });
    }
  });
};
</script>

<style scoped>
.login-form {
  height: 50%;
}

/* 登录页面容器 */
.login-container {
  height: 100vh;
  /* 设置容器高度为视口高度 */
  display: flex;
  /* 使用Flex布局 */
  justify-content: center;
  /* 水平居中对齐 */
  align-items: center;
  /* 垂直居中对齐 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* 设置渐变背景 */
  padding: 20px;
  /* 设置内边距，防止内容溢出 */
  font-size: 16px;
  /* 设置基础字体大小 */
}

/* 欢迎信息容器 */
.login-welcome {
  text-align: center;
  /* 文本居中对齐 */
  color: white;
  /* 设置文本颜色为白色 */
  padding: 40px;
  /* 设置内边距 */
  display: flex;
  /* 使用Flex布局 */
  flex-direction: column;
  /* 设置主轴方向为垂直 */
  justify-content: center;
  /* 垂直居中对齐 */
  align-items: center;
  /* 水平居中对齐 */
  height: 50%;
  /* 设置高度为父容器高度的100% */
}

/* 欢迎信息标题 */
.login-welcome h1 {
  font-size: 4rem;
  /* 增大字体大小，使其在100%缩放下更明显 */
  font-weight: 700;
  /* 设置字体粗细为700（粗体） */
  margin-bottom: 30px;
  /* 增大底部外边距 */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 添加文本阴影，增强立体感 */
}

/* 欢迎信息描述 */
.login-welcome span {
  font-size: 1.3rem;
  /* 增大字体大小 */
  line-height: 1.8;
  /* 设置行高为1.8，提高可读性 */
  opacity: 0.9;
  /* 设置透明度为0.9，增强层次感 */
  max-width: 500px;
  /* 增大最大宽度 */
}

/* 登录表单容器 */
.el-col.login-form {
  background: white;
  /* 设置背景色为白色 */
  border-radius: 16px;
  /* 增大圆角，使设计更现代 */
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  /* 增强阴影效果 */
  padding: 50px;
  /* 增大内边距 */
  height: auto;
  /* 设置高度自适应内容 */
  min-height: 500px;
  /* 增大最小高度 */
  display: flex;
  /* 使用Flex布局 */
  flex-direction: column;
  /* 设置主轴方向为垂直 */
  justify-content: center;
  /* 垂直居中对齐 */
  width: 100%;
  /* 确保宽度为100% */
  max-width: 450px;
  /* 设置最大宽度，防止在大屏幕上太宽 */
  min-width: 350px;
  /* 设置最小宽度，确保在小屏幕上也有良好体验 */
}

/* 登录表单标题 */
.login-form h2 {
  text-align: center;
  /* 文本居中对齐 */
  color: #333;
  /* 设置文本颜色为深灰色 */
  margin-bottom: 40px;
  /* 增大底部外边距 */
  font-size: 2.2rem;
  /* 增大字体大小 */
  font-weight: 700;
  /* 设置字体粗细为700 */
}

/* 表单容器 */
.el-form {
  width: 100%;
  /* 设置宽度为100% */
}

/* 表单项 */
.el-form-item {
  margin-bottom: 30px;
  /* 增大底部外边距 */
}

/* 表单项标签 */
.el-form-item__label {
  color: #606266;
  /* 设置标签颜色 */
  font-weight: 500;
  /* 设置字体粗细为500 */
  font-size: 1.1rem;
  /* 增大标签字体大小 */
}

/* 输入框 */
.el-input {
  border-radius: 8px;
  /* 增大圆角 */
  transition: all 0.3s ease;
  /* 添加过渡效果，持续时间0.3秒 */
  font-size: 1.1rem;
  /* 增大输入框字体大小 */
}

/* 输入框内容 */
.el-input__inner {
  height: 50px;
  /* 增大输入框高度 */
  padding: 0 15px;
  /* 调整内边距 */
  font-size: 1.1rem;
  /* 增大输入框内文字大小 */
}

/* 输入框获得焦点时的样式 */
.el-input:focus-within {
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
  /* 增强焦点边框效果 */
}

/* 登录按钮 */
.el-button {
  border-radius: 8px;
  /* 增大圆角 */
  height: 55px;
  /* 增大按钮高度 */
  font-size: 1.2rem;
  /* 增大按钮字体大小 */
  font-weight: 600;
  /* 设置字体粗细为600 */
  width: 100%;
  /* 设置宽度为100% */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* 设置渐变背景 */
  border: none;
  /* 去除边框 */
  transition: all 0.3s ease;
  /* 添加过渡效果，持续时间0.3秒 */
}

/* 登录按钮 hover 时的样式 */
.el-button:hover {
  transform: translateY(-3px);
  /* 增大向上移动距离 */
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.5);
  /* 增强阴影效果 */
}

/* 响应式设计：在小屏幕上调整布局 */
@media (max-width: 768px) {
  .login-container {
    padding: 10px;
  }

  .login-welcome {
    padding: 20px;
  }

  .login-welcome h1 {
    font-size: 3rem;
  }

  .login-welcome span {
    font-size: 1.1rem;
  }

  .el-col.login-form {
    padding: 30px;
    min-height: 450px;
    min-width: 300px;
  }

  .login-form h2 {
    font-size: 1.8rem;
  }
}
</style>
