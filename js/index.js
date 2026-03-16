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
    renderYear(res.data.year);
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
/**
 * 目标5: 折线图渲染 => 函数
 *  5.1 封装函数
 *  5.2 整合图例
 *    init 初始化一个实例
 *    准备配置项
 *    调用配置项
 */
const renderYear = (year) => {
  const myChart = echarts.init(document.querySelector("#line"));
  console.log(year);

  // Specify the configuration items and data for the chart
  const option = {
    //标题组件
    title: {
      text: "2022全学科薪资走势",
      left: 5,
      top: 10,
    },
    // 网格组件
    grip: {
      top: "20%",
    },

    xAxis: {
      type: "category",
      // boundaryGap: false,

      data: year.map((item) => item.month),
      // x轴坐标轴线
      axisLine: {
        // 轴线样式
        lineStyle: {
          type: "dashed", // 轴线颜色
          color: "#cccccc", // 轴线颜色
        },
      },
    },
    yAxis: {
      type: "value",
      //分割线改成虚线
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },

    series: [
      {
        data: year.map((item) => item.salary),
        type: "line",
        smooth: true,

        //折线标记点的大小
        symbolSize: 10,

        //线条样式
        lineStyle: {
          width: 4,
          color: {
            type: "linear", // 线性渐变
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#479dee", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#5c75f0", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#b2d7f7", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(255,255,255,0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  };
  myChart.setOption(option);
};
// const createStudent = async (studentData) => {
//   try {
//     const res = await axios.post("/students", studentData);

//     console.log("✅ 添加成功");
//     console.log(res);
//   } catch (error) {
//     console.log("❌ 添加失败");
//     console.log(error);
//   }
// };
// createStudent({
//   name: "张伟",
//   age: 20,
//   gender: 0,
//   province: "北京",
//   city: "北京",
//   area: "海淀区",
//   hope_salary: 12000,
//   salary: 10500,
//   group: 1,
// });
// createStudent;
