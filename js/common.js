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

const data = localStorage.getItem("userMsg")
  ? JSON.parse(localStorage.getItem("userMsg"))
  : {};

//公共的检查token
const checkToken = () => {
  //3.1 先获取本地存储的token

  //Converts a JavaScript Object Notation (JSON) string into an object.
  const { token } = data;

  console.log(token);
  if (!token) {
    // 3.2提示用户登录
    showToast("请先登录");

    //3.3 跳转至登录页
    setTimeout(() => {
      location.href = "./login.html";
    }, 1000);
  }
};

//4.回显用户名
const renderUsername = () => {
  //Converts a JavaScript Object Notation (JSON) string into an object.
  const { username } = data;
  if (username) {
    document.querySelector(".username").innerHTML = username;
  }
};

//5.退出登录
const logout = () => {
  document.querySelector("#logout").addEventListener("click", (e) => {
    //5.1 清空本地存储
    localStorage.removeItem("userMsg");

    //5.2 提示用户
    showToast("请先登录");

    //5.3 跳转首页
    setTimeout(() => {
      location.href = "./login.html";
    }, 1000);
  });
};
axios.interceptors.request.use(
  (config) => {
    console.log(config);

    const { token } = data;
    if (token) {
      //官方推荐使用[] 不是 .
      config.headers["Authorization"] = data.token;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);
