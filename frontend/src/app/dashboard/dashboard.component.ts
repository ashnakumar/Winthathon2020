import { Component, NgZone } from '@angular/core';
import { SpeechService } from '../speech/speech.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private speech: SpeechService,
    private router: Router,
    private zone: NgZone
  ) { }

  // Button to start voice control app
  startFlow() {
    this.speech.onInitialize.subscribe(() => {
      this.speech.speak('Say children to go to the child section or blind to go to the blind section')
        .subscribe(() => {
          this.speech.listen()
            .subscribe(text => {
              this.zone.run(() => {
                switch(text) {
                  case 'children': {
                    // navigate to children
                    break;
                  }
                  case 'blind': {
                    // navigate to blind
                    this.router.navigate(['posts']);
                    break;
                  }
                }
              });
            });
        });
    });
  }
}

