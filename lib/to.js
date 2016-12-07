//to

//to integer

function to_integer(value)
{
 const result=Number.parseInt(value,10);
 
 check(is_number(result));
 check(result.toString()==value);
 
 return result;
}

//to real

function to_real(value)
{
 const result=to_number(value);
 
 check(result.toString()==value);
 
 return result;
}

//to number

function to_number(value)
{
 const result=Number.parseFloat(value);
 
 check(is_number(result));
 
 return result;
}

//to upper

function to_upper(value)
{
 return value.toUpperCase();
}

//to lower

function to_lower(value)
{
 return value.toLowerCase();
}

//to string

function to_string(value)
{
 //has method
 
 if(is_something(value)&&is_function(value.toString))  
  return value.toString();
  
 //type name
 
 return type_name(value);
}

//to json

function to_json(value)
{
 const result=JSON.stringify(value);
 
 check(is_string(result));
 
 return result;
}
