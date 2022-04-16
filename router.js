const { authToken } = require('./src/middleware/auth')
const routerMap = [
    {path: '/', fileName: './src/router/index'},
    {path: '/auth', fileName: './src/router/auth'},
    {path: '/user', fileName: './src/router/user', middleware:[authToken]}

]

module.exports = routerMap
