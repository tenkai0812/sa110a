# WEEK2 
## 查表法
由上個禮拜BigO的探討，我們知道將coding由繁化簡是件佳事，但要如何做到由繁化簡呢，這裡介紹一個方式:**查表法**
 ## 費氏數列 
- [費氏數列](./homework/alg/fibonacci.md)
由此可知要對電腦來說計算費氏數列的複雜難度成指數成長，一旦數字一大，對電腦的負載量就會極大，範例:

```=
function fibonacci (n) {
  if (n < 0) throw Error('fibonacci:n < 0')
  if (n === 0) return 0
  if (n === 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

var startTime = Date.now()
const n = 45
console.log(`fibonacci(${n})=${fibonacci(n)}`)
var endTime = Date.now()
var milliSeconds = endTime - startTime
console.log(`time:${milliSeconds}ms`)
```
**BigO = n^2**
```
sky@MSI MINGW64 ~/Desktop/VSCode  (GITHUB)/軟體工程演算法/sa/alg/01-tableLookup/fiboanacci (master)
$ deno run fibonacci.js 
fibonacci(45)=1134903170
time:14000ms
```
<br>

- 因此我們利用了像查字典的方式，利用了JS的物件，讓他記憶後，之後直接輸出即可，不用多作運算，這樣速度就快很多，範例:
```=
var fib = [0, 1]

function fibonacci (n) {
  if (n < 0) throw Error('fibonacci:n < 0')
  //往array尋找，若查的到，直接傳回，減少運算次數，BigO = n
  if (fib[n] != null) return fib[n] 
  fib[n] = fibonacci(n - 1) + fibonacci(n - 2)
  return fib[n]
}

var startTime = Date.now()
const n = 45
console.log(`fibonacci(${n})=${fibonacci(n)}`)
console.log('fib[]=', fib)
var endTime = Date.now()
var milliSeconds = endTime - startTime
console.log(`time:${milliSeconds}ms`)
```
**BigO = n**
```
sky@MSI MINGW64 ~/Desktop/VSCode  (GITHUB)/軟體工程演算法/sa/alg/01-tableLookup/fiboanacci (master)
$ deno run fibonacci_lookup.js 
fibonacci(45)=1134903170
fib[]= [
          0,          1,         1,         2,
          3,          5,         8,        13,
         21,         34,        55,        89,
        144,        233,       377,       610,
        987,       1597,      2584,      4181,
       6765,      10946,     17711,     28657,
      46368,      75025,    121393,    196418,
     317811,     514229,    832040,   1346269,
    2178309,    3524578,   5702887,   9227465,
   14930352,   24157817,  39088169,  63245986,
  102334155,  165580141, 267914296, 433494437,
  701408733, 1134903170
]
time:5ms
```
這樣唯一的壞處是輸出超出數值範圍，JS是使用雙經度的浮點數做表示，數字小的時候還能精準表示，一但數值變大時，數值就會產生漏洞
<br>

- 這裡再介紹一個迴圈版的fibonacci計算，速度會更快(~~呼叫跟查表還是需要時間嘛~~)，但也相對更難理解，範例:
```=
function fibonacci (n) {
  if (n===0) return 0
  if (n===1) return 1
  // f(0)=0, f(1)=1
  var fi2 = 0, fi1 = 1 
  // fi2 = f(n-2), fi1 = f(n-1)
  for (var i=2; i<=n; i++) {
    var fi = fi1+fi2
    fi2 = fi1
    fi1 = fi
  }
  return fi
}

var startTime = Date.now()
const n = 45
console.log(`fibonacci(${n})=${fibonacci(n)}`)
var endTime = Date.now()
var milliSeconds = endTime - startTime
console.log(`time:${milliSeconds}ms`)
```
**BigO = n**
```
sky@MSI MINGW64 ~/Desktop/VSCode  (GITHUB)/軟體工程演算法/sa/alg/01-tableLookup/fiboanacci (master)
$ deno run fibonacci_loop.js 
fibonacci(45)=1134903170
time:1ms
```