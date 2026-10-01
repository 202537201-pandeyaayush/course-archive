/* Added to every task page. Adds Home / Week / Back buttons and a footer. */
(function(){
  var s=document.currentScript,root=new URL("../",s.src).href;
  var css=document.createElement("link");css.rel="stylesheet";css.href=root+"assets/nav.css";
  document.head.appendChild(css);
  var d=document.createElement("div");d.className="site-dock";
  var wk=location.href.match(/^(.*\/week\d+\/)/);
  d.innerHTML='<a href="'+root+'index.html">Home</a>'+(wk?'<a href="'+wk[1]+'index.html">Week</a>':'')+'<button type="button" onclick="history.back()">Back</button>';
  document.body.appendChild(d);
  var f=document.createElement("footer");f.className="site-footer";
  f.textContent="Created by Pandey Aayush | Student ID: 202537201";
  document.documentElement.appendChild(f);
})();
