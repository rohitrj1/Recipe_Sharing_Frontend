import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { RecipeService } from '../../services/recipeService/recipe.service';


@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatRadioModule

  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {

  recipeItem:any={
    title:"",
    description :"",
    foodType :"",
    image:"",

  }

  constructor(private recipeService :RecipeService){}

  onSubmit(){
    console.log("values",this.recipeItem);
    this.recipeService.createRecipes(this.recipeItem).subscribe(
      {
        next:data=>console.log("created recipe ",data),
        error:error=>console.log("error",error)

      }
    )
  }

}
