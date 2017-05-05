window.onload = function() {
    var title = document.createElement("h1");
    title.innerHTML = "Concentration";
    document.body.appendChild(title);
    
    title.style.WebkitTransition = 'opacity 1s';
    title.style.WebkitFilter = "opacity(0)";
    console.log(title.style.webkitFilter);
    title.style.WebkitFilter = "opacity(1.0)";
}