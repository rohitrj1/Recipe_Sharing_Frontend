import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog} from '@angular/material/dialog';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/Auth/auth.service';
import { RecipeService } from '../../services/recipeService/recipe.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RecipeCardComponent,
    MatIconModule,
    RecipeFormComponent,
    MatButtonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  recipes:any=[1,1,1,1,1];

  constructor(public dialog :MatDialog,public authService : AuthService,
    private recipeService : RecipeService){}

  handleOpenRecipeForm(){
    this.dialog.open(RecipeFormComponent);

  }

  ngOnInit(){
    this.authService.getUserProfile();
    this.recipeService.getRecipes();
    this.recipeService.recipeSubject.subscribe(
      (state)=>{
        console.log("state" , state);
        this.recipes = state.recipes
      }
    )
  }

}
