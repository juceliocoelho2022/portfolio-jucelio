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
  Menu,
  X,
  Activity,
  BellRing,
  Gauge,
  ShieldCheck,
  Download
} from 'lucide-react'

const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
const projectImages = {
  NexaPay: '/projects/nexapay.png',
  InnovationHub: '/projects/innovationhub.png',
  'SentinelFraud Platform': '/projects/sentinelfraud.png',
  'TenantGuard Cloud': '/projects/tenantguard.png',
  'FraudShield AI': '/projects/fraudshield.png',
  RotaCerta: '/projects/rotacerta.png'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [apiHealth, setApiHealth] = useState({
    status: 'CHECKING',
    checkedAt: null
  })

  useEffect(() => {
    fetch(`${API_URL}/health`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Health check indisponível')
          }
          return res.json()
        })
        .then(data => {
          setApiHealth({
            status: data.status || 'UP',
            checkedAt: new Date().toLocaleTimeString('pt-BR')
          })
        })
        .catch(() => {
          setApiHealth({
            status: 'DOWN',
            checkedAt: new Date().toLocaleTimeString('pt-BR')
          })
        })

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
                  href="#observabilidade"
                  onClick={closeMenu}
              >
                Observabilidade
              </a>

              <a
                  href="#formacao"
                  onClick={closeMenu}
              >
                Formação
              </a>

              <a
                  href="#curriculo"
                  onClick={closeMenu}
              >
                Currículo
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
                    target="_blank"
                    rel="noreferrer"
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
                      className={`project ${[1, 2, 3].includes(project.id) ? 'project-featured' : ''}`}
                      key={project.id}
                  >

                    <div className={`project-cover project-cover-${project.id}`}>
                      {projectImages[project.name] && (
                          <img
                              src={projectImages[project.name]}
                              alt={`Imagem do projeto ${project.name}`}
                              className="project-image"
                              onError={e => {
                                e.currentTarget.style.display = 'none'
                                e.currentTarget.parentElement.classList.add('project-cover-fallback')
                              }}
                          />
                      )}

                      <div className="project-cover-overlay">
                        <small>{project.category}</small>
                        <strong>{project.name}</strong>
                      </div>
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

                    <h3>{project.name}</h3>
                    <p>{project.description}</p>

                    <div className="highlight-list">
                      {project.highlights.map(item => (
                          <small key={item}>✓ {item}</small>
                      ))}
                    </div>

                    <div className="tech-list">
                      {project.technologies.map(tech => (
                          <span key={tech}>{tech}</span>
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
              id="observabilidade"
          >
            <div className="container">
              <div className="section-title">
                <span>04. OBSERVABILIDADE</span>
                <h2>
                  Métricas, SLOs e alertas reais em produção.
                </h2>
              </div>

              <div className="observability-status">
                <div className="live-status-card">
                  <div className="live-status-icon">
                    <Activity size={24} />
                  </div>

                  <div>
                    <small>STATUS DA API</small>
                    <strong className={`api-status api-status-${apiHealth.status.toLowerCase()}`}>
                      {apiHealth.status === 'UP'
                          ? 'Online'
                          : apiHealth.status === 'DOWN'
                              ? 'Indisponível'
                              : 'Verificando'}
                    </strong>
                    <span>
                      {apiHealth.checkedAt
                          ? `Última verificação: ${apiHealth.checkedAt}`
                          : 'Executando health check...'}
                    </span>
                  </div>
                </div>

                <div className="observability-card">
                  <Gauge size={22} />
                  <div>
                    <strong>Prometheus + Grafana</strong>
                    <span>
                      Métricas HTTP, JVM, HikariCP, p95 e indicadores de negócio.
                    </span>
                  </div>
                </div>

                <div className="observability-card">
                  <BellRing size={22} />
                  <div>
                    <strong>Alertmanager + Slack</strong>
                    <span>
                      Alertas automáticos para indisponibilidade, 5xx, latência e integrações.
                    </span>
                  </div>
                </div>

                <div className="observability-card">
                  <ShieldCheck size={22} />
                  <div>
                    <strong>SLOs operacionais</strong>
                    <span>
                      Disponibilidade, taxa de erro, latência p95 e saúde do pool de conexões.
                    </span>
                  </div>
                </div>
              </div>

              <div className="observability-flow" aria-label="Fluxo de observabilidade">
                <span>Spring Boot</span>
                <b>→</b>
                <span>Actuator</span>
                <b>→</b>
                <span>Prometheus</span>
                <b>→</b>
                <span>Grafana</span>
                <b>→</b>
                <span>Alertmanager</span>
                <b>→</b>
                <span>Slack</span>
              </div>

              <div className="observability-actions">
                <a
                    className="btn"
                    href="https://portfolio-jucelio-api.onrender.com/swagger-ui/index.html"
                    target="_blank"
                    rel="noreferrer"
                >
                  <ExternalLink size={17} />
                  Swagger da API
                </a>

                <a
                    className="btn"
                    href="https://github.com/juceliocoelho2022/portfolio-jucelio"
                    target="_blank"
                    rel="noreferrer"
                >
                  <Github size={17} />
                  Ver observabilidade no GitHub
                </a>
              </div>
            </div>
          </section>

          <section
              className="section"
              id="formacao"
          >

            <div className="container">

              <div className="section-title">

              <span>
                05. FORMAÇÃO
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
              className="section alt"
              id="curriculo"
          >
            <div className="container resume-section">
              <div className="section-title">
                <span>06. CURRÍCULO</span>
                <h2>
                  Currículo profissional gerado pelo backend Java.
                </h2>
              </div>

              <div className="resume-card">
                <div>
                  <strong>Jucelio Farias Coelho — Java Backend Developer</strong>
                  <p>
                    PDF gerado dinamicamente pela API Spring Boot com experiência,
                    stack técnica, formação e projetos de portfólio.
                  </p>
                </div>

                <a
                    className="btn primary"
                    href={`${API_URL}/resume`}
                    target="_blank"
                    rel="noreferrer"
                >
                  <Download size={18} />
                  Abrir currículo em PDF
                </a>
              </div>
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