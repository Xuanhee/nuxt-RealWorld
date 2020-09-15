const middleware = {}

middleware['authenticated'] = require('..\\middleware\\authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['notauthenticated'] = require('..\\middleware\\notauthenticated.js')
middleware['notauthenticated'] = middleware['notauthenticated'].default || middleware['notauthenticated']

export default middleware
