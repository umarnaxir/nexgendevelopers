"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Select from "@/components/ui/Select";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    website: "", // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "app-development", label: "App Development" },
    { value: "ai-ml", label: "AI & ML Solutions" },
    { value: "chatbot", label: "Chatbot Development" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "other", label: "Other Services" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      toast.error("Please enter a valid name");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");

    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    if (!formData.service) {
      toast.error("Please select a service");
      return false;
    }

    if (formData.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify(formData),
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
        duration: 4000,
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
        website: "",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.name === "AbortError"
            ? "Request timed out. Please try again."
            : error.message
          : "Something went wrong.";

      toast.error("Failed to send message", {
        description: message,
      });
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src="/images/common/contact-icon.png"
              alt="Contact"
              width={48}
              height={48}
            />

            <h2 className="text-4xl md:text-5xl font-bold">
              Contact Us
            </h2>
          </div>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready to bring your ideas to life? We're here to help.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-5 py-4 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-5 py-4 border rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full px-5 py-4 border rounded-lg"
            />

            <Select
              options={serviceOptions}
              value={formData.service}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  service: value,
                }))
              }
              placeholder="Select a Service"
              required
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project"
            rows={5}
            required
            className="w-full px-5 py-4 border rounded-lg resize-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-black text-white rounded-lg font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}