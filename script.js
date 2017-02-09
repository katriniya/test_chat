function login(){
	console.log(name);
	$('.first_page').hide();
	$('.chat').show();


}
$(document).ready(function () {
 	
	var name = document.getElementById('login').value;
	$('.chat .nick').text(name);
	$('.chat_header p').append(', '+name);
	var messages = $("#messages");
	var message_txt = $("#message_text")
	var socket = io.connect('http://digitaldali-test-chat.azurewebsites.net/');
        function msg(nick, message) {
            var m = '<div class="msg">' +
                    '<span class="user">' + safe(nick) + ':</span> '
                    + safe(message) +
                    '</div>';
            messages
                    .append(m)
                    .scrollTop(messages[0].scrollHeight);
        }
 
        function msg_system(message) {
            var m = '<div class="msg system">' + safe(message) + '</div>';
            messages
                    .append(m)
                    .scrollTop(messages[0].scrollHeight);
        }
 
 
        socket.on('message', function (data) {
            msg(data.name, data.message);
            message_txt.focus();
        });
 
        $("#message_btn").click(function () {
            var text = $("#message_text").val();
            if (text.length <= 0)
                return;
            message_txt.val("");
            socket.emit("message", {message: text, name: name});
        });
 
        function safe(str) {
            return str.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');
        }
    });