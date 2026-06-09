export default {
  saveAll: async () => {
    // Lấy danh sách các hàng đã sửa
    const updatedRows = Table_KiemKe.updatedRows;
    
    if (updatedRows.length === 0) {
      showAlert('Không có dữ liệu thay đổi để lưu!', 'info');
      return;
    }

    // Chạy vòng lặp lưu từng dòng
    for (let row of updatedRows) {
      await Action_Luu_Kiem_Ke_Tool.run({
        newQty: row.updatedFields["Kiểm Kê Thực Tế / 本月实际盘点"],
        notes: row.updatedFields["Ghi Chú / 备注"],
        toolCode: row.allFields["Mã vật liệu / 物料编码"]
      });
    }

    showAlert('Đã lưu dữ liệu kiểm kê thành công!', 'success');
    // Load lại bảng sau khi lưu
    Get_KiemKe_Data.run();
  }
}