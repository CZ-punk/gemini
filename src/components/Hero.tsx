import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero-section fade-in">
      <div className="hero-content">
        <h2 className="hero-subtitle">안녕하세요, 창의적인 개발자입니다</h2>
        <h1 className="hero-title">
          디자인과 기능을 하나로,<br />
          <span>미래를 설계하는 코드</span>
        </h1>
        <p className="hero-description">
          사용자 중심의 가치를 실현하기 위해 최적화된 성능과 매끄러운 인터페이스를 개발합니다. 
          프론트엔드부터 백엔드까지, 기술의 한계를 넘어선 경험을 제공합니다.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary">프로젝트 보기</a>
          <a href="#contact" className="btn btn-secondary">연락하기</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
