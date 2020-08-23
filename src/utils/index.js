import XLSX from 'xlsx';
import { notification } from 'antd';

export const getWorkbookFromBlob = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    resolve(XLSX.readFile(event.target.result, {
      type: "buffer"
    }))
  }
  reader.onerror = (error) => {
    reject(error)
    notification.error({
      message: "Read file excel error!",
    })
  }
  reader.readAsArrayBuffer(file)
})