export interface Comment {
    commentId: string,
    comment: string,
    userId: string,
    username: string,
    profilePicture: string,
    questionId: string,
    answerId: string,
    parent: string,
    date: number,
    lastEdited: number
}