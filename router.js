const { authToken } = require('./src/middleware/auth')
const routerMap = [
    {path: '/', fileName: './src/router/index'},
    {path: '/login', fileName: './src/router/login'},
    {path: '/user', fileName: './src/router/user', middleware:[authToken]}

]

module.exports = routerMap
