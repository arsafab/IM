//= ../../node_modules/jquery/dist/jquery.min.js
//= bootstrap.js
//= pushy.js
//= ajax.js



const windowWidth = document.documentElement.clientWidth;

// search
$(function(){
  $('.search').on('click', function(){
    $('.searchShow').show('slow');
    $('.searchShow2').show();
    $('.search').hide();
  });
})

// button in jumbotron in index.html to scroll down
$('#down').click(function() {
	$('body,html').animate({scrollTop:750},800);
}); 

//header fixed

(function(){  // анонимная функция (function(){ })(), чтобы переменные "a" и "b" не стали глобальными
  var a = document.querySelector('#contactInfo'), b = null;  // селектор блока, который нужно закрепить
  window.addEventListener('scroll', Ascroll, false);
  document.body.addEventListener('scroll', Ascroll, false);  // если у html и body высота равна 100%

  function Ascroll() {
    if (b == null) {  // добавить потомка-обёртку, чтобы убрать зависимость с соседями
      
      var Sa = getComputedStyle(a, ''), s = '';
      for (var i = 0; i < Sa.length; i++) {  // перечислить стили CSS, которые нужно скопировать с родителя
        if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('background') == 0) {
          s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
        }
      }

      b = document.createElement('div');  // создать потомка
      b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
      a.insertBefore(b, a.firstChild);  // поместить потомка в цепляющийся блок первым
      
      var l = a.childNodes.length;
      
      for (var i = 1; i < l; i++) {  // переместить во вновь созданного потомка всех остальных потомков (итого: создан потомок-обёртка, внутри которого по прежнему работают скрипты)
        b.appendChild(a.childNodes[1]);
      }

      a.style.height = b.getBoundingClientRect().height + 'px';  // если под скользящим элементом есть другие блоки, можно своё значение
      a.style.padding = '0';
      a.style.border = '0';  // если элементу присвоен padding или border
    }

    if (a.getBoundingClientRect().top <= 0) { // elem.getBoundingClientRect() возвращает в px координаты элемента относительно верхнего левого угла области просмотра окна браузера
      b.className = 'fixed';
    } else {
      b.className = '';
    }

    window.addEventListener('resize', function() {
      a.children[0].style.width = getComputedStyle(a, '').width
    }, false);  // если изменить размер окна браузера, измениться ширина элемента
  }
})()




 /*$(function($) {
	$(window).scroll(function(){
		if($(this).scrollTop() > 600){
			$('#contactInfo').addClass('fixed');
			$('.bgMenu').addClass('marg');
		} else if ($(this).scrollTop() < 600){
			$('#contactInfo').removeClass('fixed');
			$('.bgMenu').removeClass('marg');
		}
	})
})*/


//hide search in header for mobile
$(function($) {
	$(window).scroll(function(){
		if($(this).scrollTop() > 1 && windowWidth <= 767){
			$('.searchHeader').addClass('none');
		} else if ($(this).scrollTop() < 1 && windowWidth <= 767){
			$('.searchHeader').removeClass('none');
		}
	})
})


//stop carousel in mobile, index.html
if(windowWidth <= 600) {
	$("#carousel-example-generic").data('interval', false);
	$("#carousel-example-generic_2").data('interval', false);
}

// toTop button
$(document).ready(function(){
     $(window).scroll(function() {
        if($(this).scrollTop() > 100) {
            $('#toTop').fadeIn();
        } else{
            $('#toTop').fadeOut();
        }
    })
})

$('#toTop').click(function() {
	$('body,html').animate({scrollTop:0},800);
})

// toggle meny transform hamburger

$(document).ready(function () {
  $(".navbar-toggle").on("click", function () {
    $(this).toggleClass("active");
  });
});


// fixed left sidebar by scrolling

  // pages which haven't left sidebar form
  var href = window.location.href;
	var a = document.querySelector('#leftFeedback'), b = null, P = 100;

if(a !== null){
	window.addEventListener('scroll', Ascroll, false);
	document.body.addEventListener('scroll', Ascroll, false);
}

function Ascroll() {
  if (b == null && a !== null) {
    var Sa = getComputedStyle(a, ''), s = '';
    for (var i = 0; i < Sa.length; i++) {
      if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
        s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
      }
    }
    b = document.createElement('div');
    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
    a.insertBefore(b, a.firstChild);
    var l = a.childNodes.length;
    for (var i = 1; i < l; i++) {
      b.appendChild(a.childNodes[1]);
    }
    a.style.height = b.getBoundingClientRect().height + 'px';
    a.style.padding = '0';
    a.style.border = '0';
    a.style.background = 'none';
  }
  var Ra = a.getBoundingClientRect(),
      R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('#footer').getBoundingClientRect().bottom + 460);
  if ((Ra.top - P) <= 0) {
    if ((Ra.top - P) <= R) {
      b.className = 'stop';
      b.style.top = - R +'px';
    } else {
      b.className = 'sticky';
      b.style.top = P + 'px';
    }
  } else {
    b.className = '';
    b.style.top = '';
    a.style.background = '$mainColor';
  }
  window.addEventListener('resize', function() {
    a.children[0].style.width = getComputedStyle(a, '').width
  }, false);
}

// left sidebar hide by width less than 992px

if(windowWidth <= 991) {
  $('.left nav').addClass('pushy pushy-left');
  $('.leftNav').addClass('pushy-content');
  $('.leftNav li').addClass('pushy-link');
} else {
  $('.left nav').removeClass('pushy pushy-left');
  $('.leftNav').removeClass('pushy-content');
  $('.leftNav li').removeClass('pushy-link');
}

// non-click logo in home page
if(href === 'https://israel-medical.info/') {
  $(".logo a").css({"pointer-events":"none", "cursor":"default"});
}

//digital watch in footer

setInterval(function () {  
  var date = new Date();  
  var h = date.getUTCHours();  
  var m = date.getUTCMinutes();

  var month = date.getUTCMonth();

  if(month >= 9) h += 2;
  if(month < 9) h += 3;  
  
  var h = (h < 10) ? '0' + h : h;  
  var m = (m < 10) ? '0' + m : m;  
  
  document.getElementById('time').innerHTML = h + ':' + m;  
}, 1000);  
