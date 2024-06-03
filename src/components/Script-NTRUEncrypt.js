const bigInt = require('big-integer');

class Polynomial {
    constructor(coeffs) {
        this.coeffs = coeffs;
    }

    add(other) {
        let result = [];
        let maxLength = Math.max(this.coeffs.length, other.coeffs.length);
        for (let i = 0; i < maxLength; i++) {
            let coeff1 = this.coeffs[i] || bigInt(0);
            let coeff2 = other.coeffs[i] || bigInt(0);
            result[i] = coeff1.add(coeff2);
        }
        return new Polynomial(result);
    }

    mul(other) {
        console.log('Cerrent coeffs other:', other.coeffs)
        let result = Array(this.coeffs.length + other.coeffs.length - 1).fill(bigInt(0));
        for (let i = 0; i < this.coeffs.length; i++) {
            for (let j = 0; j < other.coeffs.length; j++) {
                result[i + j] = result[i + j].add(this.coeffs[i].multiply(other.coeffs[j]));
            }
        }
        return new Polynomial(result);
    }

    mod(q) {
        let result = this.coeffs.map(c => c.mod(q));
        return new Polynomial(result);
    }
}

class NTRU {
    constructor(N, p, q) {
        this.N = bigInt(N);
        this.p = bigInt(p);
        this.q = bigInt(q);
    }

    generateKeys() {
        let f = this.randomPolynomial(this.N, this.q);
        let g = this.randomPolynomial(this.N, this.q);

        let fqInv = this.modInversePolynomial(f, this.q);
        let fpInv = this.modInversePolynomial(f, this.p);

        let h = this.polynomialMod(this.polynomialMul(fqInv, g), this.q);

        return { publicKey: h, privateKey: { f, fpInv } };
    }

    encrypt(message, publicKey) {
        let r = this.randomPolynomial(this.N, this.q);
        let m = this.messageToPolynomial(message);

        let e = this.polynomialMod(this.polynomialAdd(this.polynomialMul(r, publicKey), m), this.q);
        
        return e;
    }

    decrypt(ciphertext, privateKey) {
        let { f, fpInv } = privateKey;

        let a = this.polynomialMod(this.polynomialMul(f, ciphertext), this.q);

        let m = this.polynomialMod(this.polynomialMul(fpInv, a), this.p);
        
        return this.polynomialToMessage(m);
    }

    randomPolynomial(N, q) {
        let coeffs = [];
        for (let i = 0; i < N; i++) {
            coeffs.push(bigInt.randBetween(0, q - 1));
        }
        return new Polynomial(coeffs);
    }

    polynomialMul(a, b) {
        return a.mul(b);
    }

    polynomialAdd(a, b) {
        return a.add(b);
    }

    polynomialMod(a, q) {
        return a.mod(q);
    }

    modInversePolynomial(a, q) {
        let coeffs = a.coeffs.map(coeff => this.modInverse(coeff, q));
        return new Polynomial(coeffs);
    }

    modInverse(a, q) {
        let t = bigInt(0), newT = bigInt(1);
        let r = q, newR = a;

        while (!newR.equals(0)) {
            let quotient = r.divide(newR);
            [t, newT] = [newT, t.subtract(quotient.multiply(newT))];
            [r, newR] = [newR, r.subtract(quotient.multiply(newR))];
        }

        if (t.compare(0) < 0) {
            t = t.add(q);
        }

        return t;
    }

    messageToPolynomial(message) {
        let coeffs = message.split('').map(c => bigInt(c.charCodeAt(0)));
        return new Polynomial(coeffs);
    }

    polynomialToMessage(poly) {
        return poly.coeffs.map(c => String.fromCharCode(c.valueOf())).join('');
    }
}

let ntru = new NTRU(11, 3, 32);
export default  ntru;