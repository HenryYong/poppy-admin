/**
 * prod env
 * @author Henry Yang
 */

let settings = {}
const {
    stringify
} = JSON
const url = 'http://www.sephenry.cn/api'

if (process.env.NODE_ENV !== 'development') {
    settings = {
        'process.env': {
            'NODE_ENV': stringify('production')
        },
        NODE_ENV: stringify('production'),
        COMMON_AJAX_URL: stringify(url),
        AJAX_URL: stringify(`${url}/admin`),
        ADMIN_AJAX_URL: stringify(`${url}/admin`),
        CLIENT_AJAX_URL: stringify(`${url}/client`)
    }
}

export default settings
