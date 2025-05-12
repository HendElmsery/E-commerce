import React from "react";
import { useState } from "react";
function Contact() {
  return (
    <div>
      <p className="text-center text-muted mt-5">
        <strong className="d-block fs-4 text-primary">
          Get in Touch with Us
        </strong>
        <span className="d-block fs-6 mt-2">
          We’re here to help! Whether you have questions about our products,
          need assistance with an order, or simply want to share your feedback,
          we’d love to hear from you.
        </span>
        <span className="d-block fs-6 mt-2">
          Our customer service team is dedicated to providing you with the best
          experience possible, and we’re always ready to assist you with any
          inquiries. Feel free to reach out to us through the contact form
          below, or get in touch via email or phone.
        </span>
        <span className="d-block fs-6 mt-2">
          Your satisfaction is our priority, and we’re excited to assist you on
          your shopping journey!
        </span>
      </p>
    </div>
  );
}

export default Contact;
