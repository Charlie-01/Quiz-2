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

  // array to hold the name, image, ingredients, measurements, instructions, glass
  displayItems:Array<string> = [];

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
  }


  // do smth based on form selection
  public onOptionSelected(value:string){  
    this.option = value;  
    if(this.option === "random"){
      this.makeAPICall(); 
    }
  }


  // do smth based on form selection  THIS DOESNT WORK YET
  public onSearchSelected(value:string){  
    console.log("got search");
    // add form shit here
    this.search = value;
    this.makeAPICall(); 
  }


  private setDisplay(item:string) {
    this.displayItems.push(item);
  }



  // on api response
  private onAPIResponse(data:any) {
    this.setDisplay(data.drinks[0].strDrink); //name
    this.setDisplay(data.drinks[0].strImageSource); //image

    // only get not null ingredients, im not sure this way of variable works tho
    var ingnum= "strIngredient1";
    var count = 1;
    while(data.drinks[0].ingnum != null){
      this.setDisplay(data.drinks[0].ingnum); //ingredients
      count= count+1;
      ingnum = "strIngredient" + count.toString();
    }

    // only get not null measurements, im not sure this way of variable works tho
    var meanum= "strMeasure1";
    var count = 1;
    while(data.drinks[0].meanum != null){
      this.setDisplay(data.drinks[0].ingnum); //measurements
      count= count+1;
      meanum = "strMeasure" + count.toString();
    }


    this.setDisplay(data.drinks[0].strInstructions); //instructions
    this.setDisplay(data.drinks[0].strGlass); //glass

    // if(data.hasOwnProperty("definitions")) {
    //   this.displayedOption = "Definition: ";
    //   this.errorState = false;
    //   if(data.definitions.length === 0) {
    //     this.setDisplay("No definition found for selected word.");
    //   } else {
    //     this.setDisplay(data.definitions[0].definition);
    //   }
    // }
    //   else {
    //   this.errorState = true;
    //   this.displayedOption = "Error: ";
    //   if(data.hasOwnProperty("error")) {
    //     this.setDisplay(data.error);
    //   } else if(data.hasOwnProperty("success") && !data.success) {
    //     this.setDisplay("Word not found.");
    //   } else {
    //     this.setDisplay("An unknown error has occured.");
    //   }
    // }
  }




  // make the api call
  public makeAPICall(): void {

    this.setDisplay("Waiting for API response...");

    this.apiService.getRecipe(this.option, this.search).subscribe((data) => {
      this.onAPIResponse(data);
    });

  }

}