import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:9009'

  constructor(private http:HttpClient) { }

  recipeSubject = new BehaviorSubject<any>({
    recipes:[],
    loading:false,
    newRecipe:null
  });


  private getHeaders():HttpHeaders{
    const token = localStorage.getItem("jwt");
    return new HttpHeaders({
      Authorization :`Bearer ${localStorage.getItem("jwt")}`
    })
  }

  getRecipes():Observable<any>{
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/api/recipe`,{headers}).pipe(
    tap((recipes)=>{
      console.log(recipes);
      const currentState  =this.recipeSubject.value;
      this.recipeSubject.next({...currentState,recipes
      });
    })
    );
  }

  createRecipes(recipes:any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/api/recipe`,recipes,{headers}).pipe(
    tap((newrecipe)=>{
      const currentState  =this.recipeSubject.value;
      this.recipeSubject.next({...currentState,
        recipes:[newrecipe,...currentState.recipes]
      });
    })
    );
  }


  updateRecipes(recipes:any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/api/recipe/${recipes.id}`,recipes,{headers}).pipe(
    tap((updatedRecipe:any)=>{
      const currentState  =this.recipeSubject.value;
      const updatedRecipes = currentState.recipes.map((item:any)=>
        item.id === updatedRecipe.id ? updatedRecipe : item
      )
      this.recipeSubject.next({...currentState,
        recipes:updatedRecipes
      });
    })
    );
  }


  likeRecipes(id:any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/api/recipe/${id}/like`,{headers}).pipe(
    tap((updatedRecipe:any)=>{
      const currentState  =this.recipeSubject.value;
      const updatedRecipes = currentState.recipes.map((item:any)=>
        item.id === updatedRecipe.id ? updatedRecipe : item
      )
      this.recipeSubject.next({...currentState,
        recipes:updatedRecipes
      });
    })
    );
  }

  deleteRecipes(id:any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/api/recipe/${id}`,{headers}).pipe(
    tap((deletedRecipe:any)=>{
      const currentState  =this.recipeSubject.value;
      const deletedRecipes = currentState.recipes.filter((item:any)=>
        item.id !==  id
      );
      this.recipeSubject.next({...currentState,
        recipes:deletedRecipes
      });
    })
    );
  }




}
