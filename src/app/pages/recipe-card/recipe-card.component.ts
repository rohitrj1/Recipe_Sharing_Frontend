import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { UpdateRecipeFormComponent } from '../update-recipe-form/update-recipe-form.component';
import { RecipeService } from '../../services/recipeService/recipe.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatIconModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  @Input() recipe :any

  userId :any
  constructor(public dialog : MatDialog,private recipeService :RecipeService){
    this.userId = parseInt(localStorage.getItem('id')!)
  }

handleOpenEditRecipe(){
  this.dialog.open(UpdateRecipeFormComponent,{
    data:this.recipe
  });
}

handleLikeRecipe(){
  // console.log(" like for recipes ",this.recipe)
  this.recipeService.likeRecipes(this.recipe.id).subscribe({
    next :data=> console.log("likes recipes ",data),
    error : error=>console.log("error",error)

  })
}

ngOnInit(){
  // console.log("userId " , this.userId)
  // console.log("like recipes",this.recipe);
}


handleDeleteRecipe(){
  this.recipeService.deleteRecipes(this.recipe.id).subscribe();
}

isLiked(recipe:any){
  // console.log(recipe.likes.includes(this.userId))
  return recipe.likes.includes(this.userId);

}



}
