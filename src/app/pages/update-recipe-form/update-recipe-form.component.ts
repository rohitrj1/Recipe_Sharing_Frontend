import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RecipeService } from '../../services/recipeService/recipe.service';

@Component({
  selector: 'app-update-recipe-form',
  standalone: true,
  imports: [MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatRadioModule
],
  templateUrl: './update-recipe-form.component.html',
  styleUrl: './update-recipe-form.component.scss'
})
export class UpdateRecipeFormComponent {

  recipeItem:any={
    title:"",
    description :" ",
    foodType :"",
    image:"",

  }

  constructor(private recipeService:RecipeService,
    private dialogRef: MatDialogRef<UpdateRecipeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  onSubmit(){
    // console.log(this.recipeItem)
    this.recipeService.updateRecipes(this.recipeItem).subscribe({
      next:data=>console.log("data",data),
      error: error=>console.log("error" , error)
    })
    // console.log("values",this.recipeItem)
    this.dialogRef.close();
  }

  ngOnInit(){
    console.log(this.data)
    this.recipeItem = this.data
  }

}
