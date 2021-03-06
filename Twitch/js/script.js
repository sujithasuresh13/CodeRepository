

$(function(){

   var streamers = ["freecodecamp",
                     "storbeck", 
                     "terakilobyte",
                     "habathcx",
                     "RobotCaleb",
                     "thomasballinger",
                     "noobs2ninjas",
                     "beohoff",
                     "qazitv",
                     "asmongold",
                     "comster404"];
   
  
   /* $.getJSON("https://api.twitch.tv/kraken/streams/comster404?callback=?",success);
  

   function success(data){
    alert(JSON.stringify(data));
    }*/

    //constructing the api call to twitch.tv
    function getTwitchStatus(channel){

    function buildUrl(channelName){
      $.getJSON("https://api.twitch.tv/kraken/streams/"+channelName+"?callback=?",success).fail(error);
    }

     buildUrl(channel);     
    
    // populate the streamer data using constructor call
    function StreamData(channelData){
       this.channelName = channelData.name;       
       this.channelLang = channelData.language;
       this.logo = channelData.logo || "https://jpk-image-hosting.s3.amazonaws.com/twitch-app/no-image-available.jpg";
       this.url = channelData.url;
       this.followers = channelData.followers;
       this.channelInfo = channelData.status || "";
    }


     function success(streamersData){
        if(streamersData.stream === null){
        var channelObj={};
        $.getJSON("https://api.twitch.tv/kraken/channels/"+channel+"?callback=?",function(channelData){
        channelObj= new StreamData(channelData);   
        channelObj.channelStatus = "Offline";
         insertStream(channelObj);
        }).fail(error);
       
       }


       else if(streamersData.stream === undefined){
           var accountBlocked = {"channelStatus": "No Account Found", 
                                 "channelName": channel,
                                 "logo": "https://jpk-image-hosting.s3.amazonaws.com/twitch-app/no-image-available.jpg"};
           insertStream(accountBlocked);
      }

       else{
          /*alert(JSON.stringify(streamersData));*/
          var streamObj = new StreamData(streamersData.stream.channel);
          streamObj.channelStatus = "Online";
          insertStream(streamObj);
          
       }   
    }

    }
    
   function insertStream(obj){
    /*alert(JSON.stringify(obj));*/
   if(obj.channelStatus === 'Offline' ){

       $("#streambody").append("<div class=col-lg-4><a href="+obj.url+"><div class=streamers><img src="+ obj.logo +" width=70 height=70></img>"+"<div class=inlineblock><div class=indentcontent>"+obj.channelName.toUpperCase()+"</div><div style=position:relative;top:14px;>"+ obj.channelStatus +"<br/>"+"Language:"+ obj.channelLang+"<br/>"+"Followers :"+obj.followers+"</div></div></div></a></div>");
       
       $("a").attr('target', '_blank');
    } 
    else if(obj.channelStatus === 'Online'){
      $("#streambody").append("<div class=col-lg-4><a href="+obj.url+"><div class=streamers><img src="+ obj.logo +" width=70 height=70></img>"+"<div class=inlineblock><div class=indentcontent>"+obj.channelName.toUpperCase()+"</div><div style=position:relative;top:14px;>"+obj.channelInfo+"<br/>"+ obj.channelStatus +"<br/>"+"Language:"+ obj.channelLang+"<br/>"+"Followers :"+obj.followers+"</div></div></div></a></div>");
   
      $("a").attr('target', '_blank');
    }
    else {
      
      $("#streambody").append("<div class=col-lg-4><div class=streamers><img src="+ obj.logo +" width=70 height=70></img>"+"<div class=inlineblock><div class=indentcontent>"+obj.channelName.toUpperCase()+"</div><div style=position:relative;top:14px;>"+ obj.channelStatus +"<br/>"+"</div></div></div></div>");

    }
    $("img").addClass("roundedcorner");
    $("img").addClass("indentimg");
  }
   function error(){
          alert("The requested data is not available at the moment. Please try after sometime.");
     }
   
   
   streamers.forEach(getTwitchStatus);    

   
   
 })

   


