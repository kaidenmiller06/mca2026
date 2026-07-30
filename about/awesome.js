javascript:(function(){
  // Create 50 random elements
  for(let i=0; i<50; i++) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.width = Math.random() * 50 + 20 + 'px';
    el.style.height = el.style.width;
    el.style.borderRadius = '50%';
    el.style.background = `hsl(${Math.random()*360}, 100%, 50%)`;
    el.style.left = Math.random() * window.innerWidth + 'px';
    el.style.top = Math.random() * window.innerHeight + 'px';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none'; // Let you click through them
    document.body.appendChild(el);

    // Animate each element independently
    let x = parseFloat(el.style.left);
    let y = parseFloat(el.style.top);
    let dx = (Math.random() - 0.5) * 10;
    let dy = (Math.random() - 0.5) * 10;

    (function animate() {
      x += dx;
      y += dy;

      // Bounce off walls
      if(x <= 0 || x >= window.innerWidth - 50) dx = -dx;
      if(y <= 0 || y >= window.innerHeight - 50) dy = -dy;

      el.style.left = x + 'px';
      el.style.top = y + 'px';
      
      // Constantly change color
      el.style.background = `hsl(${Math.random()*360}, 100%, 50%)`;
      
      requestAnimationFrame(animate);
    })();
  }
  
  // Constantly change the page background color
  setInterval(() => {
    document.body.style.background = `hsl(${Math.random()*360}, 100%, 90%)`;
  }, 500);
})();   