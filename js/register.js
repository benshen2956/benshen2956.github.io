document.querySelector("#btn-register").addEventListener("click", async (e) => {
  //1.1 收集注册数据并且校验 serialize(表单,{})

  //这句话的意思就是说格式化id为register-form的表单
  //然后要转化成对象格式,而且要验证是否为空
  const data = serialize(document.querySelector(".register-form"), {
    hash: true,
    empty: true,
  });

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

  //1.2发送请求
  const res = await axios.post("/register", data);

  showToast(res.message); //这里不要用JSON.parse()解构

  //1.4跳转到登陆页
  setTimeout(() => {
    location.href = "./login.html";
  }, 1000);
});
