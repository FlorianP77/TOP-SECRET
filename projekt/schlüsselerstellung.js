function createKey(keyLength, tests){
    //Geheime Primzahlen
    const p = generatePrime(keyLength, tests) 
    const q = generatePrime(keyLength, tests)

    //let p = primes1024[Math.floor(Math.random() * primes1024.length)];
    //let q = primes1024[Math.floor(Math.random() * primes1024.length)];

    //while (p === q) {
    //    q = primes512[Math.floor(Math.random() * primes512.length)];
    //}

    //let p = BigInt(147895456043302603369524513702996224038374151157180890637876411841393874108449917447809385866471569681997460505379709348961685528791395898939228308267725439669338506836483173484422235064997051761979309217806806176105893797091398894952188957139415104063912251501439245743657030642227393688678562537141908518399)
    //let q = BigInt(113896526436669746458326846526603074977282235841373331717287269097050543572466217682418055324548918858328175772274203558485535719644377766698450823389243879207100737149955636353688557430218946240069413141805019318838175539332468371654540205920277756972154817607585651323852394952476343628395447440422054627319)

    console.log(p.toString(), q.toString())

    const n = p * q //Berechnen des Modulos

    const phiN = (p - BigInt(1)) * (q - BigInt(1)) // Eulerische Funktion von N

    const e = BigInt(65537) //Öffentlicher Exponent

    const d = modInverse(e, phiN) //Privater Schlüssel

    return {
        publicKey: e,
        privateKey: d,
        modulo: n,
        primeP: p,
        primeQ: q
    }
}    


function modInverse(a, m) {


    let m0 = m
    let t
    let q;
    let x0 = BigInt(0)
    let x1 = BigInt(1);

    if (m === BigInt(1)){
        return BigInt(0);
    }

    while (a > BigInt(1)) {

        q = a / m;

        t = m;
        m = a % m;
        a = t;

        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }


    if (x1 < BigInt(0)) {
        x1 += m0;
    }

    return x1;
}


function fastExponation (base, exponent, modulo) {

    let result = BigInt(1);

    while (exponent > BigInt(0)) {
        while ((exponent % BigInt(2) === BigInt(0))) {
            exponent = exponent / BigInt(2);
            base = (base * base) % modulo
        }

        exponent -= BigInt(1)

        result = (result * base) % modulo
    }
    
    return result;
}