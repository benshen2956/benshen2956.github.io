//配置axios基地址
axios.defaults.baseURL = "https://hmajax.itheima.net";

//公共的提示框函数
const showToast = (msg) => {
  // alert(msg);
  //2.1先生成实例对象
  const mytoast = document.querySelector(".my-toast");
  const toastObj = new bootstrap.Toast(mytoast);
  toastObj.show();

  //2.2让提示框内容改变
  document.querySelector(".toast-body").innerHTML = msg;
};
showToast("注册成功!");
