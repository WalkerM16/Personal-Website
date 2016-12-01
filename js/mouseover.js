
window.onload = function() {
    
    var imgList;
    imgList = document.querySelectorAll(".tileImage");
    
    for (var i = 0; i < imgList.length; i++) {
        var image = imgList[i];
        console.log(image);
        
        //Create thumbnail on mouseover
        image.onmouseenter = function() {
            this.opacity = 0.1;
        }
        
        //Remove thumbnail on mouseout
        image.onmouseout = function() {
            this.opacity = 1;
        }
    }
}

/*
window.onload = function() {
    
    var imgList;
    imgList = document.querySelectorAll(".tileImage");
    
    for (var i = 0; i < imgList.length; i++) {
        
        var image = imgList[i];
        var bigImage = document.createElement("span");;
        
        //Create thumbnail on mouseover
        image.onmouseenter = function() {    
            bigImage.innerHTML = "<img src=" + this.getAttribute("src") + " class=\"bigImg\"/>";
            this.parentElement.appendChild(bigImage);
        }
        
        //Remove thumbnail on mouseout
        image.onmouseout = function() {
            bigImage.innerHTML = "";
        }
    }
}
*/