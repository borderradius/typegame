export const getList = function(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () { 
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(JSON.parse(xhr.response))
        } else {
          reject('통신에러입니다.')
        }
      }
    };
    xhr.open('GET', url)
    xhr.send()
  })
}