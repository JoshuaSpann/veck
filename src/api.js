let api = {
 sendWebRequest: function sendWebRequest(type='post', body, callback) {
  let target = `${window.origin}/api.php`
  let xhr = new XMLHttpRequest()
  xhr.open(type.toUpperCase(),target, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onload = ()=> { callback(xhr.response) }
console.log(JSON.stringify(body))
  xhr.send(JSON.stringify(body))
 },
 webRequestGet: function webRequestGet(table, callback) {
  let querystring = `?t=${table}`
  let target = `${window.origin}/api.php${querystring}`
  let xhr = new XMLHttpRequest()
  xhr.open('GET', target, true)
  xhr.onload = ()=> { callback(xhr.response, table) }
  xhr.send()
}
}
