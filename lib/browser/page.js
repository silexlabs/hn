//page

//page

function page()
{
 //exists
 
 if(is_something(pkg.page))
  return pkg.page;
    
 //create
 
 pkg.page={};

 const me=pkg.page;
 
 me.timeouts=[];
 me.events=[];

 //add timer

 me.add_timer=(on,delay)=>
 {
  check(is_function(on));
  check(is_number(delay));
  
  //on invoke

  const on_invoke=()=>
  {
   //call
   
   const status=on();
   
   //renew
   
   if(status!==false)
    me.add_timeout(on_invoke,delay);
  }
  
  //start
  
  me.add_timeout(on_invoke,delay);
 }

 //add timeout

 me.add_timeout=(on,delay)=>
 {
  check(is_function(on));
  check(is_number(delay));

  //trap
  
  on=trap(on);
  
  //on invoke
  
  let id;
  
  const on_invoke=()=>
  {
   //remove
   
   me.remove_timeout(id);
   
   //dead
   
   //if(me.is_dead())
   // return false;
    
   //call
   
   on();
  }
  
  //start
  
  id=setTimeout(on_invoke,delay*1000);
    
  //push
  
  me.timeouts.push(id);
 }
 
 //remove timeout

 me.remove_timeout=(id)=>
 {  
  for(let key in me.timeouts)
  {
   const current=me.timeouts[key];
   
   if(current==id)
   {
    clearTimeout(current);
    
    me.timeouts.remove(to_integer(key));
    
    return;
   }
  }

  fatal("Can't remove timeout",id);
 }
 
 //add event

 me.add_event=(node,event,on)=>
 {
  check(is_something(node));
  check(is_string(event));
  check(is_function(on));

  //trap
  
  if(event!="error")
   on=trap(on);
   
  //on invoke
  
  const on_invoke=(...parameters)=>
  {
   //dead
   
   /*if(me.is_dead())
   {
    me.remove_event(node,event);
   
    return;
   }*/
    
   //call
   
   const status=on.apply(null,parameters);
   
   //remove
   
   if(status===false)
    me.remove_event(node,event);   
  }
  
  //listener
  
  node.addEventListener(event,on_invoke);
   
  //push
  
  me.events.push({node:node,event:event,on:on_invoke});
 }

 //remove event

 me.remove_event=(node,event)=>
 {  
  check(is_something(node));
  check(is_string(event));

  for(let key in me.events)
  {
   const current=me.events[key];
   
   if(current.node===node&&current.event==event)
   {
    current.node.removeEventListener(current.event,current.on);
    
    me.events.remove(to_integer(key));
    
    return;
   }
  }

  fatal("Can't remove event",quotes(event),"on",quotes(type_name(node)));
 }
 
 //cancel

 me.cancel=()=>
 {
  //timeouts
  
  for(let current of me.timeouts)
  {
   me.remove_timeout(current);
  }

  //events

  for(let current of me.events)
  {
   me.remove_event(current.node,current.event);
  }
 }

 //is dead
 
/* me.is_dead=()=>
 {
  return pkg.status=="dead";
 }*/
 
 return me;
}
