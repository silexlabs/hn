//function

/*
//partial

function partial(function_,...values)
{
 check(is_function(function_));
 
 const result=(...parameters)=>
 {
  const args=values.slice(0);
  
  for(let key in parameters)
  {
   const current=parameters[key];
   
   if(is_undefined(current))
    continue;
    
   args[key]=current;
  }
  
  return function_.apply(null,args);
 }
 
 return result;
}*/
