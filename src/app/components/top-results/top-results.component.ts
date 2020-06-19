import { Component, OnInit } from '@angular/core';

import { Answer } from '../../models/answer';
import { Question } from '../../models/question';
import { AnswerService } from '../../services/answer.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-top-results',
  templateUrl: './top-results.component.html',
  styleUrls: ['./top-results.component.scss']
})
export class TopResultsComponent implements OnInit {

  answers: Answer[];
  questions: Question[];
  points: {
    name: string,
    point: number
  }[] = new Array();

  constructor(
    private answerService: AnswerService,
    private questionService: QuestionService
  ) { }

  calcPoints() {
    this.answers.forEach(answer => {
      let currentPoint = 0;
      for (let i = 0; i < answer.answers.length; i++) {
        if (answer.answers[i] === this.questions[i].correctAnswer) {
          currentPoint += (10 - answer.times[i]);
        }
      }
      this.points.push({
        name: answer.name,
        point: Math.round(currentPoint * 100)
      });
    });
    console.log('Pontok');
    console.log(this.points);
  }

  ngOnInit(): void {
    this.answerService.getAnswers().subscribe(answers => {
      this.answers = answers;
      console.log(answers);
    });

    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
      console.log('Kérdések');
      console.log(questions);
    });

    // this.calcPoints();
  }

}
