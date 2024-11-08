function millerRabinTest(n, k) {

    let r = 0;
    let d = n - BigInt(1);
    
    while (d % BigInt(2) === BigInt(0)) {
        d = d / BigInt(2);
        r += 1;
    }


    for (let i = 0; i < k; i++) {

        
        let a = getRandomBigInt(BigInt(1), n - BigInt(1))


        let x = powerMod(a, d, n);
        
        if (x === BigInt(1) || x === n - BigInt(1)) continue;

        let isComposite = true;
        for (let j = 0; j < r - 1; j++) {
            x = powerMod(x, BigInt(2), n);
            if (x === n - BigInt(1)) {
                isComposite = false;
                break;
            }
        }

        if (isComposite) return false;
    }

    return true;
}


function powerMod(base, exponent, modulus) {
    let result = BigInt(1);
    base = base % modulus; // Modulo-Reduzierung
    
    while (exponent > 0) {
        if (exponent % BigInt(2) === BigInt(1)) {
            result = (result * base) % modulus; // Multiplikation und Modulo
        }
        exponent = exponent / BigInt(2); // exponent durch 2 teilen
        base = (base * base) % modulus; // Basis quadrieren und Modulo
    }
    
    return result;
}

function getRandomBigInt(min, max) {
    const range = max - min + BigInt(1);
    let randomValue;

    do {
        const byteLength = Math.ceil(range.toString(2).length / 8);
        const randomBytes = new Uint8Array(byteLength);
        window.crypto.getRandomValues(randomBytes);


        randomValue = BigInt('0x' + Array.from(randomBytes).map(byte => byte.toString(16).padStart(2, '0')).join(''));
    } while (randomValue >= range); 

    return min + randomValue;
}




function getPossibleBigInt(bits) {
    const bytes = Math.ceil(bits / 8);
    const randomBytes = new Uint8Array(bytes);
    window.crypto.getRandomValues(randomBytes);

    randomBytes[0] |= 0x80;

    let possibleBigInt = BigInt(0);
    for (let byte of randomBytes) {
        possibleBigInt = (possibleBigInt << BigInt(8)) | BigInt(byte);
    }

    if (possibleBigInt % BigInt(2) === 0) {
        possibleBigInt += BigInt(1)
    }

    if (possibleBigInt % BigInt(5)) {
        let c = Math.random(4)
        if (c === 0){
            possibleBigInt -= BigInt(4);
        }
        else if (c === 1){
            possibleBigInt -= BigInt(2);
        }
        else if (c === 2){
            possibleBigInt += BigInt(2);
        }
        else if (c === 3){
            possibleBigInt += BigInt(4);
        }

    }
    
    return possibleBigInt;
}



function isDivisibleBySmallPrimes(n, smallPrimes) {
    for (const prime of smallPrimes) {
        if (n % BigInt(prime) === BigInt(0)) {
            return true; // Die Zahl ist teilbar durch einen kleinen Primfaktor
        }
    }
    return false; // Die Zahl ist nicht teilbar durch kleine Primzahlen
}


function generatePrime(bits, k) {
    let repetitions = 100000


    for (let i = 0; i < 10; i++) {
        let prime = getPossibleBigInt(bits);

        for (let i = 0; i < repetitions + 1; i++) {
            if (!millerRabinTest(prime, k)) {
                prime += BigInt(2)
                if (prime % BigInt(5)) {
                    prime += BigInt(2)
                }
            }
            
            else {
                return prime;
            }
        }
    }

    console.error("FEHLER!!!")

    return 0
    
}


