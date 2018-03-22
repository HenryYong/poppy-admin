/**
 * dev env
 * @author Henry Yang
 */

const {
    stringify
} = JSON
const url = 'http://dev.sephenry.cn:8000/api'

export default {
    'process.env': {
        'NODE_ENV': stringify('dev')
    },
    NODE_ENV: stringify('dev'),
    COMMON_AJAX_URL: stringify(url),
    AJAX_URL: stringify(`${url}/admin`),
    ADMIN_AJAX_URL: stringify(`${url}/admin`),
    CLIENT_AJAX_URL: stringify(`${url}/client`)
}
