const inputField = document.getElementById('inputField');
const outputTextElement = document.getElementById('outputText');
const submitButton = document.getElementById('submitButton');
const encryptedMessageElement = document.getElementById('encryptedMessage');
const decryptButton = document.getElementById('decryptButton');
const decryptedMessageTitle = document.getElementById('decryptedMessageTitle');
const decryptedMessageElement = document.getElementById('decryptedMessage');
const messageBinaryElement = document.getElementById('messageBinary');
const messageDecimalElement = document.getElementById('messageDecimal');



const keyLength = 2048
const testNumber = 5

let keyData = createKey(keyLength, testNumber)

let encryptedText

messageBinaryElement.textContent = '...'
messageDecimalElement.textContent = '...'
encryptedMessageElement.textContent = '...'
decryptedMessageElement.textContent = '...'



submitButton.addEventListener('click', function() {
    const originalText = inputField.value;

    const binaryString = textToBinary(originalText); 

    messageBinaryElement.textContent = binaryString;

    
    const encoder = new TextEncoder();
    const byteArray = encoder.encode(originalText);

    const decimalText = Array.from(byteArray, byte => byte.toString(10).padStart(3, '0')).join('');

    messageDecimalElement.textContent = decimalText.toString()

    const m = BigInt(decimalText)
    
    encryptedText = encrypt(m, keyData.publicKey, keyData.modulo)


    const encryptedTextHex = encryptedText.toString(16)

    encryptedMessageElement.textContent = encryptedTextHex

    inputField.value = ''; 

    decryptedMessageElement.textContent = '...'

});

decryptButton.addEventListener('click', function() {
    
    const decryptedText = decrypt(encryptedText, keyData.privateKey, keyData.modulo)

    decryptedMessageElement.textContent = decryptedText;
});


function textToBinary(text) {
    let binaryString = '';
    for (let i = 0; i < text.length; i++) {
        // Wandelt jedes Zeichen in Binär um und fügt es zum Gesamtstring hinzu
        const charCode = text.charCodeAt(i); // Holt den Unicode-Wert des Zeichens
        const binaryChar = charCode.toString(2).padStart(8, '0'); // Umwandlung in 8-Bit Binär
        binaryString += binaryChar + ' '; // Hängt jedes Binärbit an den String an
    }
    return binaryString.trim(); // Entfernt das letzte Leerzeichen
}



function showNumber(numberType) {
    let number;
    
    if (numberType === 'p') {
        number = keyData.primeP;
    } else if (numberType === 'q') {
        number = keyData.primeQ;
    }
    else if (numberType === 'n') {
        number = keyData.modulo
    }
    const newTab = window.open(); 
    newTab.document.write('<p>' + number.toString() + '</p>');
}