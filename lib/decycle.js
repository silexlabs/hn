//decycle

//decycle

function decycle(value)
{
 const stack=[];
  
 //enumerate
 
 const enumerate=(value,on)=>
 {
  //is circular

  const is_circular=(value)=>
  {
   //dynamic and recursive in chrome
   
   if(is_v8()&&type_name(value)=="mimetype")
    return true;
    
   //search
      
   for(let current of stack)
   {   
    if(current===value)
     return true;
   }

   return false;
  }
  
  //enter
  
  stack.push(value);
  
  //enumerate
  
  for(let key in value)
  {
   let current;
   
   //can fail with some dom nodes
   
   try
   {
    current=value[key];
   }
   catch(exception)
   {
    continue;
   }
   
   //disallowed
   
   if(is_disallowed(current))
    continue;
   
   //function
   
   if(is_function(current))
    continue;
   
   //circular
   
   if(is_circular(current))
    continue;
    
   //on
   
   on(key,current);
  }
  
  //leave
  
  stack.pop();
 }
  
 //probe

 const nodes=[]; 
  
 const probe=(value)=>
 { 
  //flat

  if(is_flat(value))
   return;
  
  //is probed

  const is_probed=(value)=>
  {
   const depth=stack.length;
   
   for(let current of nodes)
   {
    //same node
    
    if(current.value!==value)
     continue;
     
    //deeper

    if(current.depth>depth)
     current.depth=depth;
    
    return true;
   }
   
   //push

   nodes.push({value:value,depth:depth,visited:false});
      
   return false;
  } 
  
  //on
  
  const on=(key,value)=>
  {
   //flat

   if(is_flat(value))
    return;
      
   //probed
   
   if(is_probed(value))
    return;
    
   //probe
   
   probe(value);
  };
  
  //enumerate
  
  enumerate(value,on);    
 }
  
 //visit
 
 const visit=(value)=>
 { 
  //flat

  if(is_flat(value))
   return value;
  
  //is visited

  const is_visited=(value)=>
  {
   const depth=stack.length;
   
   for(let current of nodes)
   {
    //same node
    
    if(current.value!==value)
     continue;
     
    //deepest
     
    if(!current.visited&&current.depth==depth)
    {
     current.visited=true;
     
     return false;
    }
    
    return true;
   }

   return false;
  }
  
  //on
  
  const result={};
  
  const on=(key,value)=>
  {
   //flat

   if(is_flat(value))
   {
    result[key]=value;
    
    return;
   }
      
   //visited
   
   if(is_visited(value))
    return;
   
   //visit and add
   
   result[key]=visit(value);
  }
  
  //enumerate
  
  enumerate(value,on);
  
  return result;  
 }
 
 //probe
 
 probe(value);
 
 //visit
 
 return visit(value);
}
