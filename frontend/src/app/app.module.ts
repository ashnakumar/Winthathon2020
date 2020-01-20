import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PostsComponent } from './posts/posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpeechRecognitionModule, RxSpeechRecognitionService} from '@kamiazya/ngx-speech-recognition';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: false,
      continuous: false
    })
  ],
  providers: [RxSpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
