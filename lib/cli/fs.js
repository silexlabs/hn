//fs

//save

function save(path,value)
{
 pkg.fs.writeFileSync(path,value);
}

//unlink

function unlink(path)
{
 if(file_exists(path))
  pkg.fs.unlinkSync(path);
}

//rename

function rename(path,new_path)
{
 pkg.fs.renameSync(path,new_path);
}

//ls

function ls(path,recursive=false)
{
 //unexpected
 
 const unexpected=(path)=>
 {
  fatal("Can't ls() path",quotes(path));
 }
  
 //file
 
 if(is_file(path))
  return [path];

 //directory
 
 if(is_directory(path))
 {
  const result=[];
  const paths=pkg.fs.readdirSync(path);
  
  for(let current of paths)
  {
   const buffer=join_path(path,current);
   
   //file
  
   if(is_file(buffer))
   {   
    result.push(buffer);
    
    continue;
   }
   
   //directory

   if(is_directory(buffer))
   {
    if(recursive)
     result.append(ls(buffer,true));
    
    continue;
   }
   
   //any
   
   unexpected(buffer);
  }
  
  //sort
  
  result.sort();

  return result;
 }
 
 //any
 
 unexpected(path);
}

/*
//backup

function backup(path:string):void
{
 if(!is_file(path))
  return;
 
 let index:number=1;
 
 //make
 
 const make=():string=>
 {  
  return join_path(dir_name(path),file_name(path)+"-"+index+".bak");
 }
 
 //search
 
 let new_path:string=make();
  
 while(is_file(new_path))
 {
  index++;
  
  new_path=make();
 }
 
 //rename
 
 print("backup",quotes(new_path));
 
 rename(path,new_path);
}
*/

//file exists

function file_exists(path)
{
 try
 {
  pkg.fs.statSync(path);
 }
 catch(exception)
 {
  return false;
 }
 
 return true;
}

//is file

function is_file(path)
{
 try
 {
  return pkg.fs.statSync(path).isFile();
 }
 catch(exception)
 {
 }
 
 return false;
}

//is directory

function is_directory(path)
{
 try
 {
  return pkg.fs.statSync(path).isDirectory();
 }
 catch(exception)
 {
 }
 
 return false;
}
