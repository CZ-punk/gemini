import './About.css';

const About = () => {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'Next.js', 
    'CSS/SASS', 'PostgreSQL', 'AWS', 'Docker',
    'GraphQL', 'Figma', 'Git'
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <div className="title-underline"></div>
      </div>
      <div className="about-grid">
        <div className="about-text">
          <h3>끊임없이 성장하는 개발자</h3>
          <p>
            저는 복잡한 문제를 단순하고 우아한 솔루션으로 해결하는 것을 즐깁니다. 
            단순히 코드를 작성하는 것을 넘어, 비즈니스 가치를 창출하고 사용자에게 최상의 경험을 제공하기 위해 고민합니다.
          </p>
          <p>
            최신 기술 트렌드를 빠르게 습득하고 프로젝트에 적용하며, 
            팀원들과의 원활한 소통을 통해 최고의 결과물을 만들어내는 것을 목표로 합니다.
          </p>
        </div>
        <div className="about-skills">
          <h3>Tech Stack</h3>
          <div className="skills-container">
            {skills.map((skill, index) => (
              <span key={index} className="skill-chip">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
