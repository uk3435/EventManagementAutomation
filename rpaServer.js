var express=require('express');
const util =require('util');
//const basicAuth = require('express-basic-auth');
var http = require('http');
//var https=require('https');
var options={
    host: 'rpaServer IP',
    port: 'rpaServer port number',
    
    path: '', //RPA robot's REST API path 
    auth: 'username:psswd',
    method:'GET'
}

var app=express();

var queue = [];

app.get('/:name',  async function(req,res){ 
    var q;
    var att1=req.params.name;
   
    console.log("basla");
    console.log(att1);
    
    var dinleyici = function dinleyici() {
        console.log('dinleyici cagirildi.');
        queue.push(att1);
        queueReader();
        
    }
  
     
    var dinleyici2 = function dinleyici2() {
        console.log('dinleyici2 baslatildi.');
        
    }
   
    res.end();
     function queueReader(){

        setTimeout(async function(){
            q = queue.shift(); 
            
            try{
               
        
                await http.get(options, function (response) {
                                            console.log('STATUS: ' + response.statusCode);
                                            //console.log('HEADERS: ' + JSON.stringify(response.headers));
                                            response.setEncoding('utf8');
                                            console.log("quadaki bu değer tekrar gönderildi: "+q);
                                            if (response.statusCode!=200){
        
                                                queue.push(q);
               
                                                console.log(q);  
                                                queueReader();
                                        
                                               }  
                                            else{

                                                console.log("Queueya alinan deger"+" "+q+" basarili sekilde iletilmistir");
                                            }
        
                                             
                                           });
               // request.end();
        
        
            
            }
        
            catch(error){
               // next(error);
        
            }
        

        },45000) //45000 ms is the threshold for our case, it can be any value regards to your needs.

        
    }
    
    try{
        
        await http.get(options, function (response) { // this method called when server receives a request. It is asyn
                                    console.log('STATUS: ' + response.statusCode);
                                    //console.log('HEADERS: ' + JSON.stringify(response.headers));
                                    response.setEncoding('utf8');
                                    
                                    if (response.statusCode!=200){

                                        response.on("data",dinleyici);
                                       
                                        response.on("close",dinleyici2);
                                        console.log(att1+" "+"degeri ilk cagirmada basarisiz olmustur.");  
                                
                                    }  
                                    else {
                                        console.log(att1+" "+"degeri ilk cagirmada basarili olmustur.");

                                    }

                                     
                                   });
       // request.end();

      
    }

    catch(error){
       // next(error);

    }

    
});

app.listen(3001);

