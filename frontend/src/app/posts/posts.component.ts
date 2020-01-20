import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IPost } from './post.model';
import { PostsService } from './posts.service';
import { FormGroup, FormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SpeechService } from '../speech/speech.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: IPost[] = [];
  searchForm: FormGroup = new FormGroup({
    searchQuery: new FormControl("")
  });

  listenFlag = true;
  private subscription: Subscription;
// To access mic button using code
  @ViewChild('mic', {read: ElementRef, static:true})
  public mic: ElementRef;
  constructor(
    public postsService: PostsService,
    private speech: SpeechService,
    private zone: NgZone) {}

// Initializes as soon as page loads
  ngOnInit() {
    // there is no need to specify the type of argument of arrow functions
    // as they are iffered from return type of observable hower over posts
    // and vs code will show the type
    this.postsService.getPosts().subscribe(posts => this.posts = posts);
    this.speech.speak('Say search to start searching')
      .subscribe(() => {
        this.speech.listen()
          .subscribe(text => {
            this.zone.run(() => {
              switch(text) {
                case 'search': {
                  let el: HTMLElement = this.mic.nativeElement;
                  el.click()
                  console.log('here')
                  break;
                }
              }
            });
          });
      });
  }

  // Search query
  search(query?: string) {
    this.postsService
    .searchPosts(query || this.searchForm.value.searchQuery)
    .subscribe(posts => {
      this.posts = posts;
    });
  }

  // User speech to text
  listen() {
    if (this.listenFlag) {
      this.speech.speak('Say what you want to search').subscribe(() =>{
        this.subscription = this.speech.listen().subscribe(
          text => {
            this.zone.run(() => {
              this.search(text);
              this.searchForm.setValue({
                searchQuery: text
              });
            });
          }
        )
      });
    } else {
      this.subscription.unsubscribe();
    }
    this.listenFlag = !this.listenFlag;
  }
}
