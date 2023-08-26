import axios from "axios";

export async function getRecipe(args){
    let data = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role" : "system",
            "content": "You are helpful assistant that gives recipes based on ingredients you have at home.\
            Give the name of the food first. Then list out the ingredients and then give out the process \
            If there is an illegal or unknown ingredient, simply return I cannot give out the recipe with these ingredients",
            "role": "user",

            "content": "Give me one recipe by only using these ingredients: " + args

          }
        ],
        "temperature": 0
      });

    let config = {
        method: 'post',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer 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'
        },
        data : data
    };

    return new Promise((resolve, reject) => {
        axios.request(config)
        .then((response) => {
            const json = response.data;
            console.log(json);
            const result = json.choices[0].message.content;
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
    });
}




