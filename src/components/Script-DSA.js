const forge = require('node-forge')


class Script_DSA {


    generateKeys() {
        const keypair = forge.pki.rsa.generateKeyPair(2048);
        const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
        const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        return { publicKey, privateKey };
    }

    createSignature(data) {
        const privateKey = forge.pki.privateKeyFromPem(this.privateKey);
        const md = forge.md.sha256.create();
        md.update(data, 'utf8');
        const signature = privateKey.sign(md);
        return forge.util.encode64(signature);
    }

    verifySignature(signature, data) {
        const publicKey = forge.pki.publicKeyFromPem(this.publicKey);
        const md = forge.md.sha256.create();
        md.update(data, 'utf8');
        const signatureBytes = forge.util.decode64(signature);

        return publicKey.verify(md.digest().bytes(), signatureBytes);
    }
}

const dsa = new Script_DSA();
export default dsa;