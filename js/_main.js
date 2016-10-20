

$( document ).ready(function() {
	console.log('documnt ready');
	
	/* Mobile detect */
	mobile_detect();	

	initMobileMenu();

	var windowSizeInit = $(window).width();
	var windowSizeEnd = $(window).width();
	
	function checkWidth() {
		windowSizeEnd = $(window).width();

		/* Inicio y pantalla >= 768 */
		if( windowSizeInit == windowSizeEnd && windowSizeInit >= 768 ){
			console.log('768px');
			//dropdown_aply();
		} else{

		}
		/* Cambio de pantalla < 768 a pantalla >= 768 */
		if ( windowSizeInit < windowSizeEnd && windowSizeEnd >= 768 && windowSizeInit < 768 ) {
			console.log('cambio a ordenador');
			/* MENU */
			//dropdown_aply();

		}
		/* Cambio de pantalla > 768 a pantalla =< 768 */
		else if( windowSizeInit > windowSizeEnd && windowSizeEnd < 768 && windowSizeInit >= 768 ){
			console.log('Cambio a móvil');
			/* MENU */
			// menuDiv.find('li').each(function() {
				
			// 	var isDropdown = $( this ).data('dropdown');
			// 	if( isDropdown ){
			// 		$(this).removeClass('dropdown');
			// 	}

			// });

		}

		windowSizeInit = $(window).width();
	}

	// Execute on load
  checkWidth();
  // Bind event listener
  $(window).resize(checkWidth);

});

function initMobileMenu(){
	if( $('body').hasClass('mobile') ){
		myMenu();
	}
}

function myMenu(){
	var myMenu = 	new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ), {
		type : 'cover'
	} );
}

function mobile_detect(){

	var device = '', _ipad = 'ipad', _iphone = 'iphone', ua = navigator.userAgent.toLowerCase();

	if( ua.indexOf(_ipad) != -1 )
	   device = 'ios tablet ' + _ipad;
	else if( ua.indexOf(_iphone) != -1 )
	   device = 'ios mobile ' + _iphone;
	else if( ua.match(/android/) )
	{
	   device = 'android';
	   if(ua.indexOf('mobile')==-1)
	       device += ' tablet';
	   else
	       device += ' mobile';
	}
	if(device)
	{
		device = 'touch ' + device;
		document.getElementsByTagName("body")[0].className += ' ' + device;
	}
}

function dropdown_aply(){
	var menuDiv = $('.mp-menu');

	var cl =  $('*[class*="mp-"]').attr("class").split(" ");
  var newcl =[];
  for(var i=0;i<cl.length;i++){
      r = cl[i].search(/mp-/);
      if(r)newcl[newcl.length] = cl[i];
  }
  $('*[class*="mp-"]').removeClass().addClass(newcl.join(" "));  

	menuDiv.find('li').each(function() {

		var isDropdown = $( this ).data('dropdown');
		var isDropdownSubmenu = $( this ).data('dropdown-submenu');

		if( isDropdown ){
			$(this).addClass('dropdown');
			var aDropdown = $(this).find('a').first();
			var ulDropdown = $(this).find('ul').first();
			aDropdown.addClass('dropdown-toggle');
			aDropdown.attr({
				'data-toggle': 'dropdown',
				'role': 'button',
				'aria-haspopup': 'true',
				'aria-expanded': 'false'
			});
			ulDropdown.addClass('dropdown-menu');

			/* sube un nivel el ul y elimina el resto */
			var $div = $(this).find('div');
			$div.before(function () {
				return $(this).children("ul");
	    });
	    $div.remove();
		}
		else if( isDropdownSubmenu ){
			$(this).addClass('dropdown-submenu');
			var aDropdown = $(this).find('a').first();
			var ulDropdown = $(this).find('ul').first();
			aDropdown.addClass('dropdown-toggle');
			aDropdown.attr({
				'data-toggle': 'dropdown'
			});
			ulDropdown.addClass('dropdown-menu');

			/* sube un nivel el ul y elimina el resto */
			var $div = $(this).find('div');
			$div.before(function () {
				return $(this).children("ul");
	    });
	    $div.remove();
		}

	});
}
