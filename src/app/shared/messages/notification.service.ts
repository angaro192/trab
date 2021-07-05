import { EventEmitter } from "@angular/core";
import { Message } from "./snackbar/message.model";

export class NotificationService {
  notifier = new EventEmitter<Message>()

  notify(message: Message) {
    this.notifier.emit(message);
  }
}