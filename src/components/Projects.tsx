import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Next.js와 Stripe를 이용한 고성능 커머스 솔루션',
      tags: ['Next.js', 'TypeScript', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'AI Dashboard',
      description: '데이터 시각화 및 머신러닝 모델 모니터링 툴',
      tags: ['React', 'D3.js', 'Python'],
      image: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Social Connect',
      description: '실시간 채팅 및 소셜 네트워킹 플랫폼',
      tags: ['Socket.io', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <h2 className="section-title">My Projects</h2>
        <div className="title-underline"></div>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <a href="#" className="view-btn">자세히 보기</a>
              </div>
            </div>
            <div className="project-info">
              <div className="project-tags">
                {project.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="tag">{tag}</span>
                ))}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
