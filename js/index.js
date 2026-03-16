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
    // console.log("all:", res.data);
    const { overview, year, salaryData, groupData } = res.data;
    rendOverView(overview);
    renderYear(year);
    renderSalaryData(salaryData);
    renderGroupData(groupData);
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
      text: "2026全学科薪资走势",
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
    tooltip: {
      show: true,
      trigger: "axis",
    },
    series: [
      {
        data: year.map((item) => item.salary),
        type: "line",
        smooth: true,

        //折线标记点的大小
        symbolSize: 7,

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

/**
 * 目标6: 完成饼图渲染 => 薪资分布
 */
const renderSalaryData = (salaryData) => {
  console.log(salaryData);
  const myChart = echarts.init(document.querySelector("#salary"));
  option = {
    title: {
      // 标题位置
      top: 10,
      left: 10,
      text: "班级薪资分布",
      // 文字大小
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: 0,
      left: "center",
    },
    series: [
      {
        name: "班级薪资分布",
        type: "pie",
        // 饼图的大小 [内圆的半径, 外圆的半径]
        radius: ["60%", "80%"],
        //提示线的防止重叠策略
        avoidLabelOverlap: false,
        //饼状图每个环链接处的策略
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        //就是中间的黑字提示,不需要
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 15,
        //     fontWeight: "bold",
        //   },
        // },
        //提示线
        labelLine: {
          show: false,
        },
        // data: [
        //   { value: 1048, name: "Search Engine" },
        //   { value: 735, name: "Direct" },
        //   { value: 580, name: "Email" },
        //   { value: 484, name: "Union Ads" },
        //   { value: 300, name: "Video Ads" },
        // ],
        data: salaryData.map((item) => ({
          value: item.g_count + item.b_count,
          name: item.label,
        })),
      },
    ],
    // 每个环的颜色
    color: ["#fda224", "#5097ff", "#3abcfa", "#34d39a"],
  };
  myChart.setOption(option);
};

/**
 * 目标7: 每组薪资图标
 */
const renderGroupData = (groupData) => {
  console.log("每组薪资", groupData);
  const myChart = echarts.init(document.querySelector("#lines"));
  option = {
    tooltip: { trigger: "item" },
    grip: {
      left: 70,
      top: 30,
      right: 30,
      bottom: 50,
    },
    xAxis: {
      type: "category",
      data: groupData[3].map((item) => item.name),
      axisLine: {
        lineStyle: {
          type: "dashed",
          color: "#ccc",
        },
      },
      axisLabel: {
        //默认颜色和axisLine.axisLine. color一致
        color: "#999",
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: "true",
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        data: groupData[3].map((item) => item.hope_salary),
        type: "bar",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#499FEE", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(73,159,238,0.2)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        data: groupData[3].map((item) => item.salary),
        type: "bar",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#34D39A", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(52,211,154,0.2)", // 100% 处的颜色
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
