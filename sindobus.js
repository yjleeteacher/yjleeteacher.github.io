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
            console.log(busData);
            busData = data.body.itemList;
            console.log(busData);
          },
          error: function(jqxhr, textStatus, error) {
            console.log("Error downloading ISS data");
          }
        });
    }

    ext.getBusArrivalInfo = function(busNo) 
    {
        if (!busData) return;
        if (!busNo) return;

        console.log('busNo',busNo);

        var busInfo = getBusInfoByNo(busNo); 

        if(busInfo != '')
        {
            console.log('busInfo1',busInfo.arrmsg1);
            console.log('busInfo2',busInfo.arrmsg2);

            return busInfo;
            //callback(busInfo);
        }
        else 
        {
            console.log('busInfo is empty');
        }
    };
    ext.bus720 = function(callback) 
    {
        if (!busData) return;

        var busNo = "720";

        var busInfo = getBusInfoByNo(busNo); 

        if(busInfo != '')
        {
            console.log('busInfo1',busInfo.arrmsg1);
            callback(busInfo.arrmsg1);
        }
        else 
        {
            console.log('busInfo is empty');
        }
    };
    ext.bus7211 = function(callback) 
    {
        if (!busData) return;

        var busNo = "7211";

        var busInfo = getBusInfoByNo(busNo); 

        if(busInfo != '')
        {
            console.log('busInfo2',busInfo.arrmsg2);
            callback(busInfo.arrmsg1);
        }
        else 
        {
            console.log('busInfo is empty');
        }
    };
    ext.bus701 = function(callback) 
    {
        if (!busData) return;

        var busNo = "701";

        var busInfo = getBusInfoByNo(busNo); 

        if(busInfo != '')
        {
            console.log('busInfo2',busInfo.arrmsg2);
            callback(busInfo.arrmsg1);
        }
        else 
        {
            console.log('busInfo is empty');
        }
    };

    /* bus 정보 읽어오기 */
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
            [' ', '신도중버스도착정보 %s', 'getBusArrivalInfo','720'],
            ['R', '720번위치 정보', 'bus720'],
            ['R', '7211번위치 정보', 'bus7211'],
            ['R', '701번위치 정보', 'bus701'],
        ]
    };

    ScratchExtensions.register('신도중버스정보', descriptor, ext);
    updateBusInfo();
    var poller = setInterval(updateBusInfo, 40000);

})({});
