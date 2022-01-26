import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopicCloudComponent } from './components/topic-cloud/topic-cloud.component';
import { TopicStyleDirective } from './directives/topic-style.directive';
import { TopicInfoComponent } from './components/topic-info/topic-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicCloudComponent,
    TopicStyleDirective,
    TopicInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
