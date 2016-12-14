function showDiv(divID) {
    var element = document.getElementById(divID);
    
    //Reset all divs to invisible
    document.getElementById('dumpster').style.filter = "opacity(0)";
    document.getElementById('trinity').style.filter = "opacity(0)";
    document.getElementById('throw').style.filter = "opacity(0)";
    document.getElementById('dumpster').style.display = "none";
    document.getElementById('trinity').style.display = "none";
    document.getElementById('throw').style.display = "none";
    
    try {
        document.getElementById('color').style.filter = "opacity(0)";
        document.getElementById('color').style.display = "none";
    }
    catch(err) {
    }

    
    //Display specified element and scroll to its location
    element.style.display = "block";
    zenscroll.intoView(element, 800);
    element.style.filter = "opacity(1)";
}