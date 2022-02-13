import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f') sLForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private sLService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.sLService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.sLService.getIngredient(this.editedItemIndex);
        this.sLForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form);
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;

    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.sLService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.sLService.addIngredient(ingredient);
    }
    this.editMode = false;
    this.sLForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onClear() {
    this.editMode = false;
    this.sLForm.reset();
  }
  onDelete() {
    if (this.editMode) {
      this.sLService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
  }
}
