import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicRouterModule } from './public.routes';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MarkdownPipe } from 'app/markdown.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    PublicRouterModule
  ],
  declarations: [
    LandingPageComponent,
    MarkdownPipe
  ],
  providers: [
    
  ],
})

export class PublicModule { }
