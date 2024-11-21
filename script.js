// Function to create JWT Assertion
function createJWTAssertion(issuer, subject, audience, expiry, privateKey) {
    const header = {
        "alg": "RS256",  // Use RS256 algorithm for signing
        "typ": "JWT"     // Set the type to JWT
    };

    // Create the payload with provided values and an expiration time
    const payload = {
        "iss": issuer,
        "sub": subject,
        "aud": audience,
        "exp": Math.round(Date.now() / 1000) + expiry  // expiry in seconds from now
    };

    // Convert the payload to a JSON string
    const payloadString = JSON.stringify(payload);

    // Use the jsrsasign library to sign the JWT with the private key
    const jwt = KJUR.jws.JWS.sign("RS256", header, payloadString, privateKey);

    return jwt;
}

// Event listener for the form submission
document.getElementById('jwtForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values from the form
    const issuer = document.getElementById('issuer').value;
    const subject = document.getElementById('subject').value;
    const audience = document.getElementById('audience').value;
    const expiry = parseInt(document.getElementById('expiry').value);  // Expiry time in seconds
    const privateKey = document.getElementById('privateKey').value;

    // Validate the input (simple check)
    if (!issuer || !subject || !audience || !privateKey || isNaN(expiry)) {
        document.getElementById('jwtOutput').value = "Please fill in all fields correctly.";
        return;
    }

    // Try to generate the JWT and handle any errors
    try {
        const jwt = createJWTAssertion(issuer, subject, audience, expiry, privateKey);
        document.getElementById('jwtOutput').value = jwt;  // Display JWT in the textarea
    } catch (error) {
        document.getElementById('jwtOutput').value = "Error creating JWT: " + error.message;
    }
});
