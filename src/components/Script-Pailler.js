const bigInt = require('big-integer');

class Paillier {
  constructor(bitLength = 512) {
    this.bitLength = bitLength;
    this.generateKeys();
  }

  generateKeys() {
    const p = this.generatePrime(this.bitLength / 2);
    const q = this.generatePrime(this.bitLength / 2);
    const n = p.multiply(q);
    const lambda = this.lcm(p.subtract(1), q.subtract(1));
    const g = n.add(1);
    const mu = this.modInverse(lambda, n);

    this.publicKey = { n, g };
    this.privateKey = { lambda, mu };
  }

  generatePrime(bitLength) {
    let prime;
    do {
      prime = bigInt.randBetween(bigInt(2).pow(bitLength - 1), bigInt(2).pow(bitLength).subtract(1));
    } while (!prime.isProbablePrime());
    return prime;
  }

  gcd(a, b) {
    while (!b.equals(0)) {
      [a, b] = [b, a.mod(b)];
    }
    return a;
  }

  lcm(a, b) {
    return a.multiply(b).divide(this.gcd(a, b));
  }

  modInverse(a, m) {
    const m0 = m;
    let [x0, x1] = [bigInt(0), bigInt(1)];
    if (m.equals(1)) return bigInt(0);
    while (a.greater(1)) {
      const q = a.divide(m);
      [m, a] = [a.mod(m), m];
      [x0, x1] = [x1.subtract(q.multiply(x0)), x0];
    }
    if (x1.lesser(0)) x1 = x1.add(m0);
    return x1;
  }

  encrypt(m) {
    const { n, g } = this.publicKey;
    const n2 = n.multiply(n);
    const r = bigInt.randBetween(1, n.subtract(1));
    return g.modPow(m, n2).multiply(r.modPow(n, n2)).mod(n2);
  }

  decrypt(c) {
    const { n } = this.publicKey;
    const { lambda, mu } = this.privateKey;
    const n2 = n.multiply(n);
    const u = c.modPow(lambda, n2).subtract(1).divide(n).multiply(mu).mod(n);
    return u;
  }

  textToBigInt(text) {
    let hex = '';
    for (let i = 0; i < text.length; i++) {
      hex += text.charCodeAt(i).toString(16).padStart(4, '0');
    }
    console.log(hex);
    return bigInt(hex, 16);
  }

  bigIntToText(bigint) {
    let hex = '00' + bigint.toString(16);
    console.log(hex);
    let str = '';
    for (let i = 0; i < hex.length; i += 4) {
      str += String.fromCharCode(parseInt(hex.substr(i, 4), 16));
      console.log(str);
    }
    return str;
  }
}

const paillier = new Paillier();
export default paillier