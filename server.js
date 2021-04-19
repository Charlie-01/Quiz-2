var path = require('path');

var express = require('express');
var app = express();

const fetch = require('node-fetch');

const API_KEY = "5d2a1342f3msh69bb3fdca3256e2p118c95jsn6526148fe77d";

app.use(express.json());



// api call functions, the first 2 also need to call the search cocktail by id api
async function make_Ingredient_API_call(ingredients){
    // add the "%2C" between ingredients for the correct pathname
    var arr = ingredients.split(' ');
    var ingredients2 = arr.join("%20");

    var arr2 = ingredients2.split(',');
    var ingredientList = arr2.join("%2C");

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5d2a1342f3msh69bb3fdca3256e2p118c95jsn6526148fe77d',
            'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
            useQueryString: true
        }
    };
    var result = await fetch('https://the-cocktail-db.p.rapidapi.com/filter.php?i=' + ingredientList, options);
    return result.json();
}

// random
async function make_Random_API_call(){
    console.log("hi");
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5d2a1342f3msh69bb3fdca3256e2p118c95jsn6526148fe77d',
            'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
            useQueryString: true
        }
    };
    var result = await fetch('https://the-cocktail-db.p.rapidapi.com/random.php', options);
    return result.json();
}


// extra call that is necessary from cocktail id, to cocktail details
async function make_Id_API_call(id){
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5d2a1342f3msh69bb3fdca3256e2p118c95jsn6526148fe77d',
            'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
            useQueryString: true
        }
    };
    var result = await fetch('https://the-cocktail-db.p.rapidapi.com//lookup.php?i=' + id, options);
    return result.json();
}




// call the api calls from api.service.ts (api call drivers)
app.get('/v1/byingredient/:search', async function(req, res) {
    var ret = await make_Ingredient_API_call(req.params.search);
    console.log(ret);
    return res.json(ret);
});

app.get('/v1/byid/:search', async function(req, res) {
    var ret = await make_Id_API_call(req.params.search);
    console.log(ret);
    return res.json(ret);
});

app.get('/v1/random/:search', async function(req, res) {
    var ret = await make_Random_API_call();
    console.log(ret);
    return res.json(ret);
});

app.get('/v1/random', async function(req, res) {
    var ret = await make_Random_API_call();
    console.log(ret);
    return res.json(ret);
});
 
// errors
// app.all('/v1/*', function(req, res) {
//     return res.json({"error": "API route does not exist."});
// });

// app.get(/(.*?)/, function(req, res) {
//     return res.sendFile('404.html', { root: path.join(__dirname, 'public') });
// });

// app.all(/(.*?)/, function(req, res) {
//     return res.json({"error": "URL is not valid."});
// });


app.use(express.static(path.join(__dirname, './cocktails/dist/cocktails')));
app.listen(3000);
console.log("App listening at localhost:3000");