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
import detail1 from "../images/detail-1.png";
import detail2 from "../images/detail-2.png";
import detail3 from "../images/detail-3.png";
import detail4 from "../images/detail-4.png";
import check from "../images/check.png";
import circle from "../images/circle.svg";
import plan1 from "../images/plan-1.png";
import plan2 from "../images/plan-2.png";
import plan3 from "../images/plan-3.png";
import triangle from "../images/triangle.svg";
import hexagon from "../images/hexagon.svg";
import logoFaq from "../images/faq-logo.svg";
import jessicaSaunders from "../images/jessica-saunders.png";
import markErixon from "../images/mark-erixon.png";
import melanieHurst from "../images/melanie-hurst.png";
import aliciaBarker from "../images/alicia-barker.png";
import beckySnider from "../images/becky-snider.png";
import jimBradley from "../images/jim-bradley.png";
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
    Feature2,
    detail1,
    detail2,
    detail3,
    detail4,
    check,
    circle,
    plan1,
    plan2,
    plan3,
    triangle,
    hexagon,
    logoFaq,
    jessicaSaunders,
    markErixon,
    melanieHurst,
    aliciaBarker,
    beckySnider,
    jimBradley,
}

export const features = [
    {
      id: "0",
      icon: images.Feature1, 
      caption: "AI-Powered Job Matching",
      title: "Find Your Perfect Tech Job Effortlessly",
      text: "JobFitAI helps you land your ideal tech job by scanning multiple platforms, analyzing your qualifications, and matching you with roles that fit your skills. Let AI do the hard work while you focus on what matters most.",
      button: {
        icon: images.magictouch, 
        title: "See Job Matches",
      },
    },
    {
      id: "1",
      icon: images.Feature2, 
      caption: "Tailored Career Guidance",
      title: "Get Expert Advice on Your Job Hunt",
      text: "JobFitAI doesn't just match you with jobs, it guides you every step of the way. From improving your resume to preparing you for interviews, our AI ensures you’re always ready for the next opportunity.",
      button: {
        icon: images.docs,
        title: "Get Career Advice",
      },
    },
  ];
  
  export const details = [
    {
      id: "0",
      icon: images.detail1,
      title: "AI-Powered Job Search Automation",
    },
    {
      id: "1",
      icon: images.detail2, 
      title: "Personalized Resume & CV Assistance",
    },
    {
      id: "2",
      icon: images.detail3,
      title: "Custom Interview Preparation Tips",
    },
    {
      id: "3",
      icon: images.detail4,
      title: "24/7 Support for Job Seekers",
    },
  ];
  
  export const plans = [
    {
      id: "0",
      title: "Basic",
      priceMonthly: 9,
      priceYearly: 7,
      caption: "Ideal for individuals starting their job search",
      features: [
        "Access to 50 job matches per month",
        "Basic Resume & CV suggestions",
        "AI-powered job recommendations",
        "Standard email support",
      ],
      icon: images.circle,
      logo: images.plan1, 
    },
    {
      id: "1",
      title: "Professional",
      priceMonthly: 29,
      priceYearly: 25,
      caption: "Most popular plan for experienced job seekers",
      features: [
        "Unlimited job matches",
        "Advanced Resume & CV suggestions",
        "Interview preparation with AI tips",
        "Priority customer support",
      ],
      icon: images.triangle, 
      logo: images.plan2, 
    },
    {
      id: "2",
      title: "Enterprise",
      priceMonthly: 59,
      priceYearly: 49,
      caption: "Perfect for teams and job agencies",
      features: [
        "Unlimited job matches for team members",
        "Custom Resume & CV templates",
        "AI-powered team job management",
        "Dedicated account manager & priority support",
      ],
      icon: images.hexagon,
      logo: images.plan3, 
    },
  ];
  

  export const faq = [
    {
      id: "0",
      question: "How easy is it to set up JobFitAI?",
      answer:
        "Setting up JobFitAI is quick and easy. Simply create an account, fill in your personal and professional details, and let the AI start finding job matches for you right away.",
    },
    {
      id: "1",
      question: "Can JobFitAI help me with my resume and CV?",
      answer:
        "Absolutely! JobFitAI analyzes your resume and CV, providing personalized suggestions to improve your chances of landing the perfect job.",
    },
    {
      id: "2",
      question: "How does JobFitAI find job matches?",
      answer:
        "JobFitAI uses AI algorithms to scan multiple job platforms, such as LinkedIn, Indeed, and Seek, to find matches based on your skills, experience, and preferences.",
    },
    {
      id: "3",
      question: "What if I need help with interviews?",
      answer:
        "JobFitAI offers AI-powered interview preparation tips tailored to the job roles you're applying for. You can practice with sample questions and tips to improve your interview performance.",
    },
    {
      id: "4",
      question: "Can I use JobFitAI to apply for multiple jobs at once?",
      answer:
        "Yes! JobFitAI saves job matches and allows you to apply to multiple positions with ease. You can track your applications and even get reminders for follow-ups.",
    },
    {
      id: "5",
      question: "Is my data secure on JobFitAI?",
      answer:
        "Your data security is our top priority. JobFitAI uses state-of-the-art encryption and secure servers to keep your information safe and private.",
    },
    {
      id: "6",
      question: "Can I upgrade my plan if I need more features?",
      answer:
        "Absolutely! You can upgrade your plan at any time to unlock additional features like unlimited job matches, advanced resume help, and priority support.",
    },
    {
      id: "7",
      question: "Does JobFitAI work for all types of tech jobs?",
      answer:
        "Yes! Whether you're a web developer, data analyst, backend engineer, or full-stack developer, JobFitAI can help you find relevant job opportunities based on your qualifications.",
    },
    {
      id: "8",
      question: "Can JobFitAI help teams or agencies?",
      answer:
        "Yes, JobFitAI offers enterprise plans that are perfect for teams and agencies looking to manage job applications and track hiring processes for multiple candidates.",
    },
    {
      id: "9",
      question: "I'm locked out of my account, what should I do?",
      answer:
        "If you're locked out of your account, you can reset your password using the 'Forgot Password' option on the login page, or contact our support team for further assistance.",
    },
  ];
  export const testimonials = [
    {
      id: "0",
      name: "Jessica Saunders",
      role: "Software Engineer at Globalnomads",
      avatarUrl: images.jessicaSaunders, // Use the variable from images
      comment:
        "JobFitAI has been a game-changer for my job search. The AI-powered job matching helped me find my dream role within weeks!",
    },
    {
      id: "1",
      name: "Mark Erixon",
      role: "Data Analyst at Vid Capital Intl",
      avatarUrl: images.markErixon, // Use the variable from images
      comment:
        "I never thought I'd get personalized career guidance through AI, but JobFitAI’s suggestions for resume improvements and interview prep were spot on.",
    },
    {
      id: "2",
      name: "Melanie Hurst",
      role: "Full Stack Developer at Cyberleap",
      avatarUrl: images.melanieHurst, // Use the variable from images
      comment:
        "JobFitAI made job hunting so much easier. I especially loved the resume suggestions and tailored job listings.",
    },
    {
      id: "3",
      name: "Alicia Barker",
      role: "Frontend Developer at Cyberleap",
      avatarUrl: images.aliciaBarker, // Use the variable from images
      comment:
        "The personalized job matches were incredibly accurate. I landed interviews with top companies I never thought I was qualified for.",
    },
    {
      id: "4",
      name: "Becky Snider",
      role: "Project Manager at Floclips",
      avatarUrl: images.beckySnider, // Use the variable from images
      comment:
        "I started using JobFitAI last month and have already secured multiple interviews. The platform is user-friendly and highly efficient!",
    },
    {
      id: "5",
      name: "Jim Bradley",
      role: "Backend Developer at Vid Capital Intl",
      avatarUrl: images.jimBradley, // Use the variable from images
      comment:
        "JobFitAI transformed my job search process. The AI-driven recommendations and interview tips were invaluable!",
    },
  ];