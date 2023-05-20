import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ViewTopicPageRoutingModule } from './view-topic-routing.module';
import { ViewTopicPage } from './view-topic.page';

describe('ViewTopicPage', () => {
  let component: ViewTopicPage;
  let fixture: ComponentFixture<ViewTopicPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ViewTopicPage],
      imports: [IonicModule.forRoot(), ViewTopicPageRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
