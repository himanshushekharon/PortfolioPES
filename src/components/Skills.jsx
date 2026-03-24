import React, { useState } from 'react';

const getIcon = (url, fallback) => {
  return <img src={url} alt={fallback} className="w-10 h-10 object-contain drop-shadow-sm" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />;
};

const skillsData = [
  // Languages
  { category: 'Languages', name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { category: 'Languages', name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { category: 'Languages', name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { category: 'Languages', name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { category: 'Languages', name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { category: 'Languages', name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { category: 'Languages', name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  
  // Frontend
  { category: 'Frontend', name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { category: 'Frontend', name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { category: 'Frontend', name: 'React.js (Vite)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { category: 'Frontend', name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { category: 'Frontend', name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { category: 'Frontend', name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },

  // Backend
  { category: 'Backend', name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg' },
  { category: 'Backend', name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
  { category: 'Backend', name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },

  // Tools & Core
  { category: 'Tools & Core', name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { category: 'Tools & Core', name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { category: 'Tools & Core', name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { category: 'Tools & Core', name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { category: 'Tools & Core', name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { category: 'Tools & Core', name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
  { category: 'Tools & Core', name: 'Render', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-render-logo-icon-download-in-svg-png-gif-file-formats--brand-brands-logos-icons-3629007.png' },

  // Core CS
  { category: 'Tools & Core', name: 'Data Structures & Algorithms', icon: 'https://cdn-icons-png.flaticon.com/512/8112/8112705.png' },
  { category: 'Tools & Core', name: 'Object-Oriented Programming', icon: 'https://cdn-icons-png.flaticon.com/512/4248/4248301.png' },
  { category: 'Tools & Core', name: 'DBMS', icon: 'https://cdn-icons-png.flaticon.com/512/10051/10051268.png' },
  { category: 'Tools & Core', name: 'Operating Systems', icon: 'https://cdn-icons-png.flaticon.com/512/2000/2000412.png' },
  { category: 'Tools & Core', name: 'System Design', icon: 'https://cdn-icons-png.flaticon.com/512/7991/7991055.png' }
];

const categories = ['All', 'Frontend', 'Backend', 'Languages', 'Tools & Core'];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = skillsData.filter(skill => 
    activeCategory === 'All' ? true : skill.category === activeCategory
  );

  return (
    <section id="skills" className="pt-24 pb-16 px-6 relative w-full flex flex-col items-center z-10">
      <div className="text-center mb-12 relative w-full flex flex-col items-center">
        <h2 className="text-[44px] md:text-[54px] font-[900] text-[#2A3B4C] dark:text-gray-100 tracking-[-0.02em]">
          Technical <span className="gradient-text-teal">Arsenal</span>
        </h2>
        <p className="mt-4 text-[#556987] dark:text-gray-300 text-[17px] font-[500] leading-[1.6] text-center max-w-[500px]">
          Showcasing my skills, tools, and technologies that drive impactful development.
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 right-10 w-3 h-3 bg-[#15796b] rounded-full opacity-40"></div>
      <div className="absolute bottom-20 left-10 w-4 h-4 bg-[#3197be] rounded-full opacity-60"></div>
      <div className="absolute top-1/3 left-4 w-12 h-12 decorative-dots opacity-40"></div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12 max-w-[900px]">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-[700] text-[14px] tracking-wide transition-all duration-300 border shadow-sm ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#1C8F65] to-[#20A274] text-white border-transparent shadow-[0_0_15px_rgba(32,162,116,0.4)]'
                : 'bg-white/70 dark:bg-[#0f172a]/70 text-[#556987] dark:text-gray-300 border-gray-200 dark:border-gray-700/50 hover:border-[#20A274]/50 hover:text-[#15796b] dark:hover:text-[#5FB3A7] backdrop-blur-md'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1100px] w-full px-2">
        {filteredSkills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="group bg-white/70 dark:bg-[#0a111a]/80 backdrop-blur-xl rounded-[20px] p-6 flex flex-col items-center text-center shadow-lg dark:shadow-[0_0_20px_rgba(32,162,116,0.03)] border-[1.5px] border-white/50 dark:border-white/5 hover:border-[#68c6b7]/60 dark:hover:border-[#20A274]/50 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(36,157,139,0.2)] dark:hover:shadow-[0_0_25px_rgba(32,162,116,0.15)] transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#F2F9F9] dark:bg-[#0f172a] border border-[#edf4f4] dark:border-gray-800 flex items-center justify-center mb-4 text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm text-[#2A3B4C] dark:text-gray-100 font-extrabold flex-shrink-0">
              {getIcon(skill.icon, skill.name)}
              <span className="hidden drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">{skill.name[0]}</span>
            </div>
            <h4 className="font-[800] text-[#2A3B4C] dark:text-gray-200 text-[15px] tracking-[0.02em] group-hover:text-[#15796b] dark:group-hover:text-[#5FB3A7] transition-colors leading-tight">
              {skill.name}
            </h4>
            <p className="text-[12px] font-[600] text-[#819ab7] dark:text-gray-500 mt-2 uppercase tracking-wider">
              {skill.category}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
