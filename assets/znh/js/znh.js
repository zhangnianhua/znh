/**
 *
 *
 */
 jQuery(function( $ ) {
 	$('.nav-sidebar').find('a').click(function() {
 		$('.nav-sidebar').find('li').removeClass('active');
 		$(this).parent().addClass('active');
 	})

 	$('.page-tab').on('click',  'li > a', function(event) {
 		event.stopPropagation();
 		$(this).parent().prev().trigger('click');
 		var container_id = $(this).parent().attr('ref-container');
 		$(this).parent().remove();
 		$('#' + container_id).remove();
 	})

 	$('.page-tab').on('click', 'li', function() {
 		var container_id = $(this).attr('ref-container');
 		$('.page-tab li').removeClass('active');
 		$(this).addClass('active');
 		$('#container div').hide();
 		$('#' + container_id).show();
 	})

 	$('a').click(function() {
 		var url = $(this).attr('href');
 		var targ = $(this).attr('targ');
 		if (url == '#' || url == 'javascript:;' || targ == 'new_blank') {
 			return true;
 		}
 		open_tab($(this).attr('href'), $(this).attr('page-name'), $(this).attr('page-id'));
 		return false;
 	})

 	function open_tab(url, name, tab_id) {
 		var lis = $('.page-tab').find('li');
 		var ret = false;
 		for (var i = 0; i < lis.length; i++) {
 			var container_id = lis[i].getAttribute('ref-container')
 			if (container_id == tab_id) {
 				ret = true;
 				break;
 			}
 		}
 		
 		if (ret == false && url != undefined && url != '#' && url != 'javascript:;') {
 			var _tab = "<li ref-container='" + tab_id + "' href='" + url +"'><span>" + name + "</span><a href='javascript:;' class='glyphicon glyphicon-remove close'></a></li>";
 			$('.page-tab').append(_tab);
 			add_container(url, tab_id);
 		}
 		$("li[ref-container='" + tab_id + "']").trigger('click');
 	}

 	function add_container(url, id) {
 		var container = "<div id='" + id + "'><iframe src='" + url + "' style='min-height:1000px; width:100%; border:0px'></iframe></div>";
 		$('#container').append(container);
 	}

 	$('form').submit(function() {
 		var target = $(this).attr('target');
 		var url = $(this).attr('action');
 		var type = $(this).attr('method');
 		var param = $(this).serializeArray();
 		if (target == 'ajax') {
 			$.ajax({
 				url : url,
 				type : type,
 				data : param,
 				dataType : 'json',
 				success : function(result) {
 					var code = result.code;
 					var message = result.message;
 					open_message_dialog(message, code);
 				}
 			})
 			return false;
 		} else if (target == 'direct') {
 			return true;
 		}

 	})

 });

var close_dialog = function() {
	$(window.document).find('.dialog').remove();
	$(window.document).find('.mask').remove();
}

var open_form_dialog = function(url, isMask, title) {
	var mask = "<div class='mask'></div>";
	var dialog = "<div class='dialog'><div class='dialog-header'>" + title + "<a href='javascript:;' onclick='close_dialog()' class='dialog-close glyphicon glyphicon-remove close'></a><iframe src='" + url + "' class='dialog-container'></iframe></div>";
	$(window.parent.document).find("body").append(mask).append(dialog);
}

var open_message_dialog = function(message, code) {
	if (code == 200) {
		var message_dialog = "<div class='message-dialog'><div class='message-dialog-header'>操作成功</div><div class='message-dialog-message'>" + message + "</div></div>";
		$(window.parent.document).find('body').append(message_dialog);
		setTimeout('close_message_dialog()', 3000);
	} else {
		var message_dialog = "<div class='message-dialog message-error'><div class='message-dialog-header '>操作失败</div><div class='message-dialog-message'>" + message + "</div></div>";
		$(window.parent.document).find('body').append(message_dialog);
	}
}

var close_message_dialog = function() {
	$(window.parent.document).find('body').find('.message-dialog').remove();
}







