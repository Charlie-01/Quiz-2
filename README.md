## Summary

Everytime I search through free APIs I come across this one called CocktailDB. I worked as a bartender when I was 16 (yes illegally) and am really drawn to the intricacies
that go into drink making and its history, chemistry, and artistry... so this API caught my eye. I chose to use the random cocktail recipe, and search by ingredient features.
I built a form that could take in the appropriate choices for these endpoints, and chose to display the image, name, ingredients, and instructions for the 
returned drink. My front-end is built in Angular. The form values are sent to Node.js then the API is called and the JSON returned to Node, which sends the data back to
the frontend where it is parsed into an array that I then use in my html. The input of the ingredient list had to be parsed aswell to ensure it could be inserted into the 
api path despite having commas and spaces. An issue I ran into was that the endpoint for the by ingredient search did not return a cocktail's recipe, but rather a list of
cocktails and their IDs which would have to be called seperately to get the recipe. I solved this by sending back an id to the frontend and sending it back
to node for another request with different parameters. I soon realized that a user may want to see random drinks with "orange juice" rather than the code simply choosing the
first one from the initial list of IDs, so I randomized that aswell. 




## Experience

I really enjoyed this assignment. I think I lacked a lot of confidence in what I was doing this semester because this was all so new. Doing the labs often felt like 
I was faking my abilities, just following steps and not really comfortable with what I was doing. Building this site from scratch helped me feel a lot more comfortable
and made me realize that I actually know more than I thought and to trust myself rather than panic at foreign concepts.

## Use Notes

The input for the ingredients should be "orange juice,lime" - no space after the comma.

In some cases the API response is just a little too slow for the site, and ingredients (the last thing I pull from the JSON) will not appear.
I had no idea how to fix this, so if this happens just reload, try a new search or the same one. It happens rarely.

The ingredients was a really inefficient part of the returned JSON. Each ingredient was stored in its own strIngredient1.. etc. There was no way for me to loop through it
so I took the first six ingredients from the JSON. There is a chance that a recipe requires more than 6.

When searching by ingredients, please note that the API does not look for a drink with all the ingredients you listed. It returned a drink with one or more of those ingredients.






## Citations

Mostly my group's Lab 5 code

https://angular.io/guide/forms

https://stackblitz.com/angular/odmdkegvgkg?file=src%2Fapp%2Fhero-form%2Fhero-form.component.html

https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_input_value

https://www.w3schools.com/howto/howto_js_sidenav.asp

https://stackoverflow.com/questions/7995080/html-if-image-is-not-found

https://stackoverflow.com/questions/29884654/button-that-refreshes-the-page-on-click

W3/Stackoverflow in general, assuming I may have forgotten to write some specific ones down while coding
