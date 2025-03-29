"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

const testimonials = [
  {
    name: "Aayush Sharma",
    avatar: "🧑‍💻",
    title: "Senior Software Engineer",
    description: "This AI tool has revolutionized my workflow! The code generation is incredibly accurate and has boosted my productivity by 300%. The ability to understand complex architectures and suggest optimizations is mind-blowing.",
  },
  {
    name: "Kuber Surve",
    avatar: "👩‍🎨",
    title: "Creative Director",
    description: "The AI art generation is phenomenal! It perfectly captures my creative vision and helps me iterate designs rapidly. The style transfer and composition suggestions have elevated our brand identity to new heights.",
  },
  {
    name: "Ganesh Lagad",
    avatar: "🎵",
    title: "Music Producer & Composer",
    description: "From melodies to full compositions, this AI understands music theory perfectly. It's like having a talented co-producer! The ability to generate complex harmonies and suggest arrangement variations has transformed my production process.",
  },
  {
    name: "Rishabh Trivedi",
    avatar: "📽",
    title: "Film Director",
    description: "The video generation capabilities are outstanding. It's transformed how we approach pre-visualization and content creation. The AI's understanding of cinematography and scene composition has streamlined our entire production workflow.",
  },
  {
    name: "Ameesha Patel",
    avatar: "✍️",
    title: "Content Strategist",
    description: "The AI writing assistant is brilliant! It helps me create engaging content that resonates with our audience instantly. The tone adaptation and SEO optimization features ensure our content performs exceptionally well across all platforms.",
  },
  {
    name: "Vedanth Choudhary",
    avatar: "🤖",
    title: "AI Researcher",
    description: "The depth of AI capabilities here is impressive. It's not just powerful, but also incredibly intuitive to use. The model's ability to understand context and generate nuanced responses has accelerated our research significantly.",
  },
  {
    name: "Afzal Khan",
    avatar: "📊",
    title: "Data Scientist",
    description: "The AI analytics features have transformed how we process data. It's like having a team of analysts at your fingertips! The predictive modeling and automated insight generation have cut our analysis time in half.",
  },
  {
    name: "Ansh Sonkar",
    avatar: "🎮",
    title: "Game Developer",
    description: "This tool has streamlined our game development pipeline. The AI assists in everything from asset creation to debugging! The procedural content generation and NPC behavior modeling have added incredible depth to our games.",
  },
  {
    name: "Priya Malhotra",
    avatar: "👩‍⚕️",
    title: "Healthcare Consultant",
    description: "The AI's medical data analysis capabilities are revolutionary! It helps us identify patterns in patient data and suggest treatment optimizations that we might have missed. The natural language processing for medical documentation is incredibly accurate.",
  },
  {
    name: "Raj Mehta",
    avatar: "📱",
    title: "Mobile App Developer",
    description: "This AI platform has transformed our app development process! From UI/UX suggestions to performance optimization and bug prediction, it's like having an expert development team at your disposal 24/7.",
  },
  {
    name: "Sarah Khan",
    avatar: "🎓",
    title: "Education Technology Specialist",
    description: "The AI's ability to generate personalized learning content is remarkable! It adapts to different learning styles and creates engaging educational materials that keep students motivated. The automated assessment features save hours of grading time.",
  },
  {
    name: "Vikram Reddy",
    avatar: "🏢",
    title: "Business Analytics Manager",
    description: "The business intelligence capabilities are exceptional! From market trend analysis to customer behavior prediction, this AI tool provides insights that drive our strategic decisions. The automated reporting features are a game-changer.",
  }
];

export const LandingContent = () => {
  return (
    <div className="px-6 md:px-10 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
      <h2 className="text-center text-4xl md:text-5xl text-white font-extrabold mb-12 relative">
        What Our Users Say
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
      </h2>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 2,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        className="w-full py-16"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index} className="w-[300px] sm:w-[350px]">
            <Card 
              className="bg-gradient-to-br from-[#192339]/60 to-[#0f172a]/60 backdrop-blur-lg border-[1.5px] border-white/10 text-white p-8 rounded-3xl
                         transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(139,92,246,0.25)]
                         shadow-[0_8px_32px_rgba(31,41,55,0.2)] hover:border-purple-500/30
                         relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex items-center gap-6 pb-6 border-b border-white/10">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-purple-600/90 to-pink-600/90 rounded-2xl text-4xl
                              shadow-[0_0_25px_rgba(168,85,247,0.35)] transform rotate-3 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                  {item.avatar}
                </div>
                <div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent
                                tracking-tight">
                    {item.name}
                  </p>
                  <p className="text-zinc-400 text-sm mt-1 font-medium">{item.title}</p>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-zinc-200 leading-relaxed text-[15px] italic">"{item.description}"</p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};