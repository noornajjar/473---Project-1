$("#login-out").on("click", function(){

var dest =  "http://" + window.location.host + "/index.html";
console.log(dest);
window.location.assign(dest);	
return;
});
