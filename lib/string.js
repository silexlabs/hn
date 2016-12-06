//string

//split

function split(value,separator="\n",count=-1)
{
 value=to_string(value);
  
 //empty
 
 if(value.length==0)
  return [];
  
 //split
  
 const result=value.split(separator);
 
 if(count>=0&&result.length>count)
 {
  //merge tail
  
  const tail=result.slice(count);
  
  result.remove(count,result.length-count);
  result.push(tail.join(separator));
 }
 
 return result;
}

//join

function join(value,separator="\n")
{
 return value.join(separator);
}

//replace

function replace(value,search,what)
{
 value=to_string(value);
 what=to_string(what);
 
 let result=value;
 
 //array
 
 if(is_array(search))
 {
  for(let current of search)
  {
   result=replace(result,current,what);
  }
  
  return result;
 }

 //string
 
 if(is_string(search))
 {  
  if(search.length==0)
   return result;
  
  while(true)
  {
   const index=result.indexOf(search);
   
   if(index<0)
    break;
    
   result=result.slice(0,index)+what+result.slice(index+search.length);
  }

  return result;
 }
 
 //any
 
 stop();
}

//pad left

function pad_left(value,length,pattern=" ")
{
 check(is_integer(length));

 value=to_string(value);
  
 if(value.length>=length)
  return value;
 
 return repeat(pattern,length-value.length)+value;
}

//repeat

function repeat(pattern,length)
{
 check(is_integer(length));
 
 pattern=to_string(pattern);
 
 if(length<=0)
  return "";
  
 const string=pattern.repeat(length/pattern.length+1);
 
 return string.slice(0,length);
}

//trim vertical

function trim_vertical(value)
{
 value=to_string(value);
 
 //split
 
 const lines=split(value);
 
 //trim right
 
 for(let key in lines)
 {
  lines[key]=lines[key].trimRight();
 }
 
 //trim top
 
 while(lines.length>0)
 {
  if(front(lines).length>0)
   break;
  
  lines.shift();
 }
 
 //trim bottom

 while(lines.length>0)
 {
  if(back(lines).length>0)
   break;
  
  lines.pop();
 }
 
 return join(lines);
}

//indent

function indent(value)
{
 value=to_string(value);
 
 const lines=split(value);
 
 for(let key in lines)
 {
  lines[key]=" "+lines[key];
 }
 
 return join(lines);
}

//escape

function escape_(value)
{
 value=to_string(value);
 
 //preserve
 
 const preserves=["","\"","\\"];
 
 if(preserves.includes(value))
  return value;
  
 //character
 
 if(value.length==1)
  return to_json(value).slice(1,-1); //remove quotes from json
 
 //map

 return value.split("").map(escape_).join("");
}

//quotes

function quotes(value)
{
 return to_json(to_string(value));
}

//parens

function parens(value)
{
 return "("+to_string(value)+")";
}

//brackets

function brackets(value)
{
 return "["+to_string(value)+"]";
}

//braces

function braces(value)
{
 return "{"+to_string(value)+"}";
}
