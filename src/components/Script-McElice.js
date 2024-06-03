import { mceliece } from "mceliece-js";
import { Buffer } from "buffer";

class McElice {
    
    genKey() {
        const { publicKey, privateKey } = mceliece.keyPair();
        return { publicKey, privateKey };
    }

    encrypt(text, publicKey) {
        const plaintext = Buffer.from(text, 'utf8');
        const ciphertext = mceliece.encrypt(plaintext, publicKey);
        console.log('Encrypted Text', ciphertext);
        return ciphertext;
    }

    decrypt(ciphertext, privateKey) {
        console.log('Cipher Text:', ciphertext);
        const decrypted = mceliece.decrypt(ciphertext, privateKey);
        return Buffer.from(decrypted).toString('utf8');
    }
}

const mcel = new McElice();
export default mcel;