const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function encrypt(message, shiftValue) {
    let encryptedMessage = "";
    let count = 0; // To count letters added to encryptedMessage
    for (let i = 0; i < message.length; i++) {
        let letter = message[i];
        let lowerCaseLetter = letter.toLowerCase();
        if (alphabet.includes(lowerCaseLetter)) {
            // Shift the letter
            let oldIndex = alphabet.indexOf(lowerCaseLetter);
            let shiftedIndex = (oldIndex + shiftValue) % alphabet.length;
            let shiftedLetter = alphabet[shiftedIndex];
            
            // Preserve the case of the original letter
            if (letter === letter.toUpperCase()) {
                shiftedLetter = shiftedLetter.toUpperCase();
            }
            
            encryptedMessage += shiftedLetter;
            count++;
            
            // Insert a random letter after every two characters
            if (count % 2 === 0) {
                let randomIndex = Math.floor(Math.random() * alphabet.length);
                let randomLetter = alphabet[randomIndex];
                // Random letter is always lowercase
                encryptedMessage += randomLetter;
            }
        } else {
            // Pass non-alphabet characters as is
            encryptedMessage += letter;
        }
    }
    return encryptedMessage;
}

function decrypt(encryptedMessage, shiftValue) {
    let decryptedMessage = "";
    let count = 0; // To count letters added to decryptedMessage
    let originalLetterCount = 0; // To keep track of the original letters

    for (let i = 0; i < encryptedMessage.length; i++) {
        let encLetter = encryptedMessage[i];
        let lowerCaseEncLetter = encLetter.toLowerCase();
        if (alphabet.includes(lowerCaseEncLetter)) {
            originalLetterCount++;

            // Skip the random letter after every two original characters
            if (originalLetterCount % 3 === 0) {
                continue;
            }

            let encrIndex = alphabet.indexOf(lowerCaseEncLetter);
            let decryptedIndex = (encrIndex - shiftValue + alphabet.length) % alphabet.length;
            let decryptedLetter = alphabet[decryptedIndex];

            // Preserve the case of the encrypted letter
            if (encLetter === encLetter.toUpperCase()) {
                decryptedLetter = decryptedLetter.toUpperCase();
            }

            decryptedMessage += decryptedLetter;
        } else {
            // Pass non-alphabet characters as is
            decryptedMessage += encLetter;
        }
    }
    return decryptedMessage; // Ensure we return the decrypted message
}

const inputs = [
    "Alex Turok",
    "Karim Fawaz",
    "Magna enim veniam ullamco id fugiat ex eu non id voluptate est dolor pariatur. At consequat esse excepteur aliquip nulla aute incididunt qui elit: tempor officia occaecat aliqua!\nAmet culpa incididunt mollit et qui nulla do duis irure ut eu fugiat pariatur aute.",
];

inputs.forEach((input, idx) => {
    console.log("Input:", idx, input);
    const encrypted = encrypt(input, 4);
    console.log("Encrypted:", encrypted);
    const decrypted = decrypt(encrypted, 4);
    console.log("Decrypted:", decrypted);
    console.log("Match: ", input === decrypted ? "✅" : "❌");
});
