export default {
  handleDelete: async () => {
    const password = "Admin"; 
    const inputVal = Input1.text;

    if (inputVal === password) {
      try {
        console.log("Bước 1: Đang xóa SQL...");
        await Xoa_Du_Lieu.run(); 
        
        console.log("Bước 2: Đang đóng Modal...");
        closeModal('Modal1');
        
        console.log("Bước 3: Đang reset Widget...");
        resetWidget('Input1', true);
        
        console.log("Bước 4: Đang refresh bảng...");
        await Get_Bang_Kiem_Ke.run();
        
        showAlert("Xóa thành công成功!", "success");
        
      } catch (e) {
        // IN LỖI THẬT SỰ RA CONSOLE ĐỂ BẠN ĐỌC
        console.error("Chi tiết lỗi:", e); 
        
        // HIỆN LỖI THẬT SỰ LÊN MÀN HÌNH
        showAlert("Lỗi hệ thống失败: " + e.message, "error"); 
      }
    } else {
      showAlert("Mật khẩu sai密码错!", "error");
    }
  }
}