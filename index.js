import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = "cd499cac26f0f2ad2697f282";

let codes;



app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/",async(req,res) =>{

    
    const fromValue = 3.75;
    
    try{

        const responseOfCodes = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
        codes = responseOfCodes.data.supported_codes;

        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/SAR/USD`);
        const data = response.data;
        const conversion_rate = data.conversion_rate;
        const toValue = conversion_rate * fromValue;


        res.render("index.ejs",{

             fromCurrency:"SAR",
             toCurrency:"USD",
             fromValue:fromValue,
             toValue:toValue,
             codes:codes
        });
    }

    catch(error){
     
        
        res.render("index.ejs",{error:"Sorry, come back later"});
        console.log(error.message +" get");

   }
})

app.post("/",async(req,res) =>{
   
    const fromCurrency= req.body.fromCurrency;
    const toCurrency= req.body.toCurrency;
    const fromValue = req.body.fromValue;
   try{
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`);
        const data = response.data;
        const conversion_rate = data.conversion_rate;
        const toValue = conversion_rate * fromValue;

        res.render("index.ejs",{
             fromCurrency:fromCurrency,
             toCurrency:toCurrency,
             fromValue:fromValue,
             toValue:toValue,
             codes:codes
        })
   }
   catch(error){
     
       
        res.render("index.ejs",{error:"Sorry, come back later"});
        console.log(error.message + " post");

   }
     


})

app.listen(PORT,()=>{
    console.log("server is running");
})