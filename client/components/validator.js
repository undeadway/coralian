const WHITE = {
	background: '#FFFFFF'
},
	RED = {
		background: '#FF0000'
	};

function validateBlur(key) {
	$(`#${key}`).css(WHITE);
}

function validateFocus(key) {
	$(`#${key}`).focus();
}

function validateOnError({ key, msg }) {
	if (!msg) return;

	let $$ = $(`#${key}`);

	$$.css(RED);
	alert(msg);
	$$.focus();

	$$.on('blur', function () {
		if (!String.isEmpty($$.val())) {
			$$.css(WHITE);
		}
	});
}

module.exports = exports = {
	onError: validateOnError,
	blur: validateBlur,
	focus: validateFocus
};