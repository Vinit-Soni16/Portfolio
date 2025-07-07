import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
const projects = [
  {
    name: "Productivity Dashboard",
    tools: "HTML, CSS, JAVASCRIPT",
    image: "/images/pro.png",
    github: "https://vinit-soni16.github.io/Project16/"
  },
  {
    name: "GitHub User Finder",
    tools: "HTML, CSS, JAVASCRIPT",
    image: "/images/pro1.png",
    github: "https://vinit-soni16.github.io/project15/"
  },
   {
    name: "E-commerce Website",
    tools: "HTML, CSS, JAVASCRIPT",
    image: "/images/pro2.png",
    github: "https://vinit-soni16.github.io/Project13/"
  },
   {
    name: "Animation",
    tools: "HTML, CSS, JAVASCRIPT, React",
    image: "/images/pro3.png",
    github: "https://vinit-soni16.github.io/Project9/"
  },
   {
    name: "To-Do Website",
    // category: "Full Stack",
    tools: "Node.js, Express, MongoDB, React",
    image: "/images/pro4.png",
    github: "https://vinit-soni16.github.io/Project8/"
  },
  // ...aur bhi projects
];
const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
       <div className="work-flex">
  {projects.map((project, index) => (
    <div className="work-box" key={index}>
      <div className="work-info">
        <div className="work-title">
          <h3>0{index + 1}</h3>
          <div>
            <h4>{project.name}</h4>
            {/* <p>{project.category}</p> */}
          </div>
        </div>
        <h4>Tools and features</h4>
        <p>{project.tools}</p>
      </div>
      <WorkImage image={project.image} alt={project.name} />
       {project.github && (
        <a
          href={project.github}
          className="github-link"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "10px",
            color: "white",
            fontWeight: 500,
            textDecoration: "none",
            fontSize: "18px"
          }}
        >
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
          </svg>
          GitHub
        </a>
      )}
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default Work;
