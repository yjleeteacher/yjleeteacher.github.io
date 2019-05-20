window.myCallback = function(data) {
    //alert(data);
    console.log('data',data);
};
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    /*
    ext.myJsonMethod = function(data) 
    {
            console.log('data',data);
    };
    */

        var myCallback = function(data)
        {
            console.log('data2',data);
        };



    ext.my_first_block = function() {
                  console.log('test0');
        var location = 'Boston ,MA';
        /*
        $.ajax({
              url: 'https://rdhvta8915.execute-api.ap-northeast-2.amazonaws.com/prod',
              crossDomain: true,
              //url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( data ) 
              {
                  console.log('test1');
                  // Got the data - parse it and return the temperature
                  console.log('receive data',data);
              }
        });
        */


        /*
        $.getJSON("https://rdhvta8915.execute-api.ap-northeast-2.amazonaws.com/prod?callback=?",
          function(data) {
            console.log('성공 - ', data);
          }
        );
        */
          var result = $.ajax({
            url: 'https://rdhvta8915.execute-api.ap-northeast-2.amazonaws.com/prod',
            dataType: 'jsonp',
            jsonpCallback: "myCallback",
            success: function(data) {
              console.log('성공 - ',data);
            },
            complete: function(resp){
                console.log('complete result',resp.responseText);
            },
            myCallback: function(data)
            {
              console.log('성공3 - ',data);

            } ,

            /*
complete: function (XMLHttpRequest, textStatus) {
    var headers = XMLHttpRequest.getAllResponseHeaders();
    console.log('headers',headers);
    console.log('headersall',XMLHttpRequest);
},
*/
        
    /*
            error: function (request, textStatus, errorThrown) {
                console.log(request.getResponseHeader());
            },
            */
            done: function(data2) {
              console.log('data2', data2);
            }
 
          });


        /*
        $.ajax({
            type : "GET",
            url: 'https://rdhvta8915.execute-api.ap-northeast-2.amazonaws.com/prod',
            dataType :"jsonp",
            jsonp: true,
            jsonpCallback: "callback",
            success : function(data){
                alert(data);},
                
            error : function(httpReq,status,exception){
                alert(status+" "+exception);
            }
        });
        */

        console.log('test3');



        // Code that gets executed when the block is run
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'my first block', 'my_first_block'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
})({});
/*
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

              //url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
    ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'https://rdhvta8915.execute-api.ap-northeast-2.amazonaws.com/prod',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  console.log('weather_data',weather_data);
                  //temperature = weather_data['main']['temp'];
                  callback(20);
              }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Weather extension', descriptor, ext);
})({});
*/
