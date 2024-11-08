// Schlüsselpaar generieren
var { pki } = forge;
var keys = pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
var publicKey = keys.publicKey;
var privateKey = keys.privateKey;

document.getElementById('encryptBtn').onclick = function() {
    // Nachricht lesen
    var message = document.getElementById('message').value;
    // Nachricht verschlüsseln
    var encrypted = publicKey.encrypt(message);
    // Ergebnis anzeigen (Base64 kodiert)
    document.getElementById('encryptedMessage').textContent = forge.util.encode64(encrypted);
};

document.getElementById('decryptBtn').onclick = function() {
    // Verschlüsselte Nachricht lesen
    var encryptedMessage = forge.util.decode64(document.getElementById('encryptedMessage').textContent);
    // Nachricht entschlüsseln
    var decrypted = privateKey.decrypt(encryptedMessage);
    // Ergebnis anzeigen
    document.getElementById('decryptedMessage').textContent = decrypted;
};