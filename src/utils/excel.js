/*<input type="file" id="excelFile" onChange="getExcelData(event)"/>*/
//onChange
import { saveUserList } from "@/utils/localStorage";

/**
 * 엑셀 업로드
 */
export const uploadExcel = (event) => {
  const input = event.target;
  const reader = new FileReader();

  reader.onload = () => {
    const fileData = reader.result;
    // eslint-disable-next-line no-undef
    const wb = XLSX.read(fileData, { type: "binary" });
    wb.SheetNames.forEach((sheetName) => {
      // eslint-disable-next-line no-undef
      const rowList = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
      //localStorage 저장
      saveUserList(rowList);
    });
  };
  reader.readAsBinaryString(input.files[0]);
};

/**
 * 엑셀 저장
 */
export const saveExcel = (userList) => {
  // step 1. workbook 생성
  // eslint-disable-next-line no-undef
  const wb = XLSX.utils.book_new();

  // step 2. 시트 만들기
  // eslint-disable-next-line no-undef
  const newWorksheet = XLSX.utils.json_to_sheet(userList);

  // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
  // eslint-disable-next-line no-undef
  XLSX.utils.book_append_sheet(wb, newWorksheet, "Sheet1");

  // step 4. 엑셀 파일 만들기
  // eslint-disable-next-line no-undef
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  // eslint-disable-next-line no-undef
  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    "이은경_유저_엑셀_파일.xlsx"
  );
};

const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  const view = new Uint8Array(buf); //create uint8array as viewer
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
  return buf;
};
