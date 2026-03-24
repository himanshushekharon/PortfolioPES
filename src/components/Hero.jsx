import React, { useState, useEffect } from 'react';
import { ChevronRight, Github, Linkedin, Mail, Code, Briefcase, FileCode2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.png';

const Typewriter = ({ words }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(handleTyping, 400);
      } else {
        timer = setTimeout(handleTyping, typingSpeed);
      }
    };
    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <span className="relative inline-block">
      {text}
      <span className="absolute -right-2 top-[10%] h-[80%] w-[3px] bg-gradient-to-t from-[#20A274] to-[#3197be] animate-[pulse_1s_ease-in-out_infinite] rounded-full"></span>
    </span>
  );
};

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-16 px-6 relative w-full flex justify-center">
      <div className="container mx-auto max-w-[1240px] flex flex-col md:flex-row items-center justify-between gap-16 md:gap-10 relative">

        {/* Left Image Section */}
        <div className="relative md:w-[42%] flex justify-center mt-6 md:mt-0 order-first md:order-last">
          {/* Added glow effect to the outer container */}
          <div className="w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full p-2 bg-gradient-to-tr from-[#3197be] via-[#2ab19c] to-[#15796b] relative z-10 shadow-[0_0_50px_rgba(32,162,116,0.3)] dark:shadow-[0_0_60px_rgba(32,162,116,0.25)] transition-all duration-500 hover:shadow-[0_0_70px_rgba(32,162,116,0.4)]">
            <div className="w-full h-full rounded-full border-[10px] border-[#F2F9F9] dark:border-[#0e1526] overflow-hidden bg-white dark:bg-[#0f172a] shadow-inner flex items-center justify-center relative">
              <img
                src={profileImg}
                alt="Himanshu Shekhar"
                className="w-full h-full object-cover object-center scale-[1.03] transition-transform duration-700 hover:scale-[1.08]"
              />
            </div>
          </div>

          {/* Decorative Elements around image */}
          <div className="absolute top-10 -left-6 w-16 h-16 decorative-dots z-0"></div>
          <div className="absolute top-4 right-10 w-4 h-4 bg-[#50bce5] rounded-full opacity-60"></div>
          <div className="absolute bottom-16 -right-6 w-8 h-8 bg-[#15796b] rounded-full opacity-30"></div>
          <div className="absolute bottom-4 left-10 w-4 h-4 bg-[#3197be] rounded-full opacity-80"></div>
          <div className="absolute -bottom-8 left-1/2 w-16 h-16 decorative-dots opacity-40"></div>
        </div>

        {/* Right Content Section */}
        <div className="md:w-[58%] text-center md:text-left z-10 flex flex-col justify-center items-center md:items-start pl-0 lg:pl-4">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#20A274]/30 bg-white/50 dark:bg-[#15796b]/10 backdrop-blur-sm shadow-[0_4px_15px_rgba(32,162,116,0.08)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20A274] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#15796b]"></span>
            </span>
            <span className="text-[13px] font-[700] text-[#15796b] dark:text-[#20A274] tracking-wide uppercase">Open to Internships & Opportunities</span>
          </div>

          <h1 className="text-[42px] md:text-[54px] lg:text-[60px] font-[900] text-[#2A3B4C] dark:text-gray-100 leading-[1.15] mb-4 tracking-[-0.02em]">
            Hi, I'm <br className="hidden lg:block" />
            <span className="bg-gradient-to-r from-[#1C8F65] via-[#20A274] to-[#3197be] dark:from-[#20A274] dark:to-[#4bb2df] text-transparent bg-clip-text drop-shadow-sm">Himanshu Shekhar</span>
          </h1>

          {/* Subheading with Typing Animation */}
          <h2 className="text-[22px] md:text-[28px] font-bold text-[#556987] dark:text-gray-300 tracking-wide h-[36px] md:h-[42px] my-2">
            I am a <Typewriter words={['Full Stack Developer', 'MERN Stack Developer', 'Problem Solver']} />
          </h2>

          <p className="mt-6 text-[#556987] dark:text-gray-300 text-[16px] md:text-[17px] leading-[1.7] max-w-[95%] md:max-w-[90%] font-medium">
            B.Tech CSE student specializing in building scalable, high-performance web applications using the <strong className="text-[#15796b] dark:text-[#5FB3A7]">MERN stack</strong>. Strong foundation in Data Structures & Algorithms with a focus on clean, efficient, and maintainable code.
          </p>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4 w-full max-w-[500px]">
            <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl bg-white/60 dark:bg-gray-800/40 border border-[#e2edf2] dark:border-gray-700/50 backdrop-blur-md shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <Code className="text-[#15796b] dark:text-[#20A274] mb-2 w-6 h-6" />
              <span className="font-[900] text-[18px] md:text-[20px] text-[#2A3B4C] dark:text-gray-100 leading-none">400+</span>
              <span className="text-[11px] md:text-[12px] font-bold text-[#819ab7] dark:text-gray-400 mt-1 uppercase tracking-wider text-center">DSA Problems</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl bg-white/60 dark:bg-gray-800/40 border border-[#e2edf2] dark:border-gray-700/50 backdrop-blur-md shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <FileCode2 className="text-[#3197be] dark:text-[#4bb2df] mb-2 w-6 h-6" />
              <span className="font-[900] text-[18px] md:text-[20px] text-[#2A3B4C] dark:text-gray-100 leading-none">MERN</span>
              <span className="text-[11px] md:text-[12px] font-bold text-[#819ab7] dark:text-gray-400 mt-1 uppercase tracking-wider text-center">Developer</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl bg-white/60 dark:bg-gray-800/40 border border-[#e2edf2] dark:border-gray-700/50 backdrop-blur-md shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <Briefcase className="text-[#20A274] dark:text-[#32c993] mb-2 w-6 h-6" />
              <span className="font-[900] text-[18px] md:text-[20px] text-[#2A3B4C] dark:text-gray-100 leading-none">Open</span>
              <span className="text-[11px] md:text-[12px] font-bold text-[#819ab7] dark:text-gray-400 mt-1 uppercase tracking-wider text-center">To Roles</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center md:justify-start gap-4 lg:gap-5 w-full">
            <Link to="/projects" className="bg-gradient-to-r from-[#1C8F65] to-[#20A274] text-white px-8 py-3.5 rounded-[30px] font-bold flex items-center justify-center gap-2 hover:scale-[1.03] transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(21,121,107,0.5)] dark:shadow-[0_0_20px_rgba(32,162,116,0.3)] text-[15px] border border-[#20A274]/50 group">
              View Projects
              <span className="group-hover:translate-x-1 transition-transform inline-block"><ChevronRight size={18} strokeWidth={2.5} /></span>
            </Link>
            <Link to="/contact" className="bg-white/70 dark:bg-gray-800/50 border-[2px] border-[#e2edf2] dark:border-gray-700 text-[#2A3B4C] dark:text-gray-200 px-8 py-3.5 rounded-[30px] font-bold flex items-center justify-center gap-2 hover:border-[#20A274] hover:text-[#15796b] dark:hover:border-[#20A274] dark:hover:text-[#4bb2df] transition-all duration-300 text-[15px] shadow-sm hover:shadow-[0_4px_15px_rgba(32,162,116,0.1)] backdrop-blur-sm group">
              Contact Me
              <span className="group-hover:-translate-y-1 transition-transform inline-block opacity-70 group-hover:opacity-100"><Mail size={18} strokeWidth={2.5} /></span>
            </Link>
          </div>

          {/* Socials */}
          <div className="mt-10 flex items-center justify-center md:justify-start gap-5">
            {[
              { Icon: Linkedin, href: "https://linkedin.com/in/himanshu-shekhar-38342029a", bg: "bg-[#0077b5]" },
              { Icon: Github, href: "https://github.com/himanshushekharon", bg: "bg-[#24292e]" }
            ].map(({ Icon, href, bg }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bg} hover:-translate-y-1 shadow-md transition-all duration-300 border border-white/10 hover:shadow-lg`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
