//dump

//treeify

function treeify(value)
{
 //flat

 if(is_flat(value))
  return dumpify(value);
  
 //push

 const strings=[];
  
 const push=(value,depth)=>
 {
  strings.push(repeat(" ",depth)+value);
 }
 
 //visit
 
 const visit=(key,value,depth)=>
 { 
  //flat

  if(is_flat(value))
  {
   push(stringify(key)+" = "+stringify(value),depth);
   
   return;
  }
  
  //begin
  
  push("key "+stringify(key),depth);
  
  //children
    
  for(let key in value)
  {
   const current=value[key];
   
   visit(key,current,depth+1);
  }

  //end
  
  push("end",depth);
 }
 
 //decycle

 const buffer=decycle(value);
 
 //begin
  
 push("tree "+stringify(type_name(value)),0);
 
 //visit
 
 for(let key in buffer)
 {
  visit(key,buffer[key],1);
 }

 //end
  
 push("end",0);
 
 return join(strings);
}

//dumpify

function dumpify(value)
{
 const strings=[];
 const buffer=flatten(value);
 
 for(let key in buffer)
 {
  strings.push(key+" = "+stringify(buffer[key]));
 }
 
 return join(strings);
}

//stringify

function stringify(value)
{
 //nothing
 
 if(is_nothing(value))
  return type_name(value);

 //boolean
 
 if(is_boolean(value))
  return to_string(value);
  
 //number
 
 if(is_number(value))
  return to_string(value);

 //string
 
 if(is_string(value))
 {
  if(is_digit(value))
  {
   //digit
  }
  else if(is_alnum(value))
  {
   //alnum
   
   return value;
  }
   
  //quotes
   
  return quotes(value);
 }
 
 //empty
 
 if(length(value)==0)
  return inspect(value);
 
 //array

 if(is_array(value))
  return brackets(value.map(stringify).join(" "));
 
 //any

 const buffer=[];
   
 for(let key in value)
 {
  buffer.push(stringify(key)+":"+stringify(value[key]));
 }
 
 return braces(buffer.join(" "));
}
