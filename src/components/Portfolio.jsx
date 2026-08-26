import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Mail,
  ExternalLink,
  Star,
  GitFork,
  Menu,
  X,
  Terminal,
  GraduationCap,
  Briefcase,
  Server,
  Layout,
  Boxes,
} from "lucide-react";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";


const PROFILE = {
  name: "Davi Campanaro",
  handle: "Davicsdev",
  roles: [
    "Desenvolvedor Full-Stack",
    "Estudante de Engenharia de Software pela UCB",
    "Entusiasta de inteligência artificial",
    "Criador de conteúdo sobre tecnologia",
  ],
  tagline: "Café convertido em linhas de código funcionais.",
  bio: [
    "Estudante de Engenharia de Software na Universidade Católica de Brasília (UCB), focado em desenvolvimento de sistemas e construção de soluções eficientes e bem estruturadas.",
    "Atualmente, atuo como estagiário na Trix Tecnologia Inteligente na equipe de Análise Técnica, trabalhando diretamente com Java, Oracle SQL e Linux. Também compartilho o que aprendo em vídeos curtos nas redes sociais.",
    "Como Embaixador Estudantil do Google, promovo a inovação e o aprendizado contínuo dentro da comunidade acadêmica, conectando estudantes às tecnologias da empresa.",
  ],
  socials: {
    github: "https://github.com/DaviCSilva12",
    linkedin: "https://linkedin.com/in/davicsdev",
    instagram: "https://instagram.com/davicsdev",
    email: "mailto:davicampanarosilva@gmail.com",
  },
};

const SKILLS = [
  {
    icon: Server,
    title: "Back-end & APIs",
    desc: "Construo a estrutura central e a lógica por trás das aplicações, otimizando a manipulação de dados, rotinas de segurança e o desempenho do sistema.",
    tags: ["Python", "PHP", "Node.js", "Java"],
  },
  {
    icon: Layout,
    title: "Front-end",
    desc: "Interfaces com JavaScript e React, priorizando clareza, acessibilidade e responsividade.",
    tags: ["JavaScript", "React", "HTML/TAWIND CSS"],
  },
  {
    icon: Boxes,
    title: "Infra & DevOps",
    desc: "Padronizo ambientes de desenvolvimento e produção com Docker e Kubernetes, simplificando rotinas de deploy e a gestão da infraestrutura de dados.",
    tags: ["Docker", "Kubernetes", "MySQL", "Git/GitHub"],
  },
];

const TIMELINE = [
  {
    icon: GraduationCap,
    period: "Em andamento",
    title: "Engenharia de Software",
    place: "Universidade Católica de Brasilia",
    desc: "Formação em Engenharia de Software, com foco no desenvolvimento de sistemas, programação, banco de dados e tecnologias voltadas à criação de soluções eficientes. Durante o curso, desenvolvo conhecimentos em análise de requisitos, desenvolvimento de software, arquitetura, testes e metodologias ágeis, além de participar de projetos acadêmicos que fortalecem minha experiência prática e capacidade de resolução de problemas.",
  },
  {
    icon: Briefcase,
    period: "2024",
    title: "Exército Brasileiro",
    place: "Batalhão de Polícia do Exército de Brasília",
    desc: "Minha trajetória inclui a passagem pelo Exército Brasileiro (Batalhão de Polícia do Exército em Brasília, 2024), onde consolidei valores essenciais para minha rotina de trabalho: disciplina rígida, resiliência, liderança e alto espírito de equipe. ",
  },
  {
    icon: GraduationCap,
    period: "2025",
    title: "Curso - Programador de sistemas",
    place: "Senac - DF",
    desc: "O curso de Programador de Sistemas do Senac DF proporciona uma formação prática em desenvolvimento de software, abordando conceitos de programação, banco de dados e desenvolvimento de sistemas. Durante o curso, trabalhamos com tecnologias como Python e MySQL, desenvolvendo habilidades para criar aplicações, estruturar bancos de dados e resolver problemas por meio da programação.",
  },
  {
    icon: Briefcase,
    period: "jan de 2025 - dez de 2025 · 1 ano",
    title: "Estagiário de Desenvolvimento",
    place: "Zansk",
    desc: "Apoiou na criação e manutenção de aplicações internas, além de contribuir com a organização e tratamento de dados para suporte à tomada de decisão. Demonstra proatividade, aprendizado contínuo e interesse em evoluir na área de tecnologia.",
  },
  {
    icon: Briefcase,
    period: "Dez de 2025 - o momento",
    title: "Estagiário de Análise de Sistemas",
    place: "Trix Tecnologia Inteligente",
    desc: "Como estagiário da equipe de Análise Técnica N2 da TRIX Tecnologia Inteligente, apoio a investigação de problemas. No dia a dia, aprendo novas ferramentas, colaboro com os profissionais da equipe e contribuo para melhorar processos e soluções da empresa.",
  },
  {
    icon: GraduationCap,
    period: "Em andamento",
    title: "Embaixador Estudantil Google 2026",
    place: "Google",
    desc: "O Programa Estudantes Embaixadores do Google 2026 é uma comunidade educacional que conecta estudantes de todo o país para trocar experiências e aprendizados práticos sobre o Google Gemini, a inteligência artificial (IA) do Google. É uma jornada prática de capacitação digital e liderança que busca transformar estudantes universitários apaixonados por tecnologia em referências locais de IA.",
  },
];

const PROJECTS = [
  {
    file: "taskflow.php",
    title: "TaskFlow",
    desc: "API REST para gerenciamento de tarefas. Laravel + Docker Compose + MySQL, com autenticação via Sanctum e endpoints CRUD completos.",
    tags: ["Laravel", "Docker", "MySQL", "Kubernetes"],
    repo: "DaviCSilva12/Projeto-TaskFlow",
  },
];

const NAV = [
  { id: "sobre", label: "sobre" },
  { id: "skills", label: "skills" },
  { id: "trajetoria", label: "trajetória" },
  { id: "projetos", label: "projetos" },
  { id: "contato", label: "contato" },
];

const cx = (...c) => c.filter(Boolean).join(" ");

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useTypewriter(words, reduced) {
  const [text, setText] = useState(reduced ? words[0] : "");
  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout;

    const tick = () => {
      const current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex--;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 40 : 70);
    };
    timeout = setTimeout(tick, 70);
    return () => clearTimeout(timeout);
  }, [words, reduced]);
  return text;
}

// Busca dados reais do repositório no GitHub (estrelas / forks).
// Se o repo ainda não existir ou a API falhar, a UI simplesmente
// esconde as estatísticas — não quebra o layout.
function useGithubStats(repo) {
  const [stats, setStats] = useState({
    loading: !!repo,
    error: false,
    stars: null,
    forks: null,
  });
  useEffect(() => {
    if (!repo) {
      setStats({ loading: false, error: false, stars: null, forks: null });
      return;
    }
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((data) => {
        if (!cancelled) {
          setStats({
            loading: false,
            error: false,
            stars: data.stargazers_count,
            forks: data.forks_count,
          });
        }
      })
      .catch(() => {
        if (!cancelled)
          setStats({ loading: false, error: true, stars: null, forks: null });
      });
    return () => {
      cancelled = true;
    };
  }, [repo]);
  return stats;
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const reduced = usePrefersReducedMotion();
  const typed = useTypewriter(PROFILE.roles, reduced);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dark
    ? {
        bg: "bg-zinc-950",
        surface: "bg-zinc-900",
        border: "border-zinc-800",
        text: "text-zinc-100",
        textMuted: "text-zinc-400",
        textFaint: "text-zinc-500",
        accent: "text-emerald-400",
        accentBg: "bg-emerald-500/10",
        chip: "bg-zinc-800 text-zinc-300",
        btnPrimary: "bg-emerald-500 text-zinc-950 hover:bg-emerald-400",
        btnGhost:
          "border-zinc-700 text-zinc-200 hover:border-emerald-500/50 hover:text-emerald-400",
        headerBg: "bg-zinc-950/80",
      }
    : {
        bg: "bg-zinc-50",
        surface: "bg-white",
        border: "border-zinc-200",
        text: "text-zinc-900",
        textMuted: "text-zinc-600",
        textFaint: "text-zinc-500",
        accent: "text-emerald-600",
        accentBg: "bg-emerald-500/10",
        chip: "bg-zinc-100 text-zinc-700",
        btnPrimary: "bg-emerald-600 text-white hover:bg-emerald-500",
        btnGhost:
          "border-zinc-300 text-zinc-700 hover:border-emerald-500/50 hover:text-emerald-600",
        headerBg: "bg-white/80",
      };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div
      className={cx(
        "min-h-screen font-sans transition-colors duration-300",
        t.bg,
        t.text,
      )}
    >
      <style>{`
        @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        .cursor-blink { animation: blink 1s step-end infinite; }
      `}</style>

      {/* NAV */}
      <header
        className={cx(
          "sticky top-0 z-30 backdrop-blur border-b",
          t.border,
          t.headerBg,
        )}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("topo")}
            className={cx(
              "font-mono text-sm sm:text-base font-medium flex items-center gap-2",
              t.text,
            )}
          >
            <Terminal size={18} className={t.accent} />
            {PROFILE.handle}
            <span className={cx("hidden sm:inline", t.textFaint)}>~$</span>
          </button>

          <nav className="hidden md:flex items-center gap-6 font-mono text-sm">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={cx(
                  t.textMuted,
                  "hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded",
                )}
              >
                --{n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Alternar tema"
              className={cx(
                "p-2 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                t.border,
                t.btnGhost,
              )}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={cx("md:hidden p-2 rounded-full border", t.border)}
              aria-label="Abrir menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            className={cx(
              "md:hidden border-t px-5 py-3 flex flex-col gap-3 font-mono text-sm",
              t.border,
            )}
          >
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={cx("text-left", t.textMuted)}
              >
                --{n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main id="topo">
        {/* HERO */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div
            className={cx(
              "rounded-xl border overflow-hidden",
              t.border,
              t.surface,
            )}
          >
            {/* Topo do terminal */}
            <div
              className={cx(
                "flex items-center gap-1.5 px-4 py-2.5 border-b",
                t.border,
              )}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className={cx("ml-3 font-mono text-xs", t.textFaint)}>
                hero.sh
              </span>
            </div>

            {/* Conteúdo: Lado a Lado (Texto na Esquerda, Avatar na Direita) */}
            <div className="p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-8 font-mono text-sm sm:text-base">
              {/* Esquerda: Textos e Botões */}
              <div className="flex-1 text-center sm:text-left">
                <p className={t.textFaint}>$ whoami</p>
                <h1
                  className={cx(
                    "mt-2 text-2xl sm:text-4xl font-semibold tracking-tight",
                    t.text,
                  )}
                >
                  {PROFILE.name}
                  <span className={t.accent}>.</span>
                </h1>
                <p className={cx("mt-3 h-6", t.accent)}>
                  <span>{typed}</span>
                  <span className="cursor-blink">▍</span>
                </p>
                <p
                  className={cx(
                    "mt-6 max-w-xl leading-relaxed font-sans text-base",
                    t.textMuted,
                  )}
                >
                  {PROFILE.tagline}
                </p>
                <div className="mt-8 flex flex-wrap justify-center sm:justify-start gap-3 font-sans">
                  <button
                    onClick={() => scrollTo("projetos")}
                    className={cx(
                      "px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                      t.btnPrimary,
                    )}
                  >
                    Ver projetos
                  </button>
                  <button
                    onClick={() => scrollTo("contato")}
                    className={cx(
                      "px-5 py-2.5 rounded-lg text-sm font-medium border transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                      t.btnGhost,
                    )}
                  >
                    Falar comigo
                  </button>
                </div>
              </div>

              {/* Direita: Avatar Centralizado no Círculo com Efeitos Neon/Glow */}
              <div className="shrink-0 group cursor-default">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-emerald-500/50 p-2.5 bg-emerald-500/10 flex items-center justify-center overflow-hidden transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-emerald-400 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]">
                  <img
                    src="/pixel.png"
                    alt={PROFILE.name}
                    className="w-full h-full object-contain object-center rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 relative -top-1 -left-0.5"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20"
        >
          <SectionHeader eyebrow="$ ls skills/" title="Tech Stack" t={t} />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {SKILLS.map((s) => (
              <div
                key={s.title}
                className={cx(
                  "rounded-xl border p-6 transition-colors",
                  t.border,
                  t.surface,
                )}
              >
                <s.icon size={20} className={t.accent} />
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className={cx("mt-2 text-sm leading-relaxed", t.textMuted)}>
                  {s.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cx(
                        "text-xs font-mono px-2 py-0.5 rounded",
                        t.chip,
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SOBRE */}
        <section
          id="sobre"
          className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20"
        >
          <SectionHeader eyebrow="$ cat sobre.md" title="Sobre mim" t={t} />
          <div
            className={cx(
              "mt-8 rounded-xl border p-6 sm:p-8",
              t.border,
              t.surface,
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cx(
                  "w-12 h-12 shrink-0 rounded-lg flex items-center justify-center font-mono font-semibold border",
                  t.border,
                  t.accentBg,
                  t.accent,
                )}
              >
                {PROFILE.name[0]}
              </div>
              <div>
                {PROFILE.bio.map((p, i) => (
                  <p
                    key={i}
                    className={cx(
                      "leading-relaxed",
                      t.textMuted,
                      i > 0 && "mt-4",
                    )}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRAJETÓRIA */}
        <section
          id="trajetoria"
          className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20"
        >
          <SectionHeader
            eyebrow="$ history --academico"
            title="Trajetória"
            t={t}
          />
          <div className="mt-8">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className={cx(
                      "w-9 h-9 rounded-full border flex items-center justify-center shrink-0",
                      t.border,
                      t.accentBg,
                    )}
                  >
                    <item.icon size={16} className={t.accent} />
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div
                      className={cx("w-px flex-1 my-1 border-l", t.border)}
                    />
                  )}
                </div>
                <div
                  className={cx("pb-8", i === TIMELINE.length - 1 && "pb-0")}
                >
                  <span className={cx("font-mono text-xs", t.textFaint)}>
                    {item.period}
                  </span>
                  <h3 className="font-semibold mt-0.5">{item.title}</h3>
                  <p className={cx("text-sm", t.textFaint)}>{item.place}</p>
                  <p
                    className={cx(
                      "mt-1.5 text-sm leading-relaxed max-w-xl",
                      t.textMuted,
                    )}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJETOS */}
        <section
          id="projetos"
          className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20"
        >
          <SectionHeader
            eyebrow="$ ls projetos/"
            title="Principais Projetos"
            t={t}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} project={p} t={t} />
            ))}
          </div>
        </section>

        {/* CONTATO */}
        <section
          id="contato"
          className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24"
        >
          <div
            className={cx(
              "rounded-xl border p-8 sm:p-12 text-center",
              t.border,
              t.surface,
            )}
          >
            <p className={cx("font-mono text-xs", t.accent)}>
              $ contact --info
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">
              Vamos conversar?
            </h2>
            <p className={cx("mt-3 max-w-md mx-auto", t.textMuted)}>
              Aberto a trocas de conhecimento, conversas sobre o mercado de TI e
              novas conexões com desenvolvedores e entusiastas de tecnologia.
            </p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <SocialIcon
                href={PROFILE.socials.github}
                label="GitHub"
                icon={FaGithub}
                t={t}
              />
              <SocialIcon
                href={PROFILE.socials.linkedin}
                label="LinkedIn"
                icon={FaLinkedin}
                t={t}
              />
              <SocialIcon
                href={PROFILE.socials.instagram}
                label="Instagram"
                icon={FaInstagram}
                t={t}
              />
              <SocialIcon
                href={PROFILE.socials.email}
                label="E-mail"
                icon={Mail}
                t={t}
              />
            </div>
          </div>
        </section>
      </main>

      <footer
        className={cx(
          "border-t py-8 text-center font-mono text-xs",
          t.border,
          t.textFaint,
        )}
      >
        © {new Date().getFullYear()} {PROFILE.name} — construído com React &
        café
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title, t }) {
  return (
    <div>
      <p className={cx("font-mono text-xs", t.accent)}>{eyebrow}</p>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function SocialIcon({ href, label, icon: Icon, t }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={cx(
        "p-3 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
        t.border,
        t.btnGhost,
      )}
    >
      <Icon size={18} color="currentColor" />
    </a>
  );
}

function ProjectCard({ project, t }) {
  const stats = useGithubStats(project.repo);
  return (
    <div
      className={cx(
        "rounded-xl border overflow-hidden flex flex-col",
        t.border,
        t.surface,
      )}
    >
      <div
        className={cx(
          "flex items-center gap-1.5 px-4 py-2.5 border-b",
          t.border,
        )}
      >
        <span className="w-2 h-2 rounded-full bg-red-500/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <span className="w-2 h-2 rounded-full bg-green-500/70" />
        <span className={cx("ml-3 font-mono text-xs truncate", t.textFaint)}>
          {project.file}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold">{project.title}</h3>
        <p className={cx("mt-2 text-sm leading-relaxed flex-1", t.textMuted)}>
          {project.desc}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cx("text-xs font-mono px-2 py-0.5 rounded", t.chip)}
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className={cx(
            "mt-5 pt-4 border-t flex items-center justify-between",
            t.border,
          )}
        >
          <div className="flex items-center gap-3 text-xs font-mono">
            {!stats.loading && !stats.error && stats.stars !== null && (
              <>
                <span className={cx("flex items-center gap-1", t.textFaint)}>
                  <Star size={13} /> {stats.stars}
                </span>
                <span className={cx("flex items-center gap-1", t.textFaint)}>
                  <GitFork size={13} /> {stats.forks}
                </span>
              </>
            )}
          </div>
          {project.repo && (
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noreferrer"
              className={cx(
                "flex items-center gap-1.5 text-sm font-medium hover:underline",
                t.accent,
              )}
            >
              <FaGithub size={15} color="currentColor" /> <span>Código</span>{" "}
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
