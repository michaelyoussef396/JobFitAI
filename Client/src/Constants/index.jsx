import logo from "../images/JobFitAi.png";
import name from "../images/name.png";
import bgOutline from "../images/bg-outlines.svg"
import bgOutlineFill from "../images/bg-outlines-fill.png";
import close from "../images/close.svg";
import magic from "../images/magic.svg";
import Zap from "../images/zap.svg";
import Hero from "../images/hero.png";
import docs from "../images/docs.svg";
import magictouch from "../images/magictouch.svg";
import Feature1 from "../images/feature-1.png";
import Feature2 from "../images/feature-2.png";
export const images = {
    logo,
    name,
    bgOutline,
    bgOutlineFill,
    close,
    magic,
    Zap,
    Hero,
    docs,
    magictouch,
    Feature1,
    Feature2
}

export const features = [
    {
      id: "0",
      icon: images.Feature1,  // Using the imported image instead of hardcoded path
      caption: "AI-Powered Job Matching",
      title: "Find Your Perfect Tech Job Effortlessly",
      text: "JobFitAI helps you land your ideal tech job by scanning multiple platforms, analyzing your qualifications, and matching you with roles that fit your skills. Let AI do the hard work while you focus on what matters most.",
      button: {
        icon: images.magictouch,  // Use the imported image for the button icon
        title: "See Job Matches",
      },
    },
    {
      id: "1",
      icon: images.Feature2,  // Using the imported image instead of hardcoded path
      caption: "Tailored Career Guidance",
      title: "Get Expert Advice on Your Job Hunt",
      text: "JobFitAI doesn't just match you with jobs, it guides you every step of the way. From improving your resume to preparing you for interviews, our AI ensures you’re always ready for the next opportunity.",
      button: {
        icon: images.docs,  // Use the imported image for the button icon
        title: "Get Career Advice",
      },
    },
  ];
  