const MessageModel = require('../model/MessageModel');


module.exports = async function (io) {
    io.on("connection", (socket) => {
        console.log("socket io connected");
        socket.on("send", (message) => {
            console.log("your message => ", message);
            io.emit("recived", `your recived message is => ${message}`);
        });
    });
};
