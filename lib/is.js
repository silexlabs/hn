//is

//is v8

function is_v8()
{
 return is_cli()||is_defined(user_agent().chrome);
}

//is json

function is_json(value)
{
 //parse
 
 let buffer;
 
 try
 {
  buffer=JSON.parse(value);
 }
 catch(exception)
 {
  return false;
 }
 
 //something
 
 return is_something(buffer);
}

//is deep

function is_deep(value)
{
 return !is_flat(value);
}

//is flat

function is_flat(value)
{
 return is_nothing(value)||is_primitive(value)||length(value)==0;
}

//is basic

function is_basic(value)
{
 return is_nothing(value)||is_primitive(value)||is_container(value);
}

//is something

function is_something(value)
{
 return !is_nothing(value);
}

//is nothing

function is_nothing(value)
{
 return is_null(value)||is_undefined(value)||is_nan(value)||is_infinite(value);
}

//is null

function is_null(value)
{
 return value===null;
}

//is defined

function is_defined(value)
{
 return !is_undefined(value);
}

//is undefined

function is_undefined(value)
{
 return value===undefined;
}

//is primitive

function is_primitive(value)
{
 return is_boolean(value)||is_number(value)||is_string(value);
}

//is boolean

function is_boolean(value)
{
 return type_name(value)=="boolean";
}

//is numeric

function is_numeric(value)
{
 //number
 
 if(is_number(value))
  return true;
 
 //string
 
 if(is_string(value))
  return is_number(Number.parseFloat(value));
 
 //any
 
 return false;
}

//is integer

function is_integer(value)
{
 return Number.isInteger(value);
}

//is number

function is_number(value)
{
 return type_name(value)=="number";
}

//is nan

function is_nan(value)
{
 return Number.isNaN(value);
}

//is infinite

function is_infinite(value)
{
 return typeof value=="number"&&!is_finite(value); 
}

//is finite

function is_finite(value)
{
 return Number.isFinite(value);
}

//is string

function is_string(value)
{
 return type_name(value)=="string";
}

//is identifier

function is_identifier(value)
{
 return /^[_a-z]+\w*$/i.test(value);
}

//is alnum

function is_alnum(value)
{
 return /^[_a-z0-9]+$/i.test(value);
}

//is digit

function is_digit(value)
{
 return /^[0-9]+$/i.test(value);
}

//is space

function is_space(value)
{
 return /^\s+$/.test(value);
}

//is container

function is_container(value)
{
 return is_array(value)||is_object(value);
}

//is array

function is_array(value)
{
 return type_name(value)=="array";
}

//is object

function is_object(value)
{
 return type_name(value)=="object";
}

//is function

function is_function(value)
{
 return type_name(value)=="function";
}

//is allowed

function is_allowed(value)
{
 //nothing
 
 if(is_nothing(value))
  return true;
  
 //random property access
 
 try
 {
  value.any;
 }
 catch(exception)
 {
  //permission denied
  
  if(to_lower(exception.message).includes("permission denied"))  
   return false;
   
  //any
   
  throw exception;
 }

 return true;
}

//is disallowed

function is_disallowed(value)
{
 return !is_allowed(value);
}

//type name

function type_name(value)
{
 //null
 
 if(is_null(value))
  return "null";

 //nan
 
 if(is_nan(value))
  return "nan";

 //infinite
 
 if(is_infinite(value))
  return "infinite";
  
 //constructor name

 if(is_defined(value)&&is_defined(value.constructor)&&is_defined(value.constructor.name))
  return to_lower(value.constructor.name);
  
 //typeof
  
 return typeof value;
}
