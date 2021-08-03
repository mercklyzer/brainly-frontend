export interface Answer {
    answerId: string,
    answer: string,
    questionId: string,
    question: string,
    subject: string,
    userId: string,
    username: string, 
    profilePicture: string,
    date: number,
    lastEdited: number,
    isBrainliest: number,
    isAnswer: number,
    thanksCtr: number,
    isUserThanked: number
}