export interface Message {
    messageId:string,
    threadId: string,
    senderId: string,
    senderUsername:string,
    senderProfilePicture:string,
    receiverId: string,
    receiverUsername:string,
    receiverProfilePicture:string,
    message:string,
    date:number
}