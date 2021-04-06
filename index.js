// require your server and launch it here
const server = require("./api/server")

const port = require(5000)

server.listen(port, () => {
    console.log("server listening on port 5000")
})