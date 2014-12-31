var conn;
function connect(c){
    conn=c;
    document.getElementById("message").innerHTML=conn.peer+" connected to you.";
    hideConnectToPeer();
    showConnectionDiv();
    conn.on('data',function(data){
	if(data.constructor===ArrayBuffer){
	    var dataView=new Uint8Array(data);
	    var dataBlob=new Blob([dataView]);
	    var url=window.URL.createObjectURL(dataBlob);
	    document.getElementById("message").innerHTML+="<br />"+conn.peer+" has sent you a <a target='_blank' href='"+url+"' download>file</a>";
	}
    });
}
function hideConnectToPeer(){
    document.getElementById("connectToPeer").style.display="none";
}
function showConnectionDiv(){
    document.getElementById("fileTransfer").style.display="block";
}
function hideConnectionDiv(){
    document.getElementById("fileTransfer").style.display="none";
}
function showConnectToPeer(){
    document.getElementById("connectToPeer").style.display="block";
}