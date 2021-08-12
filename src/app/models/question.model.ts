import { User } from "./user.model";

export interface Question {
    questionId: string,
    question: string,
    image: string,
    subject: string,
    date: number,
    lastEdited: number,
    rewardPoints: number,
    askerId: string,
    username: string,
    profilePicture: string,
    hasBrainliest: number,
    answersCtr: number,
    isUserAnswered:boolean,
    watchers: User[]
}