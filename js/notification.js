function notify(){
  var notify=new Notification("مسافر جدید" ,{
      body:"شما از تاکسی مشهد سفر جدید دریافت کردین",
      icon:"img/taxi.png",
      

  } );

  setTimeout(function(){notify.close()},5000);

}


function showNotification(){
    if("Notification" in window){
        if(Notification.permission==="granted"){
          notify();
        }
        else if(Notification.permission !=="denied"){
         Notification.requestPermission(function(permission){
           if (permission === "granted" ){
             notify()
           }
         })
        }

    }
    else{
        alert("Notification does not supported");
    }


}
