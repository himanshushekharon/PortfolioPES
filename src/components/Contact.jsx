import React, { useState, useRef } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, User, MessageCircle, AlertCircle, CheckCircle2, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [errors, setErrors] = useState({});
  const form = useRef();

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.subject) tempErrors.subject = "Subject is required";
    if (!formData.message) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setStatus({ ...status, submitted: true });
      
      emailjs.sendForm(
        'service_hima3466',
        'template_0vln7dx', 
        form.current,
        'NuPJvW_NB7TSma7iQ'
      ).then((result) => {
        setStatus({
          submitted: false,
          success: true,
          message: 'Message sent successfully 🚀'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      }, (error) => {
        setStatus({
          submitted: false,
          success: true,
          message: 'Failed to send message ❌'
        });
        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      });
    }
  };

  const contactInfos = [
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "himanshushekharon@gmail.com",
      link: "mailto:himanshushekharon@gmail.com",
      color: "text-[#20A274]"
    },
    {
      icon: <Github size={24} />,
      label: "GitHub",
      value: "himanshushekharon",
      link: "https://github.com/himanshushekharon",
      color: "text-[#24292e] dark:text-gray-100"
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      value: "himanshu-shekhar-38342029a",
      link: "https://linkedin.com/in/himanshu-shekhar-38342029a",
      color: "text-[#0077b5]"
    },
    {
      icon: <MapPin size={24} />,
      label: "Location",
      value: "India",
      link: "#",
      color: "text-[#3197be]"
    }
  ];

  const socialLinks = [
    { icon: <Github size={20} />, link: "https://github.com/himanshushekharon", color: "hover:bg-[#24292e] hover:text-white" },
    { icon: <Linkedin size={20} />, link: "https://linkedin.com/in/himanshu-shekhar-38342029a", color: "hover:bg-[#0077b5] hover:text-white" }
  ];

  return (
    <section id="contact" className="pt-32 pb-24 px-6 relative w-full flex flex-col items-center overflow-hidden z-10">
      {/* Structural glass background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1400px] h-[80%] bg-[#20A274]/5 dark:bg-[#20A274]/2 rounded-[60px] blur-[120px] -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 relative w-full flex flex-col items-center"
      >
        <h2 className="text-[44px] md:text-[54px] font-[900] text-[#2A3B4C] dark:text-gray-100 tracking-[-0.02em] leading-tight">
          Get In <span className="bg-gradient-to-r from-[#20A274] via-[#1C8F65] to-[#3197be] text-transparent bg-clip-text">Touch</span>
        </h2>
        <p className="mt-4 text-[#556987] dark:text-gray-300 text-[18px] font-medium max-w-[600px]">
          Have a project or opportunity? Let's connect and build something amazing together!
        </p>
      </motion.div>

      <div className="max-w-[1240px] w-full flex flex-col lg:flex-row gap-10 lg:gap-16 items-start px-2">
        {/* LEFT SIDE: Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-[38%] flex flex-col gap-8"
        >
          <div className="bg-white/70 dark:bg-[#0a111a]/80 backdrop-blur-2xl rounded-[32px] p-8 border border-white/50 dark:border-white/5 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <h3 className="text-[22px] font-black text-[#2A3B4C] dark:text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#20A274] rounded-full"></span>
              Contact Information
            </h3>

            <div className="flex flex-col gap-8">
              {contactInfos.map((info, i) => (
                <a 
                  key={i} 
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-5 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 flex items-center justify-center ${info.color} shadow-sm group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] dark:group-hover:shadow-[0_8px_20px_rgba(32,162,116,0.1)] transition-all duration-300`}>
                    {info.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-black text-[#819ab7] dark:text-gray-500 uppercase tracking-widest">{info.label}</span>
                    <span className="text-[15px] font-bold text-[#2A3B4C] dark:text-gray-200 group-hover:text-[#20A274] transition-colors break-all">
                      {info.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-gray-100 dark:border-gray-800/50">
              <p className="text-[13px] font-black text-[#819ab7] dark:text-gray-500 uppercase tracking-[0.2em] mb-6 text-center lg:text-left">Follow Me</p>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                {socialLinks.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 flex items-center justify-center text-[#556987] dark:text-gray-400 transition-all duration-300 hover:-translate-y-1.5 shadow-sm ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full lg:w-[62%]"
        >
          <div className="bg-white/70 dark:bg-[#0a111a]/80 backdrop-blur-2xl rounded-[32px] p-8 md:p-10 border border-white/50 dark:border-white/5 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[13px] font-black text-[#2A3B4C] dark:text-gray-300 uppercase tracking-widest px-1 flex items-center gap-2">
                    <User size={14} className="text-[#20A274]" /> Name
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className={`w-full bg-gray-50/50 dark:bg-gray-900/50 border ${errors.name ? 'border-red-400' : 'border-gray-200 dark:border-gray-800'} rounded-2xl px-6 py-4 text-[15px] font-medium text-[#2A3B4C] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-4 focus:ring-[#20A274]/10 focus:border-[#20A274] transition-all duration-300`}
                    />
                    {errors.name && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"><AlertCircle size={18} /></span>
                    )}
                  </div>
                  {errors.name && <p className="text-red-500 text-[11px] font-bold mt-1 px-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[13px] font-black text-[#2A3B4C] dark:text-gray-300 uppercase tracking-widest px-1 flex items-center gap-2">
                    <Mail size={14} className="text-[#20A274]" /> Email Address
                  </label>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className={`w-full bg-gray-50/50 dark:bg-gray-900/50 border ${errors.email ? 'border-red-400' : 'border-gray-200 dark:border-gray-800'} rounded-2xl px-6 py-4 text-[15px] font-medium text-[#2A3B4C] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-4 focus:ring-[#20A274]/10 focus:border-[#20A274] transition-all duration-300`}
                    />
                    {errors.email && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"><AlertCircle size={18} /></span>
                    )}
                  </div>
                  {errors.email && <p className="text-red-500 text-[11px] font-bold mt-1 px-1">{errors.email}</p>}
                </div>
              </div>

              {/* Subject Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-[13px] font-black text-[#2A3B4C] dark:text-gray-300 uppercase tracking-widest px-1 flex items-center gap-2">
                  <Target size={14} className="text-[#20A274]" /> Subject
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What project do you have in mind?"
                    className={`w-full bg-gray-50/50 dark:bg-gray-900/50 border ${errors.subject ? 'border-red-400' : 'border-gray-200 dark:border-gray-800'} rounded-2xl px-6 py-4 text-[15px] font-medium text-[#2A3B4C] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-4 focus:ring-[#20A274]/10 focus:border-[#20A274] transition-all duration-300`}
                  />
                  {errors.subject && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"><AlertCircle size={18} /></span>
                  )}
                </div>
                {errors.subject && <p className="text-red-500 text-[11px] font-bold mt-1 px-1">{errors.subject}</p>}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[13px] font-black text-[#2A3B4C] dark:text-gray-300 uppercase tracking-widest px-1 flex items-center gap-2">
                  <MessageCircle size={14} className="text-[#20A274]" /> Message
                </label>
                <div className="relative">
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell me more about your requirements..."
                    className={`w-full bg-gray-50/50 dark:bg-gray-900/50 border ${errors.message ? 'border-red-400' : 'border-gray-200 dark:border-gray-800'} rounded-2xl px-6 py-4 text-[15px] font-medium text-[#2A3B4C] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-4 focus:ring-[#20A274]/10 focus:border-[#20A274] transition-all duration-300 resize-none`}
                  ></textarea>
                  {errors.message && (
                    <span className="absolute right-4 top-6 text-red-500"><AlertCircle size={18} /></span>
                  )}
                </div>
                {errors.message && <p className="text-red-500 text-[11px] font-bold mt-1 px-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={status.submitted}
                className="mt-2 bg-gradient-to-r from-[#1C8F65] via-[#20A274] to-[#3197be] text-white px-8 py-5 rounded-2xl font-black text-[16px] tracking-wider flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-[0_15px_30px_-10px_rgba(32,162,116,0.5)] dark:shadow-[0_10px_40px_rgba(32,162,116,0.3)] disabled:opacity-70 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status.submitted ? 'Sending...' : 'Send Message'} 🚀
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>

              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/917250213466?text=Hi%20Himanshu,%20I%20would%20like%20to%20connect%20with%20you%20regarding%20your%20portfolio."
                target="_blank"
                rel="noopener noreferrer"
                title="Message me on WhatsApp"
                className="bg-[#25D366] text-white px-8 py-5 rounded-full font-black text-[16px] tracking-wider flex items-center justify-center gap-3 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_30px_rgba(37,211,102,0.5)] group"
              >
                <WhatsAppIcon size={22} className="group-hover:animate-pulse" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Success Message */}
              <AnimatePresence>
                {status.success && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 10 }}
                    className="bg-[#20A274]/10 border border-[#20A274]/20 rounded-2xl p-4 flex items-center gap-3 text-[#15796b] dark:text-[#20A274]"
                  >
                    <CheckCircle2 size={24} />
                    <span className="text-[14px] font-bold">{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
