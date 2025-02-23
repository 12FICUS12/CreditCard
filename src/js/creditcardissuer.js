export default function creditCardIssuer(value) {
	
	const checkStr = value.substring(0, 2);
	
	if (checkStr === '22') {
		return 'mir';
	}

	if (value.startsWith('4')) {
		return 'visa';
	}

	if (['51','52','53','54','55'].includes(checkStr)) {
		return 'mastercard';
	}
	
	if (['34','37'].includes(checkStr)) {
		return 'americanexpress';
	}

	if (['60','62','64','65'].includes(checkStr)) {
		return 'discover';
	}

	if (checkStr === '35') {
		return 'jcb';
	}
	
	if (['30','36'].includes(checkStr)) {
		return 'dinersclub';
	}

	return ''
}