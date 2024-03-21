import { Component, Input } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'juges-paper',
  templateUrl: './juges-paper.component.html',
  styleUrls: ['./juges-paper.component.scss'],
})
export class JugesPaperComponent {
  @Input() category: CategoryModel;
  @Input() pools: any[];

  constructor() {}
}
