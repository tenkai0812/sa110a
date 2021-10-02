/**
 * 
 * @param {String} x 
 * @param {String} y 
 */
 const add = (x = '', y = '') => {
    if (Number.isNaN(Number(x)) || Number.isNaN(Number(y))) return x + y // 当一个或多个为非数字，直接拼接字符串

    if (typeof x === 'boolean' || x === null) x = Number(x).toString() // 当x为boolean类型或者null时，转换为其对应的数值
    if (typeof y === 'boolean' || y === null) y = Number(y).toString() // 当y为boolean类型或者null时，转换为其对应的数值

    let calMethood = true // 运算方式，true为加法运算，false为减法运算（一正一负时需要减法运算）
    let allAegative = false // 是否需要给结果添加负号，true需要，false不需要
    let sum = '' // 和，字符串加减，所以定义为空串
    let flag = 0 // 进位标志，加法：当当前位计算大于9时，需要进位，加法进位只可能为0或1，减法：当当前位计算被减数不够减时，需要借位，减法借位只可能为0或-1

    // 为了方便一正一负时的减法计算，将x和y存为默认的减数与被减数
    let subtracted = x // 被减数，默认为x
    let minus = y // 减数，默认为y

    if (x.includes('-') && y.includes('-')) { // 全是负数时，计算方法同全正数计算，只需要在最后的结果将负号加上即可，所以在此处将负号删去
        allAegative = true
        calMethood = true
        subtracted = x.split('-')[1]
        minus = y.split('-')[1]
    } else if (x.includes('-') || y.includes('-')) { // x为负数或y为负数时,执行减法运算,绝对值小的为减数
        // 减法运算总是大的减小的
        calMethood = false
        let tempX = x.split('-')[0] ? x.split('-')[0] : x.split('-')[1]
        let tempY = y.split('-')[0] ? y.split('-')[0] : y.split('-')[1]
        if (+tempX > +tempY) {
            subtracted = tempX
            minus = tempY
            allAegative = x.includes('-')
        } else { // 默认为x - y，如果改为y - x需要给结果添加负号
            subtracted = tempY
            minus = tempX
            allAegative = y.includes('-')
        }
    }

    // todo：计算过程

    return Number(x) + Number(y)
}