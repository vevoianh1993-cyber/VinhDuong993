export default {
  messages: {
    SUCCESS_IMPORT: { vn: "Nhập kho thành công!", cn: "入库成功!" },
    ERR_FILE_REQUIRED: { vn: "Vui lòng chọn file trước!", cn: "请选择文件!" },
    ERR_FORM_REQUIRED: { vn: "Vui lòng chọn Nhân viên & Mức độ khẩn cấp!", cn: "请选择员工和紧急程度!" },
    ERR_GENERAL: { vn: "Lỗi hệ thống: ", cn: "系统错误: " },
    RESET_SUCCESS: { vn: "Đã làm mới dữ liệu!", cn: "数据已刷新!" }
  },

  notify: (key, type = "success") => {
    const msg = this.messages[key];
    const fullMsg = `${msg.vn} / ${msg.cn}`;
    showAlert(fullMsg, type);
  }
}