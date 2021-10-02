# WEEK2 
## 查表法
由上個禮拜BigO的探討，我們知道將coding由繁化簡是件佳事，但要如何做到由繁化簡呢，這裡介紹一個方式:**查表法**
 ## 費氏數列 
- [費氏數列](./fibonacci.md)
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
* **BigO = n^2**
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
* **BigO = n** ，若此處查表查的並非是array而是tree的話，此時**BigO = nlogn**
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
* **BigO = n**
```
sky@MSI MINGW64 ~/Desktop/VSCode  (GITHUB)/軟體工程演算法/sa/alg/01-tableLookup/fiboanacci (master)
$ deno run fibonacci_loop.js 
fibonacci(45)=1134903170
time:1ms
```

## 巴斯卡三角形
* 這裡繼續介紹[巴斯卡三角形](./巴斯卡.md)，巴斯卡三角形最重要的組合恆等式:
<img src = '.\巴斯卡三角恆等式.PNG'>這裡示範範例:

```=
function c(n, k) {
  if (k==0 || k==n) return 1
  //數學計算
  return c(n-1, k) + c(n-1, k-1)
}

console.log("c(5,2)=", c(5,2))
console.log("c(7,3)=", c(7,3))
console.log("c(12,5)=", c(12,5))
console.log("c(60,30)=", c(60,30))
```
* **BigO = 2^n**
```
sky@MSI MINGW64 ~/Desktop/VSCode  (GITHUB)/軟體工程演算法/sa/alg/01-tableLookup/combinatorial (master)
$ deno run CnkR.js
c(5,2)= 10
c(7,3)= 35
c(12,5)= 792

```
由輸出結果可以發現，最後的C60取30計算過程太過龐大，因此電腦沒輸出出來。
<br>

* 我們再次查表法，讓每次的運算結果回傳到陣列中做儲存，每次要計算前先查陣列中是否有答案，若沒有，才繼續做運算。
```=
//C為一個陣列
var C = []

function c(n, k) {
  //空陣列設定
  if (C[n] == null) C[n] = []
  //查表輸出
  if (C[n][k] != null) return C[n][k]
  if (k==0 || k==n)
    C[n][k] = 1
    //若上面都沒成立，進行運算
  else 
    C[n][k] = c(n-1,k) + c(n-1, k-1)
    //回傳陣列
  return C[n][k]
}

console.log("c(5,2)=", c(5,2))
console.log("C=", C);
console.log("c(7,3)=", c(7,3))
console.log("c(12,5)=", c(12,5))
console.log("c(60,30)=", c(60,30))

/*
https://en.wikipedia.org/wiki/Binomial_coefficient

def binomialCoefficient(n, k):
    if k < 0 or k > n:
        return 0
    if k > n - k: # take advantage of symmetry
        k = n - k
    if k == 0 or n <= 1:
    	return 1
    return binomialCoefficient(n-1, k) + binomialCoefficient(n-1, k-1)
*/
```
* **BigO = n**
```
sky@MSI MINGW64 ~/Desktop/VSCode  (GITHUB)/軟體工程演算法/sa/alg/01-tableLookup/combinatorial (master)
$ deno run CnkRLookup.js 
c(5,2)= 10
C= [
  <1 empty item>,
  [ 1, 1 ],
  [ 1, 2, 1 ],
  [ 1, 3, 3 ],
  [ <1 empty item>, 4, 6 ], 
  [ <2 empty items>, 10 ]   
]
c(7,3)= 35
c(12,5)= 792
c(60,30)= 118264581564861420
```
* 在介紹迴圈法，這裡有相通通病，[JS的雙精度浮點數](./bignumber.md) [無法精準運算大數值](https://dotblogs.com.tw/daniel/2018/11/10/161148)，若我們改成JS的大數值表示方式就不構成問題，先上範例:
```=
function factorial(n) {
  var p = 1
  for (let i=1; i<=n; i++) {
    p = p * i;
  }
  return p
}

function c(n, k) {
  return factorial(n) / (factorial(k)*factorial(n-k))
}

console.log("c(5,2)=", c(5,2))
console.log("c(7,3)=", c(7,3))
console.log("c(12,5)=", c(12,5))
console.log("c(60,30)=", c(60,30))
```
* **BigO = n**
```
sky@MSI MINGW64 ~/Desktop/VSCode  (GITHUB)/軟體工程演算法/sa/alg/01-tableLookup/combinatorial (master)
$ deno run Cnk.js 
c(5,2)= 10
c(7,3)= 35
c(12,5)= 792
c(60,30)= 118264581564861470

```
這裡看到最後一個運算跟查表法運算出來的數值不相同，這裡就可以看到JS的問題，修改方式及改成[大數值](ttps://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/BigInt)即可













<br><br><br><br><br>
🖊️ver:1.00