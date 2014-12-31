window.onload=function(){
    var myId=document.getElementById("myId").innerHTML.trim();
    var peer=new Peer(myId,{host: 'localhost', port: 8443, path: '/transfer'});
    peer.on('connection',connect);
    peer.on('error',function(err){
	console.log("Error "+err);
    });
    document.getElementById("connectButton").onclick=function(){
	var peerName=document.getElementById("peerName").value.trim();
	if(peerName!=""){
	    hideConnectToPeer();
	    showConnectionDiv();
	    var c=peer.connect(peerName);
	    c.on('open',function(){
		connect(c);
	    });
	    c.on('error',function(err){
		console.log(err);
	    });
	}
    };
    document.getElementById("sendButton").onclick=function(){
	var file=document.getElementById("sendFile").files[0];
	conn.send(file);
	document.getElementById("message").innerHTML+="<br />You sent a file.";
    };
    document.getElementById("disconnectButton").onclick=function(){
	showConnectToPeer();
	hideConnectionDiv();
    };
}
