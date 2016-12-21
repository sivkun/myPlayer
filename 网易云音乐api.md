* http://music.163.com/api/playlist/detail?id=58451795  
网易云音乐服务器不支持跨域共享，js没有办法改变请求头的Referer
网易云音乐服务器的响应头没有Access-Control-Allow-Origin信息
https://github.com/yanunon/NeteaseCloudMusic/wiki/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90API%E5%88%86%E6%9E%90
#想到了新的方案 fetch-jsonp可以尝试一下


```javascript
  var url="http://music.163.com/api/playlist/detail?id=58451795";
  var res=new Request(url,{
    method:"GET",
    mode:"cors",
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
  fetch(url,{
    method:"GET",
    mode:"cors",
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  }).then(response=>console.log(response));
```
`跨域请求`:  
> https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS    
withCredentials标志设置为true，从而使得Cookies可以随着请求发送。

```javascript
/**
参数:
input:定义要获取的资源。可能的值是：一个URL或者一个Request对象。
init:可选,是一个对象，参数有：
	method: 请求使用的方法，如 GET、POST。
	headers: 请求的头信息，形式为 Headers 对象或 ByteString。
	body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
	mode: 请求的模式，如 cors、 no-cors 或者 same-origin,默认为no-cors,该模式允许来自 CDN 的脚本、其他域的图片和其他一些跨域资源，
  但是首先有个前提条件，就是请求的 method 只能是HEAD、GET 或 POST。此外，如果 ServiceWorkers 拦截了这些请求，它不能随意添加或者修改除这些之外 Header 属性。
  第三，JS 不能访问 Response 对象中的任何属性，这确保了跨域时 ServiceWorkers 的安全和隐私信息泄漏问题。
  cors模式允许跨域请求,same-origin模式对于跨域的请求，将返回一个 error，这样确保所有的请求遵守同源策略。
	credentials: 请求的 credentials，如 omit、same-origin 或者 include。
	cache:  请求的 cache 模式: default, no-store, reload, no-cache, force-cache, or only-if-cached.
返回值：一个 Promise，resolve 时回传 Response 对象。
*/
fetch(input, init).then(function(response) {  });
```
```javascript
var url="http://music.163.com/api/playlist/detail?id=58451795";
// var res=new Request(url,{
//   method:"GET",
//   mode:"cors",
//   headers:{
//     "Content-Type":"application/x-www-form-urlencoded"
//   }
// });
var url="http://music.163.com/api/playlist/detail?id=58451795";
fetch(url,{
  method:"GET",
  mode:"cors",
  headers:{
    "Content-Type":"application/x-www-form-urlencoded"
  }
}).then(response=>console.log(response));
```
