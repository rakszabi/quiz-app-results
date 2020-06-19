import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Answer } from '../models/answer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  answersCollection: AngularFirestoreCollection<Answer>;
  answers: Observable<Answer[]>;
  answerDoc: AngularFirestoreDocument<Answer>;

  constructor(public afs: AngularFirestore) {
    this.answersCollection = this.afs.collection('answers', ref => ref.orderBy('name', 'asc'));

    this.answers = this.answersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Answer;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getAnswers() {
    return this.answers;
  }
}
