document.addEventListener("DOMContentLoaded", function () {
  //   console.log("DOM fully loaded");

  // Initialize EmailJS
  try {
    emailjs.init("HKIHFKEi0iW-nIVNn");
    // console.log("EmailJS initialized successfully");
  } catch (error) {
    // console.error("Failed to initialize EmailJS:", error);
  }

  // Toast notification helper
  function showToast(message, success = true) {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: success ? "#4CAF50" : "#F44336",
      stopOnFocus: true,
    }).showToast();
  }

  // Regex email validation
  function isValidEmail(email) {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  // Check if the email is from Google
  function isGoogleEmail(email) {
    const domain = email.split("@")[1];
    const googleDomains = ["gmail.com", "googlemail.com", "google.com"];
    return googleDomains.includes(domain.toLowerCase());
  }

  // Hunter.io API - Email existence check
  async function isEmailDeliverable(email) {
    const apiKey = "9a59ad0e0c7fcccf10da4153e46242df93281397";
    const endpoint = `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(
      email
    )}&api_key=${apiKey}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      //   console.log("Hunter API response:", data);

      return data && data.data && data.data.result === "deliverable";
    } catch (error) {
      //   console.error("Hunter API error:", error);
      return false;
    }
  }

  // Form validation with Hunter check
  async function validateForm() {
    let isValid = true;
    const fields = {
      name: document.getElementById("name"),
      email: document.getElementById("email"),
      subject: document.getElementById("subject"),
      message: document.getElementById("message"),
    };

    // Clear previous errors
    Object.values(fields).forEach((field) => field.classList.remove("error"));

    // Check empty fields
    for (const [key, field] of Object.entries(fields)) {
      if (!field.value.trim()) {
        field.classList.add("error");
        isValid = false;
      }
    }

    if (!isValid) {
      showToast("Please fill in all required fields", false);
      return false;
    }

    const email = fields.email.value.trim();

    if (!isValidEmail(email)) {
      fields.email.classList.add("error");
      showToast("Please enter a valid email address", false);
      return false;
    }

    if (!isGoogleEmail(email)) {
      fields.email.classList.add("error");
      showToast(
        "Invalid email domain. Please use a Google email address.",
        false
      );
      return false;
    }

    const deliverable = await isEmailDeliverable(email);
    if (!deliverable) {
      fields.email.classList.add("error");
      showToast("This email address does not appear to exist.", false);
      return false;
    }

    return true;
  }

  // Send button handler
  const sendBtn = document.getElementById("sendmessage");
  if (sendBtn) {
    sendBtn.addEventListener("click", async function () {
      //   console.log("Send button clicked");

      if (!(await validateForm())) return;

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      sendBtn.disabled = true;
      sendBtn.textContent = "Sending...";

      const templateParams = {
        name,
        email,
        subject,
        message,
        form_subject: "New Contact Form Message",
        time: new Date().toLocaleString(),
      };

      emailjs
        .send("service_4odae7m", "template_wn1nql6", templateParams)
        .then(function (response) {
          //   console.log("SUCCESS!", response.status, response.text);
          showToast("Message sent successfully!");
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("subject").value = "";
          document.getElementById("message").value = "";
        })
        .catch(function (error) {
          //   console.error("FAILED...", error);
          showToast("Failed to send. Please try again later.", false);
        })
        .finally(function () {
          sendBtn.disabled = false;
          sendBtn.textContent = "Send Message";
        });
    });
  } else {
    // console.error("Send button not found!");
  }
});
