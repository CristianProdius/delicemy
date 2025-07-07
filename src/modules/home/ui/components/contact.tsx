"use client";
import { motion } from "motion/react";
import { JSX, useState } from "react";
import { ContactSection } from "@/types/contact-section";
import { showToast } from "@/components/ui/toast";

interface ContactProps {
  content: ContactSection;
}

// Social media icons
const socialIcons: { [key: string]: JSX.Element } = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export default function Contact({ content }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use content from Strapi or fallback to empty string
  const title = content?.title;
  const titleHighlight = content?.titleHighlight;
  const description = content?.description;
  const formTitle = content?.formTitle;
  const formSubtitle = content?.formSubtitle;
  const formNameLabel = content?.formNameLabel;
  const formNamePlaceholder = content?.formNamePlaceholder;
  const formEmailLabel = content?.formEmailLabel;
  const formEmailPlaceholder = content?.formEmailPlaceholder;
  const formPhoneLabel = content?.formPhoneLabel;
  const formPhonePlaceholder = content?.formPhonePlaceholder;
  const formSubjectLabel = content?.formSubjectLabel;
  const formSubjectPlaceholder = content?.formSubjectPlaceholder;
  const formMessageLabel = content?.formMessageLabel;
  const formMessagePlaceholder = content?.formMessagePlaceholder;
  const formSubmitButton = content?.formSubmitButton;
  const formSubmittingText = content?.formSubmittingText;
  const formSuccessMessage = content?.formSuccessMessage;
  const formErrorMessage = content?.formErrorMessage;
  const infoTitle = content?.infoTitle;
  const infoSubtitle = content?.infoSubtitle;
  const phoneLabel = content?.phoneLabel;
  const phone = content.phone;
  const phoneAvailability = content?.phoneAvailability;
  const emailLabel = content?.emailLabel;
  const email = content?.email;
  const emailResponseTime = content?.emailResponseTime;
  const locationLabel = content?.locationLabel;
  const addressLine1 = content?.addressLine1;
  const addressLine2 = content?.addressLine2;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        showToast({
          message:
            formSuccessMessage || "Your message has been sent successfully.",
          type: "success",
        });
      } else {
        throw new Error(data.error || "Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showToast({
        message:
          formErrorMessage ||
          "There was an error submitting your message. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-light text-neutral-800 mb-6 tracking-tight"
          >
            {title}
            <br />
            <span className="font-medium text-[#B8956A]">{titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-light text-neutral-800 mb-2">
                {formTitle}
              </h3>
              <p className="text-neutral-600">{formSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-neutral-700"
                >
                  {formNameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white/80 backdrop-blur-sm focus:border-[#B8956A] focus:ring-2 focus:ring-[#B8956A]/20 transition-all duration-300 outline-none text-neutral-800 placeholder:text-neutral-400"
                  placeholder={formNamePlaceholder}
                />
              </div>

              {/* Email and Phone Fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-neutral-700"
                  >
                    {formEmailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white/80 backdrop-blur-sm focus:border-[#B8956A] focus:ring-2 focus:ring-[#B8956A]/20 transition-all duration-300 outline-none text-neutral-800 placeholder:text-neutral-400"
                    placeholder={formEmailPlaceholder}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-neutral-700"
                  >
                    {formPhoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white/80 backdrop-blur-sm focus:border-[#B8956A] focus:ring-2 focus:ring-[#B8956A]/20 transition-all duration-300 outline-none text-neutral-800 placeholder:text-neutral-400"
                    placeholder={formPhonePlaceholder}
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-neutral-700"
                >
                  {formSubjectLabel}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white/80 backdrop-blur-sm focus:border-[#B8956A] focus:ring-2 focus:ring-[#B8956A]/20 transition-all duration-300 outline-none text-neutral-800 placeholder:text-neutral-400"
                  placeholder={formSubjectPlaceholder}
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-neutral-700"
                >
                  {formMessageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white/80 backdrop-blur-sm focus:border-[#B8956A] focus:ring-2 focus:ring-[#B8956A]/20 transition-all duration-300 outline-none text-neutral-800 placeholder:text-neutral-400 resize-none"
                  placeholder={formMessagePlaceholder}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-[#B8956A] text-white font-medium hover:bg-[#A67E52] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {formSubmittingText}
                  </span>
                ) : (
                  formSubmitButton
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-light text-neutral-800 mb-2">
                {infoTitle}
              </h3>
              <p className="text-neutral-600">{infoSubtitle}</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Primary Contact Info */}
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#B8956A]/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B8956A]/20 to-[#A67E52]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-[#B8956A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-1">
                      {phoneLabel}
                    </h4>
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="text-neutral-600 hover:text-[#B8956A] transition-colors"
                    >
                      {phone}
                    </a>
                    <p className="text-sm text-neutral-500">
                      {phoneAvailability}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#B8956A]/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B8956A]/20 to-[#A67E52]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-[#B8956A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-1">
                      {emailLabel}
                    </h4>
                    <a
                      href={`mailto:${email}`}
                      className="text-neutral-600 hover:text-[#B8956A] transition-colors"
                    >
                      {email}
                    </a>
                    <p className="text-sm text-neutral-500">
                      {emailResponseTime}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#B8956A]/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B8956A]/20 to-[#A67E52]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-[#B8956A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-1">
                      {locationLabel}
                    </h4>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        addressLine1 + " " + addressLine2
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 hover:text-[#B8956A] transition-colors"
                    >
                      <p>{addressLine1}</p>
                      <p>{addressLine2}</p>
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              {content?.businessHours && content.businessHours.length > 0 && (
                <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#B8956A]/10">
                  <h4 className="font-medium text-neutral-800 mb-3">
                    Business Hours
                  </h4>
                  <div className="space-y-2">
                    {content.businessHours.map((hours) => (
                      <div
                        key={hours.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-neutral-600">{hours.day}</span>
                        <span className="text-neutral-800">
                          {hours.isClosed
                            ? "Closed"
                            : `${hours.openTime} - ${hours.closeTime}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Media Links */}
              {content?.socialLinks && content.socialLinks.length > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-neutral-700">
                    Follow us:
                  </span>
                  <div className="flex gap-3">
                    {content.socialLinks.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/60 backdrop-blur-sm border border-[#B8956A]/10 rounded-full flex items-center justify-center text-neutral-600 hover:text-[#B8956A] hover:border-[#B8956A]/30 transition-all duration-300"
                        aria-label={`Follow us on ${social.platform}`}
                      >
                        {socialIcons[social.platform.toLowerCase()] || (
                          <span className="text-xs">{social.platform[0]}</span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Multiple Locations */}
            {content?.locations && content.locations.length > 1 && (
              <div className="mt-8">
                <h4 className="font-medium text-neutral-800 mb-4">
                  Other Locations
                </h4>
                <div className="space-y-4">
                  {content.locations
                    .filter((loc) => !loc.isPrimary)
                    .map((location) => (
                      <div
                        key={location.id}
                        className="p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-[#B8956A]/10"
                      >
                        <h5 className="font-medium text-neutral-800 mb-2">
                          {location.name}
                        </h5>
                        <div className="space-y-1 text-sm text-neutral-600">
                          <p>{location.addressLine1}</p>
                          <p>{location.addressLine2}</p>
                          {location.phone && (
                            <a
                              href={`tel:${location.phone.replace(/\D/g, "")}`}
                              className="hover:text-[#B8956A]"
                            >
                              {location.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
