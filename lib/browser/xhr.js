//xhr

//xhr

function xhr(url,on,method="get",data)
{
 const request=new XMLHttpRequest;

 //on load
 
 const on_load=(event)=>
 {
  const response=event.target.response;
  
  //remove error event

  page().remove_event(request,"error");
  
  //on
  
  if(is_json(response))
   on(JSON.parse(response));
  else
   on(response);
   
  return false;
 }

 //on error
 
 const on_error=(event)=>
 {
  //headers
  
  const headers=split(trim_vertical(event.target.getAllResponseHeaders()));
  
  //fatal
   
  fatal("XHR call failed",{url:url,method:method,data:data,headers:headers});
 }
 
 //open
  
 request.open(method,url);
 request.overrideMimeType("text/plain"); 
 
 //add events
 
 page().add_event(request,"load",on_load);
 page().add_event(request,"error",on_error);
 
 //send
 
 if(is_nothing(data))
  request.send();
 else
  request.send(to_json(data));
}
