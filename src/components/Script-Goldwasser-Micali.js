import bigInt from "big-integer";

class GoldwasserMicali {
  constructor(bitLength) {
    this.bitLength = bitLength;
    this.generateKeys();
  }

  generateKeys() {
    this.p = bigInt(67458655117290006585062267020203445094239837645620506977264604450089774418723n);
    this.q = bigInt(75285705057698278676543813191183044751724952854431335109585251335656652137327n);
    this.n = this.p.multiply(this.q);
    do {
      this.y = bigInt.randBetween(2, this.n.minus(1));
    } while (this.jacobiSymbol(this.y, this.n) !== -1);
  }

  generatePrime(bitLength) {
    let prime;
    do {
      prime = bigInt.randBetween(bigInt(2).pow(bitLength - 1), bigInt(2).pow(bitLength).minus(1));
    } while (!prime.isPrime());
    return prime;
  }

  jacobiSymbol(a, n) {
    if (n.isEven()) throw new Error("n must be odd");
    let result = 1;
    if (a.isNegative()) {
      a = a.abs();
      if (n.mod(4).equals(3)) result = -result;
    }
    while (!a.equals(0)) {
      while (a.isEven()) {
        a = a.divide(2);
        const nMod8 = n.mod(8);
        if (nMod8.equals(3) || nMod8.equals(5)) result = -result;
      }
      [a, n] = [n, a];
      if (a.mod(4).equals(3) && n.mod(4).equals(3)) result = -result;
      a = a.mod(n);
    }
    return n.equals(1) ? result : 0;
  }

  encryptBit(bit) {
    const r = bigInt.randBetween(2, this.n.minus(1));
    const c = r.modPow(2, this.n).multiply(this.y.modPow(bit, this.n)).mod(this.n);
    return c;
  }

  encryptMessage(message) {
    const bits = this.stringToBits(message);
    const encryptedBits = bits.map(bit => this.encryptBit(bit));
    return encryptedBits;
  }

  stringToBits(string) {
    return string.split('').reduce((acc, char) => {
      const bits = char.charCodeAt(0).toString(2).padStart(8, '0').split('').map(Number);
      return acc.concat(bits);
    }, []);
  }

  decryptBit(c) {
    const xp = c.modPow(this.p.add(1).divide(4), this.p);
    const xq = c.modPow(this.q.add(1).divide(4), this.q);
    const x = this.crt(xp, xq, this.p, this.q);
    const result = x.modPow(2, this.n).equals(c) ? 0 : 1;
    return result;
  }

  crt(xp, xq, p, q) {
    const cp = q.multiply(q.modInv(p));
    const cq = p.multiply(p.modInv(q));
    const result = xp.multiply(cp).add(xq.multiply(cq)).mod(p.multiply(q));
    return result;
  }

  decryptMessage(encryptedBits) {
    let bits = encryptedBits.map(bit => this.decryptBit(bit));
    return this.bitsToString(bits);
  }

  bitsToString(bits) {
    let bytes = [];
    for (let i = 0; i < bits.length; i += 8) {
      let byte = bits.slice(i, i + 8).join('');
      bytes.push(parseInt(byte, 2));
    }
    return String.fromCharCode(...bytes);
  }
}

export default GoldwasserMicali;
