import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../loggin.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
