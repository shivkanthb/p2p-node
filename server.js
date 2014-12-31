var fs=require('fs');
var http=require('http');
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var ExpressPeerServer=require('peer').ExpressPeerServer;
app.use(bodyParser.urlencoded({ extended: false }));
var list=require('./users.js');
app.get('/',function(req,res){
    fs.readFile(__dirname+'/index.html',function(err,data){
	if(err){
	    console.log("Error loading index.html");
	    return;
	}
	res.setHeader('Content-Type','text/html');
	res.end(data);
    });
});
app.get('/main.js',function(req,res){
    fs.readFile(__dirname+'/main.js',function(err,data){
	if(err){
	    console.log("Error loading main.js");
	    return;
	}
	res.setHeader('Content-Type','application/javascript');
	res.end(data);
    });
});
app.get('/lib.js',function(req,res){
    fs.readFile(__dirname+'/lib.js',function(err,data){
        if(err){
            console.log("Error loading lib.js");
            return;
        }
        res.setHeader('Content-Type','application/javascript');
        res.end(data);
    });
});
app.post('/app',function(req,res){
    if(req.body.userSecret){
	var userSecret=req.body.userSecret;
	if(list.users[userSecret]!=undefined){
	    fs.readFile(__dirname+'/transfer.html',function(err,data){
		if(err){
		    console.log("Error loading transfer.html");
		    return;
		}
		res.setHeader('Content-Type','text/html');
		data+="<div id='myId' style='display:none'>"+list.users[userSecret]+"</div>";
		res.end(data);
	    });
	}
	else{
	    res.setHeader('Content-Type','text/plain');
	    res.end("You are not Authorized. Fuck you!");
	}
    }
    else{
	res.setHeader('Content-Type','text/plain');
        res.end("You are not Authorized. Fuck you!");
    }
});
var server=app.listen(8443);
app.use('/transfer',ExpressPeerServer(server));
console.log("Server running at 8443");