import express from "express";
import bodyParser from "body-parser";
import {getRecipe} from "./openai.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) =>{
    res.render("index.ejs");
})

app.post("/submit",(req,res) =>{
    const ingredients = req.body.wishs;
    getRecipe(ingredients).then((result) => {
        console.log(result);
        res.render("recipe.ejs", {
            result:result
        } )
    }).catch((error) => {
        console.log(error);
    });
});

app.post("/choices", (req,res) =>{
    res.render("choice.ejs", {
        items:items
    })
});


const items = [["salmon", "Beef", "Chicken", "Mince", "tuna"], [ "spaghetti", "fettuccine", "penne", "ravioli", "rice","Rotini", "Farfalle"], ["basil", "broccoli", "carrot", "Asparagus", "Mushroom","Parsley", "Pea","Potato","Spinach", "Garlic", "Onion"], ["Yoghurt", "Black Pepper", "Chili Pepper", "Cinnamon", "Soy Sauce", ""]]
let willbeUsed = []

app.get("/choices", (req,res) =>{
    res.render("choice.ejs", {
        items:items
    })
})

app.post("/recipe", async (req,res) =>{
    const ingredients = req.body.selected;
    const result = await getRecipe(ingredients);
    res.render("recipe.ejs", {
        result:result
    });
})

app.get("/recipe", (req,res) =>{
    console.log(req.header("response"));
    res.render("recipe.ejs", {
        result:req.header("response"),
    });
});

app.listen(port, () =>{
    console.log(`Port is ${port}`);
})