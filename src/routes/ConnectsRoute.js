const MessageModel = require("../model/MessageModel");
const yup = require("yup");

const messageSchema = yup.object().shape({
    senderId: yup.number().required(),
    reciverId: yup.number().required(),
    message: yup.string().required(),
});

module.exports = function (io) {
    // notification controller
    function NotificationHandler(notificationTxt = "") {
        io.emit("notification", [
            { id: 1, text: notificationTxt },
        ]);
    }
    // message apies
    io.on("connection", (socket) => {
        // all messages 
        
        // send api
        socket.on("send", async ({id, value}) => {
            try {
                // validate new message
                const messageData = await messageSchema.validate({
                    senderId: 1,
                    reciverId: 2,
                    message: value,
                });
                // store new message
                const newMsgDb = await MessageModel.create(messageData);
                // send the reply to the other user
                io.emit("recived", {
                    msgid: newMsgDb.dataValues?.id,
                    message: newMsgDb.dataValues?.message,
                });
                // send notification
                NotificationHandler('Message send');
            } catch (error) {
                console.log(error);
            }
        });
        // delete
        socket.on("delete", async ({id}) => {
            try {
                // delete message
                const deleteMessage = await MessageModel.destroy({
                    where: {
                        id: id,
                    },
                });
                // notification 
                NotificationHandler('Message deleted');
            } catch (error) {
                console.log(error);
            }
        });
        // update message 
        socket.on('update', async ({ id, value }) => {
            console.log(value)
            try {
                // find and update 
                const dbData = await MessageModel.update({
                    message: value
                }, {
                    where: {
                        id: id
                    }
                })
                console.log('updated data', dbData);
                // notification 
                NotificationHandler('Data updated');
            } catch (error) {
                
            }
        })
    });
};
