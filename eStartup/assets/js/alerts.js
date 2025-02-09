document.addEventListener('DOMContentLoaded', function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const message1 = urlParams.get('msg');
        const message2 = urlParams.get('msg2');
        const message3 = urlParams.get('msg3');

        const validMessages = {
            // Define valid messages and their corresponding SweetAlert configurations
            "Password updated successfully.": { title: "Success", icon: "success" },
            "OTP verified successfully.": { title: "Success", icon: "success" },
            "Incorrect OTP. Please try again.": { title: "Error", icon: "error" },
            "OTP expired. Please try again.": { title: "Error", icon: "error" },
            "Invalid email or password.": { title: "Error", icon: "error" },
            "Email already exists. Please use a different email.": { title: "Error", icon: "error" },
            "Registration failed. Please try again later.": { title: "Error", icon: "error" },
            "Successfully registered. Kindly check your email for the OTP.": { title: "Success", icon: "success" },
            "Successfully signed in. Kindly check your email for the OTP.": { title: "Success", icon: "success" },
            "Passwords do not match.": { title: "Error", icon: "error" },
            "A code has been sent to your email address": { title: "Success", icon: "success" },
            "Email not found.": { title: "Error", icon: "error" },
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.": { title: "Error", icon: "error" },
            "User approved and registered successfully. Notification sent.": { title: "Success", icon: "success" },
            "User approved and registered successfully. Email notification failed.": { title: "Warning", icon: "warning" },
            "Failed to register the user.": { title: "Error", icon: "error" },
            "Your registration request has been sent for approval.": { title: "Success", icon: "success" },
            "OTP has been resent.": { title: "Success", icon: "success" },
            "Error updating password.": { title: "Success", icon: "success" },
            "Restart the login process.": { title: "Warning", icon: "warning" }
        };

        // Function to show alert
        const showAlert = (message) => {
            if (message && validMessages[message]) {
                Swal.fire({
                    title: validMessages[message].title,
                    text: validMessages[message].text || message,
                    icon: validMessages[message].icon,
                    confirmButtonText: "OK"
                });
            }
        };

        // Show alerts in sequence
        showAlert(message1);
        showAlert(message2);
        showAlert(message3);

    } catch (error) {
        console.error('Error displaying alert:', error);
    }
});

// Function to move to the next input when a digit is entered
function moveToNext(input) {
    if (input.value && input.nextElementSibling) {
        input.nextElementSibling.focus();
    }
}

// Adding 'keydown' event listeners to handle backspace navigation
document.querySelectorAll('.otp-card-inputs input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && !input.value && input.previousElementSibling) {
            input.previousElementSibling.focus();
        }
    });
});

// Function to move to the next input when a digit is entered
function moveToNext(input) {
    if (input.value && input.nextElementSibling) {
        input.nextElementSibling.focus();
    }
}

// Adding 'keydown' event listeners to handle backspace navigation
document.querySelectorAll('.otp-card-inputs input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && !input.value && input.previousElementSibling) {
            input.previousElementSibling.focus();
        }
    });
});
