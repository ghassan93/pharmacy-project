import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  showMessages = false;
  errors$: Observable<string[]> | undefined;

  constructor(public messageService: MessagesService) {}

  ngOnInit(): void {
    this.errors$ = this.messageService.errors$.pipe(
      tap(() => (this.showMessages = true))
    );

  }

  onClose() {
    this.showMessages = false;
  }
}
