import { useEffect, useState } from 'react'
import {
  Github,
  Linkedin,
  ExternalLink,
  Server,
  Database,
  TestTube2,
  Cloud,
  Send,
  Download,
  Menu,
  X
} from 'lucide-react'

const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

const projectImages = {
  NexaPay: '/projects/nexapay.svg',
  InnovationHub: '/projects/innovationhub.svg',
  'SentinelFraud Platform': '/projects/sentinelfraud.svg',
  'TenantGuard Cloud': '/projects/tenantguard.svg',
  'FraudShield AI': '/projects/fraudshield.svg',
  RotaCerta: '/projects/rotacerta.svg'
}

function App() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('Carregando projetos...')
  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [feedback, setFeedback] = useState('')
  const [sending, setSending] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/projects`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Erro ao carregar projetos')
          }

          return res.json()
        })
        .then(data => {
          setProjects(data)
          setStatus('')
        })
        .catch(() => {
          setStatus(
              'Não foi possível carregar os projetos. Verifique a API Java.'
          )
        })
  }, [])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setMenuOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setSending(true)
    setFeedback('Enviando...')

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      })

      const data = await response.json()

      if (!response.ok) {
        setFeedback(data.message || 'Não foi possível enviar a mensagem.')
        return
      }

      setFeedback(data.message)

      setContact({
        name: '',
        email: '',
        message: ''
      })
    } catch {
      setFeedback(
          'Não foi possível enviar a mensagem agora. Tente novamente em alguns instantes.'
      )
    } finally {
      setSending(false)
    }
  }

  return (
      <div className="page">

        <header className="header">

          <div className="container nav">

            <a
                className="logo"
                href="#inicio"
                onClick={closeMenu}
            >
              JFC<span>.</span>
            </a>

            <button
                className="menu-button"
                type="button"
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menuOpen}
                aria-controls="main-navigation"
                onClick={() => setMenuOpen(prev => !prev)}
            >
              {menuOpen
                  ? <X size={26} />
                  : <Menu size={26} />
              }
            </button>

            <nav
                id="main-navigation"
                className={`nav-links ${menuOpen ? 'open' : ''}`}
            >

              <a
                  href="#sobre"
                  onClick={closeMenu}
              >
                Sobre
              </a>

              <a
                  href="#stack"
                  onClick={closeMenu}
              >
                Stack
              </a>

              <a
                  href="#projetos"
                  onClick={closeMenu}
              >
                Projetos
              </a>

              <a
                  href="#arquitetura"
                  onClick={closeMenu}
              >
                Arquitetura
              </a>

              <a
                  href="#formacao"
                  onClick={closeMenu}
              >
                Formação
              </a>

              <a
                  href="#experiencia"
                  onClick={closeMenu}
              >
                Experiência
              </a>

              <a
                  href="#contato"
                  onClick={closeMenu}
              >
                Contato
              </a>

            </nav>

          </div>

        </header>

        {menuOpen && (
            <button
                className="menu-backdrop"
                type="button"
                aria-label="Fechar menu"
                onClick={closeMenu}
            />
        )}

        <main>

          <section
              className="hero container"
              id="inicio"
          >

            <div className="hero-copy">

            <span className="eyebrow">
              JAVA BACKEND • DADOS • QA
            </span>

              <h1>

                Backend robusto.

                <br />

                Dados confiáveis.

                <br />

                <span>
                Software com qualidade.
              </span>

              </h1>

              <p>

                Sou <strong>Jucelio Farias Coelho</strong>,
                profissional de tecnologia com foco em Java 21,
                Spring Boot, APIs REST, microsserviços,
                bancos de dados, engenharia de dados,
                testes automatizados e cloud.

              </p>

              <div className="actions">

                <a
                    className="btn primary"
                    href="#projetos"
                >
                  Ver projetos
                </a>

                <a
                    className="btn"
                    href={`${API_URL}/resume`}
                >
                  <Download size={18} />
                  Baixar currículo
                </a>

                <a
                    className="btn"
                    href="https://github.com/juceliocoelho2022"
                    target="_blank"
                    rel="noreferrer"
                >

                  <Github size={18} />

                  GitHub

                </a>

                <a
                    className="btn"
                    href="https://www.linkedin.com/in/jucelio-desenvolvedor-sistema"
                    target="_blank"
                    rel="noreferrer"
                >

                  <Linkedin size={18} />

                  LinkedIn

                </a>

              </div>

            </div>

            <div className="code-card">

              <div className="dots">

                <i></i>

                <i></i>

                <i></i>

              </div>

              <pre>
{`$ java --version
openjdk 21

$ stack --backend
Spring Boot
REST APIs
Kafka
PostgreSQL
Redis
Docker

$ quality
JUnit 5
Mockito
MockMvc
JaCoCo

$ status
Open to Work ✓`}
            </pre>

            </div>

          </section>

          <section className="professional-highlights container" aria-label="Destaques profissionais">
            <div className="highlight-chip">
              <strong>Java 21</strong>
              <span>Backend moderno</span>
            </div>
            <div className="highlight-chip">
              <strong>Spring Boot</strong>
              <span>APIs e microsserviços</span>
            </div>
            <div className="highlight-chip">
              <strong>Kafka</strong>
              <span>Event-driven</span>
            </div>
            <div className="highlight-chip">
              <strong>PostgreSQL</strong>
              <span>Dados confiáveis</span>
            </div>
            <div className="highlight-chip">
              <strong>Docker</strong>
              <span>Ambientes reproduzíveis</span>
            </div>
            <div className="highlight-chip">
              <strong>Observabilidade</strong>
              <span>Logs, métricas e traces</span>
            </div>
            <div className="highlight-chip highlight-open">
              <strong>Open to Work</strong>
              <span>Java Backend</span>
            </div>
          </section>

          <section
              className="section container"
              id="sobre"
          >

            <div className="section-title">

            <span>
              01. SOBRE
            </span>

              <h2>
                Perfil técnico orientado a backend,
                dados e qualidade.
              </h2>

            </div>

            <div className="feature-grid">

              <Feature
                  icon={<Server />}
                  title="Backend"
                  text="Java 21, Spring Boot, APIs REST, JPA, Hibernate, Kafka e microsserviços."
              />

              <Feature
                  icon={<Database />}
                  title="Dados"
                  text="PostgreSQL, Oracle, SQL Server, Python, Spark, Databricks e Airflow."
              />

              <Feature
                  icon={<TestTube2 />}
                  title="Qualidade"
                  text="JUnit 5, Mockito, MockMvc, JaCoCo e testes de integração."
              />

              <Feature
                  icon={<Cloud />}
                  title="Cloud & DevOps"
                  text="Docker, GitHub Actions, AWS, Azure e observabilidade."
              />

            </div>

          </section>

          <section
              className="section alt"
              id="stack"
          >

            <div className="container">

              <div className="section-title">

              <span>
                02. STACK
              </span>

                <h2>
                  Tecnologias que fazem parte do meu ecossistema.
                </h2>

              </div>

              <div className="stack-wrap">

                {[
                  'Java 21',
                  'Spring Boot',
                  'Spring Data JPA',
                  'Hibernate',
                  'Kafka',
                  'PostgreSQL',
                  'Oracle',
                  'SQL Server',
                  'Redis',
                  'Docker',
                  'Git',
                  'JUnit 5',
                  'Mockito',
                  'MockMvc',
                  'JaCoCo',
                  'Prometheus',
                  'Grafana',
                  'Python',
                  'pandas',
                  'Spark',
                  'Databricks',
                  'Airflow',
                  'AWS',
                  'Azure'
                ].map(item => (

                    <span key={item}>
                  {item}
                </span>

                ))}

              </div>

            </div>

          </section>

          <section
              className="section container"
              id="projetos"
          >

            <div className="section-title">

            <span>
              03. PROJETOS
            </span>

              <h2>
                Projetos carregados pela API Java.
              </h2>

            </div>

            {status && (

                <div className="status">
                  {status}
                </div>

            )}

            <div className="projects">

              {projects.map(project => (

                  <article
                      className={`project ${[1, 2, 3].includes(project.id) ? 'project-featured' : ''}`}
                      key={project.id}
                  >

                    <div className="project-cover">
                      <img
                          src={projectImages[project.name]}
                          alt={`Capa do projeto ${project.name}`}
                          className="project-image"
                          loading="lazy"
                      />
                    </div>

                    <div className="project-top">

                      <div className="project-meta">
                        <span>
                          {project.category}
                        </span>

                        {[1, 2, 3].includes(project.id) && (
                            <strong className="featured-badge">
                              Projeto em destaque
                            </strong>
                        )}
                      </div>

                      <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Abrir ${project.name} no GitHub`}
                      >

                        <ExternalLink size={18} />

                      </a>

                    </div>

                    <h3>
                      {project.name}
                    </h3>

                    <p>
                      {project.description}
                    </p>

                    <div className="highlight-list">

                      {project.highlights.map(item => (

                          <small key={item}>
                            ✓ {item}
                          </small>

                      ))}

                    </div>

                    <div className="tech-list">

                      {project.technologies.map(tech => (

                          <span key={tech}>
                      {tech}
                    </span>

                      ))}

                    </div>

                    <div className="project-actions">
                      <a
                          className="project-link"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                      >
                        <Github size={16} />
                        Ver código
                      </a>
                    </div>

                  </article>

              ))}

            </div>

          </section>

          <section
              className="section alt"
              id="arquitetura"
          >
            <div className="container">
              <div className="section-title">
                <span>
                  04. ARQUITETURA
                </span>

                <h2>
                  NexaPay — fluxo distribuído de pagamentos.
                </h2>

                <p>
                  Uma visão resumida da arquitetura event-driven usada no projeto,
                  destacando processamento, mensageria, persistência, cache e observabilidade.
                </p>
              </div>

              <div className="architecture-flow">
                <ArchitectureNode
                    eyebrow="Entrada"
                    title="Cliente / Frontend"
                    text="Inicia operações e chamadas da API."
                />

                <div className="architecture-arrow">↓</div>

                <ArchitectureNode
                    eyebrow="Borda"
                    title="API Gateway"
                    text="Centraliza acesso, roteamento e autenticação."
                />

                <div className="architecture-arrow">↓</div>

                <ArchitectureNode
                    eyebrow="Core"
                    title="Payment Service"
                    text="Processa pagamentos, idempotência e regras de negócio."
                    accent
                />

                <div className="architecture-arrow">↓</div>

                <ArchitectureNode
                    eyebrow="Mensageria"
                    title="Apache Kafka"
                    text="Eventos assíncronos, desacoplamento e DLT."
                />

                <div className="architecture-split">
                  <ArchitectureNode
                      eyebrow="Persistência"
                      title="PostgreSQL"
                      text="Dados transacionais e consistência."
                  />

                  <ArchitectureNode
                      eyebrow="Performance"
                      title="Redis"
                      text="Cache e suporte à idempotência."
                  />
                </div>

                <div className="architecture-arrow">↓</div>

                <div className="architecture-observability">
                  <strong>Observabilidade</strong>
                  <span>Prometheus</span>
                  <span>Grafana</span>
                  <span>Loki</span>
                  <span>Tempo</span>
                </div>
              </div>

              <div className="architecture-note">
                <strong>Princípios aplicados:</strong>
                <span>Event-driven</span>
                <span>Idempotência</span>
                <span>Resiliência</span>
                <span>Retry / DLT</span>
                <span>Logs, métricas e traces</span>
              </div>
            </div>
          </section>

          <section
              className="section alt"
              id="formacao"
          >

            <div className="container">

              <div className="section-title">

              <span>
                04. FORMAÇÃO
              </span>

                <h2>
                  Formação alinhada a software e dados.
                </h2>

              </div>

              <div className="education">

                <div>

                  <strong>
                    Análise e Desenvolvimento de Sistemas
                  </strong>

                  <span>
                  Graduação
                </span>

                </div>

                <div>

                  <strong>
                    Ciência de Dados e Big Data Analytics
                  </strong>

                  <span>
                  Pós-graduação
                </span>

                </div>

                <div>

                  <strong>
                    Arquitetura e Governança de Dados
                  </strong>

                  <span>
                  Pós-graduação
                </span>

                </div>

                <div>

                  <strong>
                    Análise de Dados e Inteligência Artificial
                  </strong>

                  <span>
                  Pós-graduação
                </span>

                </div>

              </div>

            </div>

          </section>

          <section
              className="section container"
              id="experiencia"
          >
            <div className="section-title">
              <span>
                05. EXPERIÊNCIA
              </span>

              <h2>
                Experiência profissional com tecnologia, educação e operações.
              </h2>
            </div>

            <div className="experience-grid">
              <article className="experience-card">
                <div className="experience-top">
                  <span>2025 — atual</span>
                  <strong>Governo do Estado de São Paulo</strong>
                </div>

                <h3>
                  Professor técnico — Desenvolvimento de Sistemas e Matemática
                </h3>

                <p>
                  Atuação com ensino técnico e desenvolvimento de projetos práticos,
                  aplicando programação, banco de dados, APIs, versionamento,
                  testes e organização de projetos de software.
                </p>

                <div className="tech-list">
                  <span>Java</span>
                  <span>Banco de Dados</span>
                  <span>Git</span>
                  <span>Testes</span>
                  <span>Kanban</span>
                </div>
              </article>

              <article className="experience-card">
                <div className="experience-top">
                  <span>11 anos</span>
                  <strong>Correios — ECT</strong>
                </div>

                <h3>
                  Operações, logística e atendimento
                </h3>

                <p>
                  Experiência em ambiente operacional de grande escala, com foco
                  em processos, atendimento, organização, responsabilidade,
                  cumprimento de prazos e resolução de problemas.
                </p>

                <div className="tech-list">
                  <span>Processos</span>
                  <span>Logística</span>
                  <span>Atendimento</span>
                  <span>Organização</span>
                  <span>Resolução de problemas</span>
                </div>
              </article>
            </div>
          </section>

          <section
              className="section container"
              id="contato"
          >

            <div className="contact-grid">

              <div>

              <span className="eyebrow">
                CONTATO
              </span>

                <h2>
                  Vamos conversar sobre oportunidades e projetos.
                </h2>

                <p>
                  Envie uma mensagem pelo formulário. O backend Java valida os dados
                  e encaminha o contato diretamente para meu e-mail.
                </p>

              </div>

              <form
                  className="contact-form"
                  onSubmit={handleSubmit}
              >

                <input
                    required
                    placeholder="Seu nome"
                    value={contact.name}
                    onChange={e =>
                        setContact({
                          ...contact,
                          name: e.target.value
                        })
                    }
                />

                <input
                    required
                    type="email"
                    placeholder="Seu e-mail"
                    value={contact.email}
                    onChange={e =>
                        setContact({
                          ...contact,
                          email: e.target.value
                        })
                    }
                />

                <textarea
                    required
                    rows="4"
                    placeholder="Sua mensagem"
                    value={contact.message}
                    onChange={e =>
                        setContact({
                          ...contact,
                          message: e.target.value
                        })
                    }
                />

                <button
                    className="btn primary submit"
                    type="submit"
                    disabled={sending}
                >

                  <Send size={18} />

                  {sending ? 'Enviando...' : 'Enviar mensagem'}

                </button>

                {feedback && (

                    <p className="feedback">
                      {feedback}
                    </p>

                )}

              </form>

            </div>

          </section>

        </main>

        <footer>

          <div className="container footer-content">

          <span>
            © 2026 Jucelio Farias Coelho
          </span>

            <span>
            React + Java 21 + Spring Boot
          </span>

          </div>

        </footer>

      </div>
  )
}

function ArchitectureNode({
                            eyebrow,
                            title,
                            text,
                            accent = false
                          }) {
  return (
      <div className={`architecture-node ${accent ? 'architecture-node-accent' : ''}`}>
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
  )
}

function Feature({
                   icon,
                   title,
                   text
                 }) {

  return (

      <div className="feature">

        <div className="icon">
          {icon}
        </div>

        <h3>
          {title}
        </h3>

        <p>
          {text}
        </p>

      </div>

  )
}

export default App