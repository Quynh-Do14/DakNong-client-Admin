import { FailMessage, SuccessMessage } from "../common/components/toast/notificationToast";


// import store from "../store";
const request = {
  get: async (url) => {
    let token = sessionStorage.getItem('token');
    console.log(url);
    let result = await fetch(`${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
    });
    if (result.ok) {

      return result.json();
    } else {
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  uploadFile: (url, data, token) => {
    console.log(data);
    console.log(url, data);
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: "POST",
        body: data,
      })
        .then((response) => {
          try {
            return response.json();
          } catch (err) {
            reject({ err: 2, msg: "Phiên làm việc hết hạn" });
          }
        })
        .then((data) => {
          console.info(data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject({ err: 1, msg: "Vui lòng kiểm tra kết nối mạng" });
        });
    });
  },
  postUploadFile: async (url, data) => {
    let result = await fetch(url, {
      method: "POST",
      // headers: myHeaders,
      body: data,
      redirect: "follow",
    }).catch((e) => {
      console.log(e);
    });
    console.log(result);
    if (result.ok) {
      return result.json();
    } else {
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },
  post: async (url, data,) => {
    // console.log(url, data);
    let token = sessionStorage.getItem('token');
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      // redirect: 'follow',
    }).catch((e) => {
      console.log(e);
    });
    if (result.ok) {
      SuccessMessage("Tạo mới dữ liệu thành công", "Dữ liệu đã được tạo mới thành công")
      return result.json();
    } else {
      FailMessage("Tạo mới dữ liệu thất bại", "Dữ liệu đã được tạo mới thất bại");
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  put: async (url, data) => {
    // console.log(url, data);
    let token = sessionStorage.getItem('token');
    let result = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      // redirect: 'follow',
    }).catch((e) => {
      console.log(e);
    });
    if (result.ok) {
      SuccessMessage("Cập nhật dữ liệu thành công", "Dữ liệu đã được cập nhật thành công")
      return result.json();
    } else {
      FailMessage("Cập nhật dữ liệu thất bại", "Dữ liệu đã được cập nhật thất bại");
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  delete: async (url, data) => {
    // console.log(url, data);
    let token = sessionStorage.getItem('token');
    let result = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      // redirect: 'follow',
    }).catch((e) => {
      console.log(e);
    });
    if (result.ok) {
      SuccessMessage("Xóa dữ liệu thành công", "Dữ liệu đã được xóa thành công")
      return result.json();
    } else {
      FailMessage("Xóa dữ liệu thất bại", "Dữ liệu đã được xóa thất bại");
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  postThemMoiDuLieu: async (url, data) => {
    let result = await fetch(url, {
      method: "POST",
      // headers: myHeaders,
      body: data,
      redirect: "follow",
    }).catch((e) => {
      console.log(e);
    });
    console.log(result);
    if (result.ok) {
      return result.json();
    } else {
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  login: async (url, data) => {
    var myHeaders = new Headers();
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.getItem("token")
      },
      body: JSON.stringify(data),
      // redirect: 'follow',
    }).catch((e) => {
      console.log(e);
    });
    if (result.ok) {
      SuccessMessage("Đăng nhập thành công", "")
      return result.json();
    } else {
      FailMessage("Đăng nhập thất bại", "");
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

};

export default request;

