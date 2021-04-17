var path = require('path');

var express = require('express');
var app = express();

const fetch = require('node-fetch');

const API_KEY = "5d2a1342f3msh69bb3fdca3256e2p118c95jsn6526148fe77d";

app.use(express.json());


make_Ingredient_API_call = async function(ingredients){
    // add the "%2C" between ingredients for the correct pathname
    var arr = ingredients.split(',');
    var ingredientList = arr.join("%2C");

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5d2a1342f3msh69bb3fdca3256e2p118c95jsn6526148fe77d',
            'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
            useQueryString: true
        }
    };
    var result = await fetch('the-cocktail-db.p.rapidapi.com/filter.php?i=' + ingredientList, options);
    return result.json();
}


// async function make_urban_dictionary_call(word) {
//     const options = {
//         method: 'GET',
//         headers: {
//             "x-rapidapi-key": "8506fed3c6msh4e98a205d27d295p1408cajsn52583242d8cd",
//             "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
//             "useQueryString": true
//         }
//     };
//     var result = await fetch('https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' + word, options);
//     return result.json();
// }

// // spellcheck call
// async function make_spellcheck_call(word) {
//     const options = {
//         method: 'GET',
//         headers: {
//             'x-rapidapi-key': '5d2a1342f3msh69bb3fdca3256e2p118c95jsn6526148fe77d',
//             'x-rapidapi-host': 'bing-spell-check2.p.rapidapi.com',
//             useQueryString: true
//         }
//     };
//     var result = await fetch('https://bing-spell-check2.p.rapidapi.com/spellcheck?mode=spell&text=' + word, options);
//     // console.log(result)
//     return result.json();
// }

// // rhyme call
// async function make_rhyme_call(word) {
//     const options = {
//         method: 'GET'
//     };
//     // var result = await fetch("https://api.datamuse.com/words?sl=" + word, options); // OLD API
//     var result = await fetch("https://rhymebrain.com/talk?function=getRhymes&word=" + word, options); 
//     return result.json();
// }

// async function make_spell_similar(word) {
//     const options = {
//         method: 'GET'
//     };
//     var result = await fetch("https://api.datamuse.com/words?sp=" + word, options);
//     return result.json();
// }

// app.get('/v1/users/:userid/definitions/:word', async function(req, res) {
//     if(isNaN(req.params.userid)) {
//         return res.json({"error": "Invalid User ID."});
//     }

//     var ret = await make_API_call(req.params.word, "definitions");

//     return res.json(ret);
// });

// app.post('/v1/users/:userid/antonyms/:word', async function(req, res) {
//     if(isNaN(req.params.userid)) {
//         return res.json({"error": "Invalid User ID."});
//     }
//     if(parseInt(req.params.userid) < 1) {
//         return res.json({"error": "User does not have the necessary permissions to use this function. Try switching your user type."});
//     }
    
//     var ret = await make_API_call(req.params.word, "antonyms");

//     return res.json(ret);

// });

// app.put('/v1/users/:userid/synonyms/:word', async function(req, res) {
//     if(isNaN(req.params.userid)) {
//         return res.json({"error": "Invalid User ID."});
//     }
//     if(parseInt(req.params.userid) < 1) {
//         return res.json({"error": "User does not have the necessary permissions to use this function. Try switching your user type."});
//     }

//     var ret = await make_API_call(req.params.word, "synonyms");

//     return res.json(ret);
// });

// app.delete('/v1/users/:userid/frequency/:word', async function(req, res) {
//     if(isNaN(req.params.userid)) {
//         return res.json({"error": "Invalid User ID."});
//     }
//     if(parseInt(req.params.userid) < 1) {
//         return res.json({"error": "User does not have the necessary permissions to use this function. Try switching your user type."});
//     }

//     var ret = await make_API_call(req.params.word, "frequency");

//     if(!ret.hasOwnProperty('frequency')) {
//         ret.frequency = [];
//     }

//     return res.json(ret);
// });



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