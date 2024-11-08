function decrypt(text, privateKey, modulo) {
    console.log("modulo:", modulo)
    console.log("Eingangstext:", text);
    console.log("Privater Schlüssel:", privateKey);
    
    const mD = fastExponation(text, privateKey, modulo); // Entschlüsselte Nachricht

    console.log("mD:", mD.toString())




    const mDString = mD.toString();

    // Erzeuge ein Byte-Array, indem du jeweils 3 Stellen als Dezimalzahlen nimmst
    const byteArray = [];
    for (let i = 0; i < mDString.length; i += 3) {
        const byteString = mDString.slice(i, i + 3);
        byteArray.push(parseInt(byteString, 10));
    }

    // Erzeuge ein Uint8Array aus dem Byte-Array für die Dekodierung
    const byteUint8Array = Uint8Array.from(byteArray);

    // Verwende TextDecoder, um das Byte-Array in den ursprünglichen Text umzuwandeln
    const decoder = new TextDecoder();
    const decryptedText = decoder.decode(byteUint8Array);
    
    return decryptedText;
}