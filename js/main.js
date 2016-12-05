var pattern = Trianglify({
    height: 1000,
    width: $(window).width(),
    cell_size: 40});

document.body.appendChild(pattern.canvas());