//1.首先检查token
checkToken();

//2.回显用户名
renderUsername();

//3.退出登录
logout();

/*4.回显统计数
4.1 获取数据
4.2 渲染页面
*/

// 4.1 获取数据
const getData = async () => {
  //用来存储token
  const data = localStorage.getItem("userMsg")
    ? localStorage.getItem("userMsg")
    : {};

  //此处一定可以解构出来,解构不出来在第一步checkToken就退出了
  //Converts a JavaScript Object Notation (JSON) string into an object.
  const { token } = data;

  //4.1 获取数据
  try {
    const res = await axios({
      method: "GET",
      url: "/dashboard",
      //   headers: {
      //     Authorization: token,
      //   },
    });
    rendOverView(res.data.overview);
  } catch (error) {
    // console.dir(error);
    // if (error.response.status === 401) {
    //   //token过期或者被篡改
    //   showToast("登录过期,请重新登录");
    //   //清除数据并且跳转
    //   localStorage.removeItem("userMsg");
    //   setTimeout(() => {
    //     location.href = "./login.html";
    //   }, 1000);
    // }
  }
  //   console.log(res);
};

getData();

//渲染OverView的
const rendOverView = (overview) => {
  console.log(overview);
  //4.2 渲染页面 => 数据的键 = 页面要渲染的类名
  Object.keys(overview).forEach((item) => {
    document.querySelector(`.${item}`).innerHTML = overview[item];
  });
};
