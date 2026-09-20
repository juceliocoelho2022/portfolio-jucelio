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
    import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

function App() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('Carregando projetos...')
  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [feedback, setFeedback] = useState('')
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
        setFeedback('Confira os campos informados.')
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
          'Não foi possível enviar a mensagem. Verifique se o backend está disponível.'
      )
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
                      className="project"
                      key={project.id}
                  >

                    <div className="project-top">

                  <span>
                    {project.category}
                  </span>

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

                  </article>

              ))}

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
                  O formulário abaixo envia os dados
                  para um endpoint REST no backend Java.
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
                >

                  <Send size={18} />

                  Enviar mensagem

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