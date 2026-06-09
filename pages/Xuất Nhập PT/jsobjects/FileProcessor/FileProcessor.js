export default {
  handleUpload: async () => {
    // 1. Kiểm tra ràng buộc Form (Nhân viên & Khẩn cấp)
    const empCode = sel_NhanVien.selectedOptionValue;
    const urgency = sel_KhanCap.selectedOptionValue;
    
    if (!empCode || !urgency) {
      return I18n_Utils.notify('ERR_FORM_REQUIRED', 'error');
    }

    // 2. Kiểm tra File
    const file = FilePicker_NhapKho.files[0];
    if (!file) return I18n_Utils.notify('ERR_FILE_REQUIRED', 'warning');

    try {
      const jsonData = file.data;

      // 3. Xử lý nhập liệu từng dòng
      for (const item of jsonData) {
        // Loại bỏ dấu cách thừa trong key (chống lỗi mapping)
        const cleanItem = {};
        for(let key in item) { cleanItem[key.trim()] = item[key]; }

        await Action_Import_Bulk_Full.run({
          "part_code": cleanItem.part_code,
          "name_vn": cleanItem.name_vn,
          "unit": cleanItem.unit,
          "storage_area": cleanItem.storage_area,
          "quantity": parseFloat(cleanItem.quantity) || 0,
          "emp_code": empCode,
          "urgency_level": urgency
        });
      }

      // 4. Thông báo và Làm mới dữ liệu song song (Tối ưu)
      I18n_Utils.notify('SUCCESS_IMPORT', 'success');
      
      await Promise.all([
        Get_Bang_Kiem_Ke.run(),
        Get_LichSu_Nhap.run()
      ]);

      // 5. Reset form (Thay 'Form_NhapKho' bằng tên Widget Form của bạn)
      resetWidget('Form_NhapKho', true);

    } catch (error) {
      console.error(error);
      showAlert(I18n_Utils.messages.ERR_GENERAL.vn + ": " + error.message, 'error');
    }
  }
}