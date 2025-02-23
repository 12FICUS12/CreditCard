export default function isValidLuhn(value) {
    
    let sum = 0;
    if (value.length < 13 || value.length > 19) return false;


	for (let i = 0; i < value.length; i += 1) {
		let digit = Number(value[i]);
		if (i % 2 === 0) {
			digit = digit * 2;
			if (digit > 9) {
				digit = (digit % 10) + 1;
			}
		}
		sum += digit;
	}	
	
	return (sum % 10 ===0)
	
}