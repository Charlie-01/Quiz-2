import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private httpClient: HttpClient) { }

//   the option is either: random, byCocktail, byIngredient, this calls the server.js
  public getRecipe(option:string, search:string) {
    return this.httpClient.get("/v1/" + option + "/" + search, {responseType: "json"});
  }
}