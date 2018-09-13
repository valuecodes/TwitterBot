console.log('The bot is starting');

// Twit npm
var Twit = require('twit');

// Get twitter api keys and tokens
var config = require('./config.js')
var T = new Twit(config);

// Tweet function
tweetIt();

// Tweets every 60sec
setInterval(tweetIt, 1000*60);

function tweetIt(){
    //Search ten tweets that have trump keyword
    var params = {
        q:'trump',
        count:10
    }

    T.get('search/tweets',params,gotData);
    let update="";

    // Gets third word from every tweet if it is not starting with @
    //And puts in update
    function gotData(err,data,response){
        var tweets=data.statuses;
        for(var i=0;i<tweets.length;i++){
            word=tweets[i].text.split(" ");
            if(word[3][0]!='@'){
                console.log(word[3]);
                update+=word[3]+" ";    
            }
        }
    
    }
    // Waits 3 sec before tweeting the update 
    setTimeout(function() {
        var tweet={
        status: update
        }
        T.post('statuses/update',tweet,tweeted);

        function tweeted(err, data, response) {
        if(err){
            console.log("Something went wrong");
        }
        console.log("It worked");
        };
    }, 3000);
}
