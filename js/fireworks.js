// <![CDATA[
  var fireworks_sparks = 75; // how many sparks per clicksplosion
  var fireworks_speed = 33; // how fast - smaller is faster
  var fireworks_bangs = 5; // how many can be launched simultaneously
  var fireworks_colours = ['#E6E6FA', '#FFD700']; // lavender and gold
  
  /****************************
  *   Clicksplosion Effect    *
  *(c)2012-3 mf2fm web-design *
  *  http://www.mf2fm.com/rv  *
  * DON'T EDIT BELOW THIS BOX *
  ****************************/
  var fireworks_intensity = new Array();
  var fireworks_Xpos = new Array();
  var fireworks_Ypos = new Array();
  var fireworks_dX = new Array();
  var fireworks_dY = new Array();
  var fireworks_stars = new Array();
  var fireworks_decay = new Array();
  var fireworks_timers = new Array();
  var fireworks_swide = 800;
  var fireworks_shigh = 600;
  var fireworks_sleft = 0;
  var fireworks_sdown = 0;
  var fireworks_count = 0;
  
  function addLoadEvent(funky) {
    var oldonload = window.onload;
    if (typeof(oldonload) != 'function') window.onload = funky;
    else window.onload = function() {
      if (oldonload) oldonload();
      funky();
    }
  }
  
  addLoadEvent(fireworks_clicksplode);
  
  function fireworks_clicksplode() {
    if (document.getElementById) {
      var i, j;
      window.addEventListener('scroll', fireworks_set_scroll);
      window.addEventListener('resize', fireworks_set_width);
      document.addEventListener('click', fireworks_eksplode);
      fireworks_set_width();
      fireworks_set_scroll();
      for (i = 0; i < fireworks_bangs; i++) {
        for (j = fireworks_sparks * i; j < fireworks_sparks + fireworks_sparks * i; j++) {
          fireworks_stars[j] = fireworks_createDiv('*', 13);
          document.body.appendChild(fireworks_stars[j]);
        }
      }
    }
  }
  
  function fireworks_createDiv(char, size) {
    var div = document.createElement('div');
    var sty = div.style;
    sty.font = size + 'px monospace';
    sty.position = 'absolute';
    sty.backgroundColor = 'transparent';
    sty.visibility = 'hidden';
    sty.zIndex = '101';
    div.appendChild(document.createTextNode(char));
    return div;
  }
  
  function fireworks_bang(N) {
    var i, Z, A = 0;
    for (i = fireworks_sparks * N; i < fireworks_sparks * (N + 1); i++) {
      if (fireworks_decay[i]) {
        Z = fireworks_stars[i].style;
        fireworks_Xpos[i] += fireworks_dX[i];
        fireworks_Ypos[i] += (fireworks_dY[i] += 1.25 / fireworks_intensity[N]);
        if (fireworks_Xpos[i] >= fireworks_swide || fireworks_Xpos[i] < 0 || fireworks_Ypos[i] >= fireworks_shigh + fireworks_sdown || fireworks_Ypos[i] < 0) {
          fireworks_decay[i] = 1;
        } else {
          Z.left = fireworks_Xpos[i] + 'px';
          Z.top = fireworks_Ypos[i] + 'px';
        }
        if (fireworks_decay[i] == 15) Z.fontSize = '7px';
        else if (fireworks_decay[i] == 7) Z.fontSize = '2px';
        else if (fireworks_decay[i] == 1) Z.visibility = 'hidden';
        fireworks_decay[i]--;
      } else {
        A++;
      }
    }
    if (A != fireworks_sparks) {
      fireworks_timers[N] = setTimeout('fireworks_bang(' + N + ')', fireworks_speed);
    }
  }
  
  function fireworks_eksplode(e) {
    var x, y, i, M, Z, N;
    fireworks_set_scroll();
    y = (e) ? e.pageY : event.y + fireworks_sdown;
    x = (e) ? e.pageX : event.x + fireworks_sleft;
    N = ++fireworks_count % fireworks_bangs;
    M = Math.floor(Math.random() * 3 * fireworks_colours.length);
    fireworks_intensity[N] = 5 + Math.random() * 4;
    for (i = N * fireworks_sparks; i < (N + 1) * fireworks_sparks; i++) {
      fireworks_Xpos[i] = x;
      fireworks_Ypos[i] = y - 5;
      fireworks_dY[i] = (Math.random() - 0.5) * fireworks_intensity[N];
      fireworks_dX[i] = (Math.random() - 0.5) * (fireworks_intensity[N] - Math.abs(fireworks_dY[i])) * 1.25;
      fireworks_decay[i] = 16 + Math.floor(Math.random() * 16);
      Z = fireworks_stars[i].style;
      if (M < fireworks_colours.length) Z.color = fireworks_colours[i % 2 ? fireworks_count % fireworks_colours.length : M];
      else if (M < 2 * fireworks_colours.length) Z.color = fireworks_colours[fireworks_count % fireworks_colours.length];
      else Z.color = fireworks_colours[i % fireworks_colours.length];
      Z.fontSize = '13px';
      Z.visibility = 'visible';
    }
    clearTimeout(fireworks_timers[N]);
    fireworks_bang(N);
  }
  
  function fireworks_set_width() {
    var sw_min = 999999;
    var sh_min = 999999;
    if (document.documentElement && document.documentElement.clientWidth) {
      if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
      if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
    }
    if (typeof(self.innerWidth) == 'number' && self.innerWidth) {
      if (self.innerWidth > 0 && self.innerWidth < sw_min) sw_min = self.innerWidth;
      if (self.innerHeight > 0 && self.innerHeight < sh_min) sh_min = self.innerHeight;
    }
    if (document.body.clientWidth) {
      if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
      if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
    }
    if (sw_min == 999999 || sh_min == 999999) {
      sw_min = 800;
      sh_min = 600;
    }
    fireworks_swide = sw_min - 7;
    fireworks_shigh = sh_min - 7;
  }
  
  function fireworks_set_scroll() {
    if (typeof(self.pageYOffset) == 'number') {
      fireworks_sdown = self.pageYOffset;
      fireworks_sleft = self.pageXOffset;
    } else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
      fireworks_sdown = document.body.scrollTop;
      fireworks_sleft = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
      fireworks_sleft = document.documentElement.scrollLeft;
      fireworks_sdown = document.documentElement.scrollTop;
    } else {
      fireworks_sdown = 0;
      fireworks_sleft = 0;
    }
  }
  // ]]>