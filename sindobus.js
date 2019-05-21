(function(ext) 
{
    var busData = null;

    function updateBusInfo() 
    {
        $.ajax({
          type: "GET",
          dataType: "json",
          url: 'https://rdhvta8915.execute-api.ap-northeast-2.amazonaws.com/prod',
          success: function(data) {
            busData = data.body.itemList;
          },
          error: function(jqxhr, textStatus, error) {
            console.log("Error downloading ISS data");
          }
        });
    }

    ext.getBusArrivalInfo = function(busNo,callback) 
    {
        if (!busData) return;
        if (!busNo) return;

        console.log('busNo',busNo);

        var busInfo = getBusInfoByNo(busNo); 

        if(busInfo != '')
        {
            console.log('busInfo1',busInfo.arrmsg1);
            console.log('busInfo2',busInfo.arrmsg2);
            callback(busInfo);
        }
        else 
        {
            console.log('busInfo is empty');
        }
    };

    function getBusInfoByNo(busNo) 
    {
        for(var i=0; i< busData.length; i++)
        {
            if(busData[i].rtNm == busNo)
            {
                return busData[i]; 
            }
        }
        return '';
    }

    ext._getStatus = function() 
    {
        return { status:2, msg:'Ready' };
    };

    ext._shutdown = function() 
    {
        if (poller) 
        {
            clearInterval(poller);
            poller = null;
        }
    };
    var descriptor = 
    {
        blocks: [
            // Block type, block name, function name
            [' ', '버스도착정보 %s', 'getBusArrivalInfo','720'],
        ]
    };

    ScratchExtensions.register('신도중버스정보', descriptor, ext);
    updateBusInfo();
    var poller = setInterval(updateBusInfo, 5000);

})({});
