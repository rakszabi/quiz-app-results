import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionsCollection: AngularFirestoreCollection<Question>;
  questions: Observable<Question[]>;
  questionDoc: AngularFirestoreDocument<Question>;

  constructor(public afs: AngularFirestore) {
    this.questionsCollection = this.afs.collection('questions', ref => ref.orderBy('order', 'asc'));

    this.questions = this.questionsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Question;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getQuestions() {
    return this.questions;
  }
}
