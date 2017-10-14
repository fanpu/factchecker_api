var myGoogleNews = require('my-google-news');

const TelegramBot = require('node-telegram-bot-api');
const token = '342272465:AAHND7PeZhwGdh_sJ-jiARWoYCOkd7WTEYI'
const bot = new TelegramBot(token, {polling: true});

myGoogleNews.resultsPerPage = 10; // max 100
var nextCounter = 0;

function factcheck(query) {
    output = "";        
    myGoogleNews(query, function (err, res){
        res.links.forEach(function (item, i) {
            //            console.log(item);
            output += (i + 1) + ". " + item.title + "\n";
            output += "Source: " + extractHostname(item.link) + "\n";            
        });
//        console.log(output);
        if (err) {
            return err;
            //            console.error(err)
        }
    });
    return output;
}

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}



bot.on('message', (msg) => {
    //    if (msg.text != null && msg.text != "") bot.sendMessage(msg.text);
/*
    var hi = "hi";
    if (msg.text.toLowerCase().indexOf(hi) === 0) {
        bot.sendMessage(msg.chat.id,"Hello dear user\nhi");
    } 
    
    var bye = "bye";
    if (msg.text.toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }
*/
    var t_factcheck = "text factcheck";
    if (msg.text.toLowerCase().includes(t_factcheck)) {
        bot.sendMessage(msg.chat.id,"What would you want to Factcheck?");
    } else {
        let query_result = factcheck(msg.text);
        console.log(msg.text);
//        console.log(typeof query_result);
 //       console.log(query_result);
//        let test = "boop\nsadasd";
//        console.log(query_result[0]);
        bot.sendMessage(msg.chat.id, query_result);
     }
    
    

});

bot.onText(/\/start/, (msg) => {
    
    bot.sendMessage(msg.chat.id, "24/7 Fact Checking At Your Service!", {
        "reply_markup": {
            "keyboard": [["Text Factcheck", "Image Factcheck"]]
        }
    });
    //    bot.sendMessage(msg.chat.id, "24/7 Fact Checking At Your Service!");
    
});

