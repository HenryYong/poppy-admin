/**
 * 将时间字符串转成毫秒值
 * @param {String} str
 */
export function convertStrToTime (str) {
    let num = +str

    if (!num && num !== 0) {
        return 0
    }

    return num
}

/**
 * 将毫秒值转换成指定的时间格式
 * @param {Number} ms
 */
export function formatTime (ms) {
    let date = new Date(ms)

    if (!date) return ''

    return `${date.getFullYear()}-${prezero(date.getMonth() + 1)}-${prezero(date.getDate())} ${prezero(date.getHours())}:${prezero(date.getMinutes())}:${prezero(date.getSeconds())}`
}

/**
 * 给小于10的数字前面加0
 * @param {Number} num
 */
export function prezero (num) {
    let $num = +num

    if (isNaN($num)) return 0

    if ($num < 10) {
        return `0${$num}`
    } else {
        return $num
    }
}

export function isObject (obj) {
    return obj !== null && Object.prototype.toString.call(obj).toLowerCase() === '[object object]'
}

/**
 * 合并模块
 * @param {Object} modules
 */
export function mergeModules (...modules) {
    return modules.reduce((merged, curModule) => {
        Object.keys(curModule).map(key => {
            if (isObject(merged[key]) && isObject(curModule[key])) {
                Object.assign(merged[key], curModule[key])
            }
        })

        return merged
    })
}
