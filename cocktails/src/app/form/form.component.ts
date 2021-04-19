import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  host: {class: 'col-4'}
})


export class FormComponent implements OnInit {

  // default the option to random
  option:string = 'random';
  search:string = 'random';
  gotrecipe:boolean = false;

  // array to hold the name, image, ingredients, measurements, instructions, glass
  displayItems:Array<string> = [];

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
  }


  // -------------------------------------------------------------------------------
  // SETTING VARIABLES
  //
  // these will set the option that was selected on the form
  // it will also set the search string based on what was input in the text field
  // -------------------------------------------------------------------------------


  // do smth based on form selection
  public onOptionSelected(value:string){  
    this.option = value;  
    if(this.option === "random"){
      this.makeAPICall(); 
    }
  }


  public onSearchSelected(form:any){ 
      this.search = form.controls.search.value;
      this.makeAPICall(); 
    // }
  }


  private setDisplay(item:string) {
    this.displayItems.push(item);
  }







  // -------------------------------------------------------------------------------
  // ONAPIRESPONSE
  //
  // on api response: push different parts of the returned JSON to the array "displayItems"
  // displayitems will be called on the frontend
  // -------------------------------------------------------------------------------
  private onAPIResponse(data:any) {
    if(this.option == "byingredient" && (this.gotrecipe == false)){
      this.gotrecipe = true;
      this.displayItems = [];
      var l = Object.keys(data.drinks).length;
      var index = Math.floor(Math.random() * l);
      this.makeIdAPICall("byid", data.drinks[index].idDrink);
    } else{


    this.setDisplay(data.drinks[0].strDrink); //name
    this.setDisplay(data.drinks[0].strDrinkThumb); //image

    // ingredients and measurements
    var ingstring = "";
    var done = false;
    // this.setDisplay(data.drinks[0].strIngredient1);
    if(data.drinks[0].strIngredient1 != null){
      if(data.drinks[0].strMeasure1 != null){
        ingstring = ingstring+data.drinks[0].strIngredient1+" - "+data.drinks[0].strMeasure1+", ";
      } else{
        ingstring = ingstring+data.drinks[0].strIngredient1+", ";
      }
    } 

    if(data.drinks[0].strIngredient2 != null){
      if(data.drinks[0].strMeasure2 != null){
        ingstring = ingstring+data.drinks[0].strIngredient2+" - " + data.drinks[0].strMeasure2+", ";
      }
      else{
        ingstring = ingstring+data.drinks[0].strIngredient2+", ";
      }
    } else if(done == false){
      this.setDisplay(ingstring);
      done = true;
    }

    if(data.drinks[0].strIngredient3 != null){
      if(data.drinks[0].strMeasure3 != null){
        ingstring = ingstring+data.drinks[0].strIngredient3+" - " +data.drinks[0].strMeasure3+", ";
      }
      else{
        ingstring = ingstring+data.drinks[0].strIngredient3+", ";
      }
    } else if(done == false){
      this.setDisplay(ingstring);
      done = true;
    }

    if(data.drinks[0].strIngredient4 != null){
      if(data.drinks[0].strMeasure4 != null){
        ingstring = ingstring+data.drinks[0].strIngredient4+" - " + data.drinks[0].strMeasure4+", ";
      }
      else{
        ingstring = ingstring+data.drinks[0].strIngredient4+", ";
      }
    } else if(done == false){
      this.setDisplay(ingstring);
      done = true;
    }

    if(data.drinks[0].strIngredient5 != null){
      if(data.drinks[0].strMeasure5 != null){
        ingstring = ingstring+data.drinks[0].strIngredient5+" - " + data.drinks[0].strMeasure5+", ";
      }
      else{
        ingstring = ingstring+data.drinks[0].strIngredient5+", ";
      }
    } else if(done == false){
      this.setDisplay(ingstring);
      done = true;
    }

    if(data.drinks[0].strIngredient6 != null){
      if(data.drinks[0].strMeasure6 != null){
        ingstring = ingstring+data.drinks[0].strIngredient6+" - " +data.drinks[0].strMeasure6+", ";
      }
      else{
        ingstring = ingstring+data.drinks[0].strIngredient6+", ";
      }
    } else if(done == false){
      this.setDisplay(ingstring);
      done = true;
    }




    this.setDisplay(data.drinks[0].strInstructions); //instructions
    this.setDisplay(data.drinks[0].strGlass); //glass

   }

  }





  // -------------------------------------------------------------------------------
  // MAKEAPICALL
  //
  // making the api call, initially the display has "waiting" in the first spot
  // displayItems[0]
  // then calls api service get recipe which sends the request to server.js
  // the JSON it gets then gets sent to onAPIResponse()
  // -------------------------------------------------------------------------------

  public makeAPICall(): void {

    this.setDisplay("Waiting for API response...");

    this.apiService.getRecipe(this.option, this.search).subscribe((data) => {
      this.onAPIResponse(data);
    });

  }

  public makeIdAPICall(option:string, search:string): void {

    this.setDisplay("Waiting for API response...");

    this.apiService.getRecipe(option, search).subscribe((data) => {
      this.onAPIResponse(data);
    });

  }

}