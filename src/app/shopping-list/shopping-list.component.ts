import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChanges: Subscription;

  constructor(private sLService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.sLService.getIngredients();
    this.igChanges = this.sLService.ingredientsChange.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.sLService.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.igChanges.unsubscribe();
  }
}
