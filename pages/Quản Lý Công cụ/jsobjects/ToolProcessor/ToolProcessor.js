export default {
  handleUpload: async () => {
    const emp = sel_NhanVien.selectedOptionValue;
    const urgency = sel_KhanCap.selectedOptionValue;

    if (!emp || !urgency) {
      return showAlert("Vui lòng chọn Nhân viên & Mức độ khẩn cấp!", "error");
    }

    const file = FilePicker_NhapKho.files[0];
    if (!file) return showAlert("Chưa chọn file!", "warning");

    try {
      const jsonData = file.data;
      
      for (const item of jsonData) {
        const row = {};
        for(let key in item) { row[key.trim()] = item[key]; }

        // BƯỚC QUAN TRỌNG: Bỏ qua các dòng trống ở cuối file Excel
        if (!row.tool_code) continue; 

        // Truyền đầy đủ tool_code và specifications
        await Action_Import_Tools.run({
          "tool_code": row.tool_code,
          "specifications": row.specifications, 
          "unit": row.unit,                     
          "storage_area": row.storage_area,     
          "quantity": parseInt(row.quantity) || 0,
          "emp_code": emp,
          "urgency_level": urgency
        });
      }

      showAlert("Nhập công cụ thành công!", "success");
      await Promise.all([Get_Bang_Tool.run(), Get_LichSu_Tool.run()]);
      resetWidget('Form_Tool', true);

    } catch (error) {
      showAlert("Lỗi hệ thống: " + error.message, "error");
    }
  }
}