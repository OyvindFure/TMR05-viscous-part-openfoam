// Filter i sjekklista og hugs avkryssingar (lokalt i nettlesaren)
(function(){
  var rows = document.querySelectorAll('tr[data-row]');
  var btns = document.querySelectorAll('.filters button');
  function apply(study){
    btns.forEach(function(b){ b.classList.toggle('on', b.dataset.f === study); });
    rows.forEach(function(r){
      var show = study === 'alle' || (+r.dataset[study] > 0) || (+r.dataset.all > 0 && study !== 'alle');
      r.classList.toggle('hide', !show);
    });
    document.querySelectorAll('tr[data-group]').forEach(function(g){
      var next = g.nextElementSibling, any = false;
      while(next && !next.hasAttribute('data-group')){ if(next.hasAttribute('data-row') && !next.classList.contains('hide')) any = true; next = next.nextElementSibling; }
      g.classList.toggle('hide', !any);
    });
  }
  btns.forEach(function(b){ b.addEventListener('click', function(){ apply(b.dataset.f); }); });
  if(btns.length) apply('alle');
  var key = 'tmr05-' + location.pathname.split('/').pop();
  var boxes = document.querySelectorAll('.todo-list input');
  try{
    var saved = JSON.parse(localStorage.getItem(key) || '{}');
    boxes.forEach(function(c,i){ c.checked = !!saved[i]; });
    boxes.forEach(function(c,i){ c.addEventListener('change', function(){ saved[i] = c.checked; localStorage.setItem(key, JSON.stringify(saved)); }); });
  }catch(e){}
})();
