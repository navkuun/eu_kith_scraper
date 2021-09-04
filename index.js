const { read } = require('fs');
const superagent = require('superagent').agent();
const cheerio = require('cheerio');
const prompt = require('prompt-sync')();
const generator = require('./AntiBot-handling/Generator.js'); // Generate IP
const { userInfo } = require('os');
const pretty = require('pretty');
const { title } = require('process');
const { add } = require('cheerio/lib/api/traversing');
// ^ Gives functions generateIP, generateUserAgents, generateReferers

function mainPrompt(){
    console.log("-----------------------------------------------------------------------");
    console.log("Hello, this is the KITH bot service: ");
    console.log("-----------------------------------------------------------------------");
}
// do while loop, also could add random time.sleep interval at beginning of each iteration
function userInput(){
    const URL = prompt("What is the link of the product you would like to query for ? : ");
    console.log("");
    console.log(`The url you wish to query is '${URL}'...`);
    return URL;
}

async function mainProcess() {
    mainPrompt();
    let continueProcess = prompt("Do you want to start querying a product [y/n] ? ");

    // do { 

    const kithURL = userInput();

    await superagent.get(kithURL)
        // .query({ q: 'bag' })
        .set('Content-Type', 'text/html')
        .set('Accept', 'text/html')
        // // .set('accept-language', 'en-GB')
        .set('User-Agent', generator.generateUserAgent())
        .set('X-Forwarded-For', generator.generateIP())
        .set('Referer', generator.generateReferer())
        .then(res => {
            const $ = cheerio.load(res.text);
            let title_product = $('.product__title');
            let price_product = $('.product__price');
            // console.log(title_product.text()); name of product
            console.log("-----------------------------------------------------------------------")
            console.log(`The product you have chosen is - ${title_product.text()} - that goes for ${price_product.text().replace(/\s+/g,'')}`);

            let swatches = [] ;
            $('.product-swatch__label').each(function(i , e){
                swatches[i] = $(this).text().replace(/\s+/g,''); // removes whitespace
            });
            let n_swatch = swatches.length;
            console.log("These are your size options: ");
            for(let i = 1 ;i <= n_swatch; ++i){
                console.log(`${i} - ${swatches[i-1]}`);
            }
            console.log("-----------------------------------------------------------------------");
            let userSwatchOption = prompt("What size option would you like to choose(by index) : ");
            console.log(`The option you chose is "${swatches[userSwatchOption - 1]}"`);

            let prodIDs = [];
            $('#product__master-select').children().each(function(i, e){
                let IDobj = $(this).attr();
                if(IDobj['disabled'] == undefined){
                    prodIDs[i] = IDobj['value'];
                }
            })
            varientID = prodIDs[userSwatchOption];
            let quantity = prompt("What quantity of your item would you like ? : ");
        
        
            
        let addToCart = async () => { await superagent.post('https://kith.com/cart/add.js')
            .send({'form-type':'product', 'id': varientID, 'quantity':quantity})
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('User-Agent', generator.generateUserAgent())
            .set('X-Forwarded-For', generator.generateIP())
            .set('Referer', generator.generateReferer()) 
            .then(res1 => {
                console.log(res1.text) 
            })
            .catch(err1 => {
                console.log(err1);
            })};
        // let bag = superagent.get('https://kith.com/pages/international-checkout#Global-e_International_Checkout');
        // console.log(bag.text);
        addToCart();

        })
        .catch(err => {
            console.log("Error exception has occured");
            console.log(err);
        })
        // continueProcess = prompt("Continue [y], Exit[n] ?")
    // }while(continueProcess.toLowerCase() == 'y');

    // console.log("Exiting programme....".blink());
}

mainProcess()

