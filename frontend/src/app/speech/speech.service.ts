// Service created for speech to text and text to speech
import { Injectable } from '@angular/core';
import Speech from 'speak-tts';
import {Observable, from} from 'rxjs';
import { RxSpeechRecognitionService, resultList } from '@kamiazya/ngx-speech-recognition';

import { tap, map } from 'rxjs/operators';

export interface SpeechListeners {
  onstart: () => void,
  onend: () => void,
  onremuse: () => void,
  onboundary: (event: any) => void
}

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private speech: any;
  public onInitialize: Observable<any>;

  constructor(
    private recognizer: RxSpeechRecognitionService
  ) {
    try {
      this.speech = new Speech();
      this.onInitialize = from(this.speech.init({
        volume: 1,
        lang: 'en-GB',
        rate: 1,
        pitch: 1,
        voice: 'Google UK English Male',
        splitSentences: true,
      })).pipe(
        tap((data) => console.log('speech engine initialized: ', data))
      );
    } catch (error) {
      console.error(error);
    }
  }
  public speak(text: string, queue?: boolean, listeners?: SpeechListeners): Observable<void> {
    return <any>from(this.speech.speak({
      text: text,
      queue: queue || true,
      listeners: listeners || {
        onend: () => {} // ON END LISTNER SHOULD ALWAYS BE SET TO
      }
    }));
  }

  public listen(): Observable<string> {
    return this.recognizer.listen().pipe(
      resultList,
      map((list: SpeechRecognitionResultList) => list.item(0).item(0).transcript)
    )
  }
}
