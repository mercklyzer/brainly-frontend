import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/question.model';
import { QuestionService } from '../question.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // subjects:{subject:string, imgSource:string, route:string}[] = [
  //   {subject: 'All', imgSource: '../assets/images/all_1.svg', route: 'all'},
  //   {subject: 'Filipino', imgSource: '../../assets/images/language.svg', route: 'filipino'},
  //   {subject: 'Math', imgSource: '../../assets/images/mathematics.svg', route: 'math'},
  //   {subject: 'Araling Panlipunan', imgSource: '../../assets/images/social_science_5_m.svg', route: 'araling-panlipunan'},
  //   {subject: 'English', imgSource: '../../assets/images/english.svg', route: 'english'},
  //   {subject: 'Science', imgSource: '../../assets/images/science.svg', route: 'science'},
  //   {subject: 'Physics', imgSource: '../../assets/images/physics.svg', route: 'physics'},
  //   {subject: 'Chemistry', imgSource: '../../assets/images/chemistry_1.svg', route: 'chemistry'},
  //   {subject: 'Biology', imgSource: '../../assets/images/biology.svg', route: 'biology'},
  //   {subject: 'History', imgSource: '../../assets/images/history.svg', route: 'history'},
  //   {subject: 'Geography', imgSource: '../../assets/images/geography_4.svg', route: 'geography'},
  //   {subject: 'Edukasyon sa Pagpapakatao', imgSource: '../../assets/images/philosophy.svg', route: 'edukasyon-sa-pagpapakatao'},
  //   {subject: 'Technology and Home Economics', imgSource: '../../assets/images/technology.svg', route: 'technology-and-home-economics'},
  //   {subject: 'Integrated Science', imgSource: '../../assets/images/science.svg', route: 'integrated-science'},
  //   {subject: 'Health', imgSource: '../../assets/images/health.svg', route: 'health'},
  //   {subject: 'Music', imgSource: '../../assets/images/music.svg', route: 'music'},
  //   {subject: 'Art', imgSource: '../../assets/images/art.svg', route: 'art'},
  //   {subject: 'Physical Education', imgSource: '../../assets/images/physical_education.svg', route: 'physical-education'},
  //   {subject: 'Religion', imgSource: '../../assets/images/religion_1.svg', route: 'religion'},
  //   {subject: 'Computer Science', imgSource: '../../assets/images/informatics.svg', route: 'computer-science'},
  //   {subject: 'World Languages', imgSource: '../../assets/images/otherlanguages.svg', route: 'world-languages'},
  //   {subject: 'Spanish', imgSource: '../../assets/images/spanish.svg', route: 'spanish'},
  // ]

  questions:Question[] = []

  routeObserver:any
  questionObserver:any
  subject:string = 'all'

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.routeObserver = this.route.params.subscribe((routeParams) => {
      // this.subject = this.titleCase(routeParams.subject)
      // console.log(this.subject);

      // subscribe to question service
      this.questionObserver = this.questionService.getQuestions(routeParams.subject).subscribe((questions) => {
        this.questions = questions.data
        console.log(this.questions);
      })
    })

  }

  titleCase(param:string):string{
    return param.split('-').map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' ')
  }

  relativeDate(time:number){
    return moment(time).fromNow()
  }

}
