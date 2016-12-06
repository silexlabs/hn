//main

//includes

include("js/main-home.js"); 
include("js/main-list.js"); 
include("js/osm.js"); //analytics
include("js/ga.js"); //analytics

//main

function main()
{
 //page
 
 const p_arg=query_args().p; 
 const page_name=iif(is_something(p_arg),p_arg,"home");

 //on load markdown

 const on_load_markdown=(response)=>
 {
  //on update content

  const on_update_content=(response)=>
  {
   //content
   
   const content=by_id("content");
   
   content.html(response);
   
   //osm static map
   
   osm_static_map(content);
   
   //entry
   
   const entry=window["main_"+page_name];
   
   if(is_function(entry))   
    entry();
  }  
  
  xhr("https://api.github.com/markdown",on_update_content,"post",{text:response});
 }

 //markdown

 xhr("md/"+page_name+".md",on_load_markdown);
 
 //update dates

 const update_dates=(commit)=>
 {
  const strings=[];
  
  if(is_defined(commit))
   strings.push("committed "+relative_time_string(commit)+" ago");

  strings.push("modified "+relative_time_string(document.lastModified)+" ago");
    
  by_id("update").html(strings.join(" | "));
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
