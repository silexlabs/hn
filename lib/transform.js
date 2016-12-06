//transform

//flatten

function flatten(value)
{
 //visit
 
 const visit=(value)=>
 { 
  const result=[];
  
  //flat

  if(is_flat(value))
  {
   result.push({keys:[type_name(value)],value:value});
   
   return result;
  }
  
  //visit
    
  for(let key in value)
  {
   const current=value[key];

   //flat

   if(is_flat(current))
   {
    result.push({keys:[key],value:current});
    
    continue;
   }
   
   //children
   
   const children=visit(current);
   
   //parent key
   
   for(let current of children)
   {
    current.keys.unshift(key);
   }
   
   //append
   
   result.append(children);
  }
  
  return result;
 }
 
 //decycle and visit
 
 const result={};
 const pairs=visit(decycle(value));

 //stringify keys
  
 for(let current of pairs)
 {
  const strings=current.keys.map(stringify);
  
  result[strings.join(".")]=current.value;
 }
 
 return result;
}

//simplify

function simplify(value)
{
 const result={};

 //is cached

 const cache=[];
 
 const is_cached=(value)=>
 {
  //deep
  
  if(is_deep(value))
   return false;
  
  //exists

  const string=stringify(value);  
  
  if(cache.includes(string))
   return true;
  
  //push
  
  cache.push(string);
  
  return false;
 }
 
 //minimize display
 
 is_cached(undefined);
 is_cached(null);
 is_cached("");
 is_cached([]);
 is_cached({});
 
 //visit
 
 const visit=(value)=>
 { 
  //flat

  if(is_flat(value))
   return value;

  //visit

  const result={};
   
  for(let key in value)
  {
   //visit
   
   const buffer=visit(value[key]);
   
   //cached

   if(is_cached(buffer))
    continue;
    
   //add
   
   result[key]=buffer;
  }
  
  return result;
 }
 
 //decycle and visit
 
 return visit(decycle(value));
}
