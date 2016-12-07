//dump

//inspect

function inspect(value)
{
 let result;
 
 //json
 
 try
 {
  result=JSON.stringify(value); 
 }
 catch(exception)
 {
 }
 
 //string
  
 if(is_string(result))
  return result;
  
 //any
 
 return parens("uninspectable "+type_name(value));
}
