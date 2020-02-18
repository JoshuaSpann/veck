let api = {
 sendWebRequest: function sendWebRequest(type='post', body) {
  let xhr = new XMLHttpRequest()

  xhr.open(type.toUpperCase(),'localhost:2020/api.php', true)
  xhr.setRequestHeader('Content-type', 'application/json')
console.log(JSON.stringify(body))
  xhr.send(JSON.stringify(body))
 }
}
