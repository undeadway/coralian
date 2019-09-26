var WHITE = {
	background: '#FFFFFF'
},
	RED = {
		background: '#FF0000'
	};

function validateBlur($$, index) {
	$$.css(index, WHITE);
}

function validateFocus($$, index) {
	$$.event(index, 'focus');
}

function validateOnError($$, index, message) {
	if (!message) return;

	$$.css(index, RED);
	alert(message);
	validateFocus($$, index);
}

exports = module.exports = {
	onError: validateOnError,
	blur: validateBlur,
	focus: validateFocus
};