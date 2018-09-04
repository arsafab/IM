jQuery(document).ready(function($){

	//закрытие модального окна
	$('.close_modal, .overlay').click(function (){
		$('.popup2').css({'opacity':'0', 'visibility':'hidden'});
		$('.popup > .fofm textarea').val('');
		//сброс всех полей формы обраной связи
		$(':input','.fofm').not(':button, :submit, :reset').val('').removeAttr('checked');
	});

	//показ модального окна
	$('.open_modal').click(function (e){
		e.preventDefault();
		$('.overlay').css({'opacity':'1', 'visibility':'visible'});
	});

	//аякс форма обратной связи
	//проверяет какой ответ был получен
	//и в зависимости от ответа
	//выводит информацию о статусе
	//отправки письма
	$(".fofm").submit(function() {
		var str = $(this).serialize();
		$.ajax({
			type: "POST",
			url: "meldung.php",
			data: str,
			success: function(msg) {
				if(msg == 'ok') {
					$('.popup2, .overlay').css('opacity','1');
					$('.popup2, .overlay').css('visibility','visible');
					
				}
				else {
					$('.popup2 .window').html('<h5>Ошибка</h5><p>Сообщение не отправлено, убедитесь в правильности заполнение полей</p>');
				}
			}
		});
		return false;
	});

});