const http=require('http');
var dat= new Date();
var date_end={
    year: dat.getFullYear(),
    month: dat.getMonth()+1,
    day: dat.getDate()
};
var date_start={
    year: dat.getFullYear(),
    month: dat.getMonth()+1,
    day: dat.getDate()-1
};
const key1='8e8990f6abc0497294d5b8b4d556685c';
const key2='416c0896a2fe4118b86b38fd7508d719';
const key3='f5e1ac7b53d24aaa99fb3e5c4fe547ff';

module.exports.get16DayForecast=async function(req,res){
console.log(req.params);
try {
await promiseit16Day(req.params).then(result=>{
    res.status(200).json(result);
    }).catch(err=>{
    res.status(500).json({error:err.message});
    });      
} catch (error) {
    console.log(error);
   res.status(403).json({error:'There was an unknown error',
                        message:error}); 
}
}
module.exports.getCurrentWeather= async function(req,res){
    try {
        await promiseitCurrent(req.params).then(result=>{
            res.status(200).json(result);
            }).catch(err=>{
            res.status(500).json({error:err.message});
            });      
        } catch (error) {
            console.log(error);
           res.status(403).json({error:'There was an unknown error',
                                message:error}); 
        }
}
module.exports.getLast15Days=async function(req,res){
    try {
        var resp={days:[]};
        for (let index = 0; index < 15; index++) {
            var temp= await promiseitLast15(req.params,index).then(result=>{
                return result;
                }).catch(err=>{
                res.status(500).json({error:err.message});
                }); 
            console.log("PUEDO HACER "+index);
            resp.days.push(temp.data[0]);
        }
        res.status(200).json(resp);   
        } catch (error) {
            console.log(error);
           res.status(403).json({error:'There was an unknown error',
                                message:error}); 
        }
}

function promiseitLast15(data,index){
    var options={
        hostname: 'api.weatherbit.io',
        port: '80',
        path: '/v2.0/history/daily?lat='+data.lat+'&lon='+data.lon+'&start_date='+date_start.year+'-'+date_start.month+'-'+(date_start.day-index)+'&end_date='+date_end.year+'-'+date_end.month+'-'+(date_end.day-index)+''+'&key='+key1,
        method: 'GET'
    }
    return new Promise(function(resolve, reject){ 
    var req=http.request(options,function(res){
    if (res.statusCode==404) {
        reject(JSON.parse(JSON.stringify({
            status:'404',
            message:'The resource was not found.'})));    
    }
    var body="";
    res.on('data',function(chunk){
        body+=chunk;
    });
    res.on('end',function(){
        try {
            const json=JSON.parse(body);   
            resolve(json);
        } catch (err) {
            reject(error);
        }
    });
    });
    req.on('error',function(err){
        console.log("FUE AQUI "+err);
        reject(err);
    });
    req.end();
    });
}

function promiseitCurrent(data){
    var options={
        hostname: 'api.weatherbit.io',
        port: '80',
        path: '/v2.0/current?lat='+data.lat+'&lon='+data.lon+'&key='+key1,
        method: 'GET'
    }
    return new Promise(function(resolve, reject){ 
    var req=http.request(options,function(res){
    if (res.statusCode==404) {
        reject(JSON.parse(JSON.stringify({
            status:'404',
            message:'The resource was not found.'})));    
    }
    var body="";
    res.on('data',function(chunk){
        body+=chunk;
    });
    res.on('end',function(chunk){
        try {
            const json=JSON.parse(body);
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
    });
    req.on('error',function(err){
        reject(err);
    });
    req.end();
    });    
}

function promiseit16Day(data){
    var options={
        hostname: 'api.weatherbit.io',
        port: '80',
        path: '/v2.0/forecast/daily?lat='+data.lat+'&lon='+data.lon+'&key='+key1,
        method: 'GET'
    }
    return new Promise(function(resolve, reject){ 
    var req=http.request(options,function(res){
    if (res.statusCode==404) {
        reject(JSON.parse(JSON.stringify({
            status:'404',
            message:'The resource was not found.'})));    
    }
    var body="";
    res.on('data',function(chunk){
        body+=chunk;
    });
    res.on('end',function(chunk){
        try {
           const json=JSON.parse(body);
           resolve(json);
        } catch (err) {
            reject(err);
        }
    });
    });
    req.on('error',function(err){
        reject(err);
    });
    req.end();
    });    
}