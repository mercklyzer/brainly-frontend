import { Component, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Question } from "src/app/models/question.model";
import { User } from "src/app/models/user.model";
import { QuestionService } from "src/app/services/question.service";
import { relativeDate, titleCase } from "src/app/utils/utils";

@Component({
    selector: 'dashboard-questions',
    templateUrl: './dashboard-questions.component.html',
    styleUrls: ['./dashboard-questions.component.css']
})
export class DashboardQuestionsComponent implements OnDestroy {
    _subject!: string

    questions: Question[] = []

    private subscriptions = new Subscription()
    offset: number = 0
    requestOnProcess = false
    fetchDisable = false

    helper = {
        titleCase: titleCase,
        relativeDate: relativeDate
    }

    watchers: { questionId: string, watchers: User[] }[] = []
    newQuestions: Question[] = []
    contentLoad: boolean = false

    @Input() set subject(_subject: string) {
        this._subject = _subject
        this.offset = 0

        this.questions = []
        this.questionService.socketJoinSubject(_subject)

        this.subscriptions.add(this.questionService.getQuestions(_subject, this.offset).subscribe((questions) => {

            questions.data.forEach((question) => {
                this.questionService.socketJoinRoom(question.questionId)
            })

            this.questions = questions.data
            console.log(this.questions);
            this.requestOnProcess = false
            this.offset += 5
            this.contentLoad = true
        }))

        // accepts a new watcher and assigns to which question
        this.subscriptions.add(this.questionService.newWatchers.subscribe((newWatcher) => {
            this.watchers = this.insertWatcher(this.watchers, newWatcher)
        }))

        // for updating newly added questions
        this.subscriptions.add(this.questionService.newQuestion.subscribe((newQuestion) => {
            this.questionService.socketJoinRoom(newQuestion.questionId)
            this.newQuestions = [newQuestion].concat(this.newQuestions)
        }))
    }

    @HostListener('window:scroll', ['$event'])

    onWindowScroll() {
        // if end of the page, get new set of questions
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("end of page");
            // can use debounce on this
            console.log(!this.requestOnProcess && !this.fetchDisable && this.questions.length !== 0);
            if (!this.requestOnProcess && !this.fetchDisable && this.questions.length !== 0) {
                this.requestOnProcess = true
                console.log(this._subject, this.offset);
                this.subscriptions.add(this.questionService.getQuestions(this._subject, this.offset)
                    .subscribe((questions) => {

                        questions.data.forEach((question) => {
                            this.questionService.socketJoinRoom(question.questionId)
                        })

                        this.questions = this.questions.concat(questions.data)
                        this.requestOnProcess = false
                        this.offset += 5

                        if (questions.data.length !== 5) {
                            this.fetchDisable = true
                        }
                    },
                        (err) => {
                            console.log(err);
                        }))
            }
        }
    }

    constructor(
        private questionService: QuestionService,
    ) { }

    ngOnDestroy(): void {
        this.questionService.socketLeaveSubject(this._subject)
        this.subscriptions.unsubscribe()
    }

    insertWatcher(watchers: { questionId: string, watchers: User[] }[], watcher: { questionId: string, watchers: User[] }) {
        let index = watchers.map((el) => el.questionId).indexOf(watcher.questionId)

        // if thread exists
        if (index !== -1) {
            watchers[index] = watcher
            return watchers
        }
        else {
            return [watcher].concat(watchers)
        }
    }

    getWatcher(questionId: string) {
        let index = this.watchers?.map((el) => el.questionId).indexOf(questionId)

        if (index !== -1) {
            return this.watchers[index]
        }
        else {
            return { watchers: [] }
        }
    }

    onNewQuestions() {
        window.scroll(0, 0)
        this.questions = this.newQuestions.concat(this.questions)
        this.newQuestions = []
    }
}

