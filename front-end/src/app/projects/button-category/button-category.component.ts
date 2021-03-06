import { Component, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-button-category',
  templateUrl: './button-category.component.html',
  styleUrls: ['./button-category.component.scss'],
})
export class ButtonCategoryComponent {
  @Input()
  public route: string;

  @Input()
  public category: Category;
}
