//container

//compare

function compare(left,right)
{
 //reference
 
 if(left===right)
  return 0;
  
 //type
 
 const left_type=type_name(left);
 const right_type=type_name(right);
 
 if(left_type!=right_type)
  return compare(left_type,right_type);
  
 //container
 
 if(is_container(left))
 {
  for(let key in left)
  {
   const left_value=left[key];
   const right_value=right[key];
   
   //different layout
   
   if(is_undefined(right_value))
    break;
    
   //value
   
   const result=compare(left_value,right_value);
   
   if(result!=0)
    return result;
  }

  //length

  return compare(length(left),length(right));
 }
 
 //any
 
 if(left>right)
  return 1;

 if(left<right)
  return -1;
 
 return 0; 
}

//clone
 
function clone(value)
{
 //array
 
 if(is_array(value))
  return value.slice(0);
 
 //object
 
 if(is_object(value))
 {
  const result={};
  
  for(let key in value)
  {
   result[key]=clone(value[key]);
  }
  
  return result;
 }
 
 //any
 
 return value; 
}

//merge

function merge(...parameters)
{ 
 const result={};
 
 for(let current of parameters)
 {
  Object.assign(result,clone(current));  
 }
 
 return result;
}

//filter empty

function filter_empty(value)
{
 check(is_array(value));
 
 const result=[];
 
 for(let current of value)
 {
  if(length(current)==0)
   continue;
   
  result.push(current);
 }
 
 return result;
}

//front

function front(array)
{
 return at(array,0);
}

//back

function back(array)
{
 return at(array,array.length-1);
}

//at

function at(array,index)
{
 check(has(array,index));
 
 return array[index];
}

//has

function has(value,key)
{
 //array
 
 if(is_array(value))
 {
  //index
  
  if(is_integer(key))
   return key>=0&&key<value.length;
 }
 
 //any
 
 return is_defined(value[key]);
}

//length

function length(value)
{
 //array or string
 
 if(is_array(value)||is_string(value))
  return value.length;
 
 //count
 
 const count=(value)=>
 {
  let result=0;
  
  for(let key in value)
  {
   result++;
  }
  
  return result;
 }
 
 //keys
 
 const result=Object.keys(value).length;
 
 if(result>0)
  return result;
  
 //count
 
 return count(value);
}
