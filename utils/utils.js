import CryptoJS from 'crypto-js'
// const key = CryptoJS.enc.Utf8.parse("1234567890000000");
// const iv = CryptoJS.enc.Utf8.parse("1234567890000000");
const key = CryptoJS.enc.Utf8.parse('5T4cU3NLFOfjx3g9407vPz0I03d67OgK')

// 加密
export function EncryptData(data) {
  if (typeof data === 'object') {
    // 如果传入的data是json对象，则先转义为json字符串
    try {
      data = JSON.stringify(data)
    } catch (error) {}
  }
  const srcs = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
// 解密
export function DecryptData(data) {
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const result = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString())
  return result
}