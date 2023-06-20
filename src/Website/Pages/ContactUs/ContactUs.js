import React, { useState } from "react";
import {AxiosWeb} from "../../../Axios";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosWeb.post("/contact-us", formData);
      // Reset form data on successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message.");
    }
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
          className="contactInput"
          placeholder="Name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
          placeholder="Email"
            type="email"
            id="email"
            name="email"
            className="contactInput"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
          placeholder="Phone"
            type="tel"
            id="phone"
            name="phone"
            className="contactInput"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
          className="contactInput"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          placeholder="Leave your message here..."
            required
          ></textarea>
        </div>
        <button className="contactBtn" type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;