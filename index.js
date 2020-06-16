let server = require('./api/server'); //calls in server from location

let PORT = process.env.PORT || 1123;

server.listen(PORT, () => {
    console.log(`\n == API is running at port ${PORT} == \n`)
})

