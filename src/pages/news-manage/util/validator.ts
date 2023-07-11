export const checkPic = (rule: any, value: []) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject(new Error('请上传图片'))
      } else {
        resolve(value)
      }
    })
  }