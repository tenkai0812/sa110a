# Devide(BDD)
## BDD介紹
BDD(Behaviour-Driven Development)BDD 的重要精神在於能更有效地發現問題、方便協作和示範。<BR>
BDD 比 TDD 更進一步，在寫測試前先寫測試規格書。這份測試規格會用更接近人類語意的自然語言來描述軟體功能和測試案例。而且這份規格不是單純的敘述文件，而是一份「可以被執行的規格」，也就是可以被轉成自動化測試。
## Feature
```
Feature:Divide two numbers

    Scenario: computation
    When I get user report two numbers
    Then show the first number devide the second one
```
## Test Result
```
sky@MSI MINGW64 ~/Desktop/VSCode  (GITHUB)/軟體工程演算法/sa110a/homework/se/lodash/devide (master)
$ deno test .
running 1 test from file:///C:/Users/sky/Desktop/VSCode%20%20(GITHUB)/%E8%BB%9F%E9%AB%94%E5%B7%A5%E7%A8%8B%E6%BC%94%E7%AE%97%E6%B3%95/sa110a/homework/se/lodash/devide/test/devide_test.js
test devide ... ok (10ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (39ms)
```
## Result
```
sky@MSI MINGW64 ~/Desktop/VSCode  (GITHUB)/軟體工程演算法/sa110a/homework/se/lodash/devide (master)
$ deno run ./example/ex1.js 
_.devide(6, 4)= 1.5
```