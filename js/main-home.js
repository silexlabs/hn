//main home

//main home

function main_home()
{
 //on load frontpage

 const on_load_frontpage=(response)=>
 {
  const hits=response.hits;
  const top=hits.slice(0,10);
  
  //format
  
  const buffer=[];

  for(let i in top)
  {
   const current=top[i];
   const position=to_integer(i)+1;
   const url="https://news.ycombinator.com/item?id="+current.objectID;
   
   let string="";
   
   string+="<div>";
   string+=position+". ";
   string+="<a href="+quotes(url)+">"+current.title+"</a>";
   string+="</div>";
   
   buffer.push(string);  
  }
  
  //update
  
  const widget=by_id("widget");
  
  widget.add("h3").text("HN front page");  
  widget.add().html(buffer.join(""));    
 }

 //front page
  
 xhr("https://hn.algolia.com/api/v1/search?tags=front_page",on_load_frontpage);
}
