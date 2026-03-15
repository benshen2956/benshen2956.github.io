/**
 * 目标:完成登录功能
 * 1.注册事件
 * 2.收集表单数据,并且验证
 * 3. 发送请求,判断请求,提示用户
 * 4.如果成功则本地存储用户名
 * 5.跳转页面
 */
const loginForm = document.querySelector(".login-form");

document.querySelector("#btn-login").addEventListener("click", async (e) => {
  const data = serialize(loginForm, { hash: true, empty: true });
  if (!data.username) {
    return showToast("用户名不能为空!");
  }
  if (data.username.length < 8 || data.username.length > 30) {
    return showToast("用户名要保证再8位到30位之间!");
  }

  if (!data.password) {
    return showToast("密码不能为空!");
  }
  if (data.password.length < 6 || data.password.length > 30) {
    return showToast("密码要保证再6位到30位之间!");
  }
  try {
    const res = await axios.post("/login", data);

    const obj = {};
    obj.username = res.data.data.username;
    localStorage.setItem("userMsg", JSON.stringify(obj));
    showToast(res.data.message);

    setTimeout(() => {
      location.href = "./index.html";
    }, 1000);
  } catch (error) {
    // console.dir(error);
    return showToast(error.response.data.message);
  }
});
