/**
 * 公共逻辑
 * 目标1:登录校验
 * 目标2:渲染用户名
 * 目标3:退出登录
 *
 */
checkToken();
renderUsername();
logout();
/**
 * 目标4:渲染学生信息
 */
const render = async () => {
  const { data } = await axios.get("/students");

  document.querySelector(".list").innerHTML = data
    .map((item) => {
      const {
        age,
        area,
        city,
        gender,
        group,
        hope_salary,
        salary,
        name,
        province,
      } = item;
      return `
      <tr>
        <td>${name}</td>
        <td>${age}</td>
        <td>${gender ? "女" : "男"}</td>
        <td>第${group}组</td>
        <td>${hope_salary}</td>
        <td>${salary}</td>
        <td>${province}${city}${area}</td>
        <td>
          <a href="javascript:;" class="text-success mr-3">
            <i class="bi bi-pen"></i>
          </a>
          <a href="javascript:;" class="text-danger">
            <i class="bi bi-trash"></i>
          </a>
        </td>
      </tr>`;
    })
    .join("");
  document.querySelector(".total").innerHTML = data.length;
};
render();

/**
 * 目标5: 新增学生
 *  5.1 点击新增按钮 + 弹出模态框
 *  5.2 在模态框中 输入内容,省市区联动
 *  5.3 点击模态框的确认按钮, 新增数据
 */
// 弹出模态框
const modalDom = document.querySelector("#modal");
const myModal = new bootstrap.Modal(modalDom);
// 5.1 点击新增按钮 + 弹出模态框
const addBtn = document.querySelector("#openModal");
addBtn.addEventListener("click", (e) => {
  myModal.show(); // 打开模态框
  // 修改模态的title
  document.querySelector(".modal-title").innerHTML = "添加学员";
});

const provinceDom = document.querySelector('[name="province"]');
const cityDom = document.querySelector('[name="city"]');
const areaDom = document.querySelector('[name="area"]');

const selectInit = async () => {
  const { list } = await axios.get("api/province");
  console.log(list);
  provinceDom.innerHTML += list
    .map((item) => `<option value="${item}">${item}</option>`)
    .join("");

  provinceDom.addEventListener("change", async (e) => {
    cityDom.innerHTML = '<option value="">-城市--</option>';
    const { list } = await axios.get("api/city", {
      params: {
        pname: e.target.value,
      },
    });

    // console.log(list);
    cityDom.innerHTML += list
      .map((item) => `<option value="${item}">${item}</option>`)
      .join("");
  });

  cityDom.addEventListener("change", async (e) => {
    areaDom.innerHTML = '<option value="">--地区--</option>';
    const { list } = await axios.get("api/area", {
      params: {
        pname: provinceDom.value,
        cname: e.target.value,
      },
    });
    console.log(list);
    areaDom.innerHTML += list
      .map((item) => `<option value="${item}">${item}</option>`)
      .join("");
  });
};
selectInit();
