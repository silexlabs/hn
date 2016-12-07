//control

//optional

function optional(value,default_)
{
 return iif(is_defined(value),value,default_);
}

//iif

function iif(condition,ok,nok)
{
 return condition?ok:nok;
}
