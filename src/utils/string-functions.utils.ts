export function replaceAccentedCharacters(value: string) {
    const accentedCharacters = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'à': 'a',
        'è': 'e',
        'ì': 'i',
        'ò': 'o',
        'ù': 'u',
        'ã': 'a',
        'õ': 'o',
        'â': 'a',
        'ê': 'e',
        'î': 'i',
        'ô': 'o',
        'û': 'u',
        'ä': 'a',
        'ë': 'e',
        'ï': 'i',
        'ö': 'o',
        'ü': 'u',
        'ç': 'c',
        'ñ': 'n'
    };

    if (!value) return value;

    return value.toLowerCase().replace(/[áàãâäéèêëíìîïóòõôöúùûüçñ]/g, function (match) {
        return accentedCharacters[match];
    });
}

export function firstCharacterUpperCase(value: string) {
    if (!value) return value;

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
