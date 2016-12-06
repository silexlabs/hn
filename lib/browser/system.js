//system

//exit

function exit()
{
 //cancel
 
 page().cancel();
 
 //stop
 
 pkg.stop.apply(window); //saved window.stop
 stop(); //throw
}
