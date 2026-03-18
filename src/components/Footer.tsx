import { Github, Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'WhatsApp',
      url: 'https://wa.me/584243737586',
      icon: <MessageCircle size={20} />
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/gus_gus1899/',
      icon: <Instagram size={20} />
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100010337793761',
      icon: <Facebook size={20} />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Suggus1899/Suggus1899',
      icon: <Github size={20} />
    }
  ];

  return (
    <footer className="w-full border-t-2 border-zinc-900 dark:border-zinc-100 py-12 px-6 mt-12 bg-zinc-50/95 dark:bg-[#0a0a0a]/95">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-space font-black uppercase text-xl mb-2 text-zinc-900 dark:text-zinc-100">Gustavo Colina (Suggus1899)</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Systems Engineering Student & Backend Developer.
          </p>
        </div>

        <div className="flex gap-4">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="p-3 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-100 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all hover:-translate-y-1"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t-2 border-zinc-900/70 dark:border-zinc-100/70 text-center text-zinc-500 dark:text-zinc-500 text-sm uppercase tracking-[0.08em]">
        <p>© {currentYear} Gustavo Colina. All rights reserved.</p>
      </div>
    </footer>
  );
}
