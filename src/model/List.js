// export function getList() {
//   // const xhr = new XMLHttpRequest()
//   // xhr.open('GET', 'https://my-json-server.typicode.com/kakaopay-fe/resources/words')
//   // xhr.send()
//   // xhr.onreadystatechange = function () {
//   //   if (xhr.readyState === 4 && xhr.status === 200) {
//   //     return xhr.response
//   //   }
//   // }
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', 'https://my-json-server.typicode.com/kakaopay-fe/resources/words')
//     xhr.send()
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4 && xhr.status === 200) {
//         return resoleve(xhr.response)
//       }
//     }
//   })
// }

export const getList = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://my-json-server.typicode.com/kakaopay-fe/resources/words')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      return resolve(xhr.response)
    }
  }
})