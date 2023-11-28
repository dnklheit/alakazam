

export const BASE_URI = 'https://pokeapi.co/api/v2';

export const beautify = (str) => {
    // Değerin tanımlı olup olmadığını ve bir dize olup olmadığını kontrol et
    if (str && typeof str === 'string') {
        let newStr = '';
        const strArr = str.split('-');

        strArr.forEach(s => {
            if (newStr !== '') {
                newStr += ' ';
            }
            newStr += s.charAt(0).toUpperCase() + s.slice(1);
        });

        return newStr;
    } else {
        // Eğer str tanımsız veya bir dize değilse, hata mesajı veya varsayılan değeri döndür
        console.error('Invalid input for beautify function.');
        return str; // veya başka bir değer döndürerek uygun bir duruma getirebilirsiniz
    }
};
