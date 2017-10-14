var myGoogleNews = require('my-google-news');

const TelegramBot = require('node-telegram-bot-api');
const token = '342272465:AAHND7PeZhwGdh_sJ-jiARWoYCOkd7WTEYI'
const bot = new TelegramBot(token, {polling: true});

const RESULTS_PER_PAGE = 50;
myGoogleNews.resultsPerPage = 50; // max 100
var nextCounter = 0;

function factcheck(query) {
    myGoogleNews(query, function (err, res){
        output = "";        
        res.links.forEach(function (item, i) {
            //            console.log(item);
            output += (i + 1) + ". " + item.title + "\n";
            output += "Source: " + extractHostname(item.link) + "\n";
            
        });

        console.log(output);
        if (err) {
            console.error(err)
        }
        
    });
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

console.log(factcheck('smrt breakdown'));
