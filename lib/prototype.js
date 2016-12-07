//prototype

//define method

function define_method(object,name,method)
{
 Object.defineProperty(object,name,{value:method,enumerable:false});
}

//array

function extend_array()
{
 //array clear

 function array_clear()
 {
  this.splice(0);
   
  return this;
 }

 //array append

 function array_append(value)
 {
  for(let current of value)
  {
   this.push(current);
  }
  
  return this;
 }

 //array remove

 function array_remove(index,length=1)
 { 
  check(this.has(index,length));
   
  this.splice(index,length);
  
  return this;
 }

 //array has

 function array_has(index,length=this.length)
 {
  check(is_integer(index));
  check(is_integer(length));
  check(length>=0);
  
  return has(this,index)&&has(this,index+length-1);
 }
 
 //define
 
 const methods=
 [
  array_clear,
  array_append,
  array_remove,
  array_has,
 ];
 
 for(let current of methods)
 {
  const name=current.name.replace(/^array_(.*)$/,"$1");
  
  define_method(Array.prototype,name,current);
 }
}

extend_array();

//object iterator

Object.prototype[Symbol.iterator]=function* ()
{
 for(let key in this)
 {
  yield this[key];
 }
};

//define_method(Object.prototype,Symbol.iterator);
