//main

//includes

include("js/main-home.js"); 
include("js/main-list.js"); 
include("js/dejson.js");
include("js/ga.js"); //analytics

//main

function main()
{
 //args
 
 const args=parse_url(location).query;
 const page_name=optional(args.p,"home");
 const view_mode=optional(args.v,"normal");
 
 //on load markdown

 let markdown="";

 const on_load_markdown=(response)=>
 {
  //on convert markdown

  const on_convert_markdown=(response)=>
  {
   //content
   
   const content=by_id("content");
   
   //add pre
   
   const add_pre=(text,title)=>
   {
    content.clear();
    
    //title
    
    content.add("h3").text(title);
    
    //pre
    
    const pre=content.add("pre");
    
    pre.style("white-space","pre-wrap");
    pre.text(text);
   }
  
   //update
   
   content.html(response);
   
   //dejson
   
   dejson(content);
   
   //view mode
   
   if(view_mode=="normal")
   {
   }
   else if(view_mode=="html")
   {
    //pre
    
    add_pre(content.html(),"HTML content");
    
    //wordpress
    
    const a=content.insert("div").add("a");
    
    a.attribute("href",make_url(location,merge(args,{v:"wp"})));
    a.text("For Wordpress");    
   }
   else if(view_mode=="wp")
   {
    //normalize
    
    content.normalize();
    
    //pre
    
    add_pre(content.html(),"Wordpress HTML content");
   }
   else if(view_mode=="md")
    add_pre(markdown,"Markdown content");
   else
    stop();   
   
   //entry
   
   const entry=window["main_"+page_name];
   
   if(is_function(entry))
    entry();
  }
  
  //save
  
  markdown=response;
  
  //convert markdown  
  
  xhr("https://api.github.com/markdown",on_convert_markdown,"post",{text:response});
 }

 //load markdown

 xhr("md/"+page_name+".md",on_load_markdown);
 
 //update dates

 const update_dates=(commit)=>
 {
  const update=by_id("update");

  //add link
  
  const add_link=(query,title)=>
  {
   const url=make_url(location,merge(args,query));   
   const a=update.add("a");
   
   a.text(title);
   a.attribute("href",url);
  }
  
  //clear
  
  update.clear();
  
  //commit

  if(is_defined(commit))
  {
   add_link({v:"md"},"committed "+relative_time_string(commit)+" ago");
   
   update.add("span").text(" | ");
  }
   
  //modify
  
  add_link({v:"html"},"modified "+relative_time_string(document.lastModified)+" ago");  
 }

 //on last commit
 
 const on_last_commit=(response)=>
 {
  const commit=front(response).commit;
  
  update_dates(commit.author.date);
 }
 
 //last update
 
 update_dates();
 
 //last commit

 xhr("https://api.github.com/repos/silexlabs/hn/commits",on_last_commit);
}
