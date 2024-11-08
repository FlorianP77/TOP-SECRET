function encrypt (text, publicKey, modulo) {

    m = text

    if (m >= modulo) {
        console.error("FEHLER!")
    }



    const encryptedText = fastExponation(m, publicKey, modulo) //Verschlüsselte Nachricht
    console.log(encryptedText)


    return encryptedText
}