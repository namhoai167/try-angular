import { Injectable } from '@angular/core';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private messageService: MessageService) { }
}
