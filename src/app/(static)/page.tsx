import Link from "next/link";
import {
  ArrowRight,
  Github,
  GlobeIcon,
  Heart,
  Linkedin,
  Twitter,
} from "lucide-react";
import Globe from "@/components/Globe";
import ContactForm from "@/components/ContactForm";
import InitialModel from "@/components/InitialModel";
import testimonials from "@/lib/testimonials";
import { Button as BorderButton } from "@/components/ui/moving-border";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import TooltipContainer from "@/components/TooltipContainer";

function Home() {

  const appName = process.env.NEXT_PUBLIC_APP_NAME as string;

  return (
    <div className="w-full min-h-screen mx-auto scroll-smooth">
      {/* Hero Section */}
      <section className="section w-full md:h-[calc(100vh/1.25)] p-5 flex gap-5 lg:gap-0 items-center">
        <div className="w-full h-full flex flex-col justify-center">
          <div className="space-y-6">
            <h1 className="text-3xl text-center md:text-left font-bold tracking-tight sm:text-5xl">
              Discover New Connections Around the World
            </h1>
            <p className="text-sm md:text-base text-center md:text-left text-muted-foreground">
              {appName} makes it easy and fun to connect with people from all over the world. Whether you&apos;re looking to make new friends, learn about different cultures, or just have a chat, our platform is here for you. Join us and start your journey of global connections today!
            </p>
            <div className="py-4 w-full flex flex-col-reverse sm:flex-row items-center md:justify-center lg:justify-start gap-4">
              <Link href={`https://buymeacoffee.com/aadarshguru`}>
                <button
                  type="button"
                  className="py-5 flex text-sm font-medium items-center gap-2 px-6 rounded-3xl shadow-sm transition-all bg-gray-950 hover:bg-gray-900 border active:scale-[98%] focus:ring-1 focus:ring-primary focus:ring-offset-1"
                >
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Support Me</span>
                </button>
              </Link>
              <InitialModel>
                <BorderButton className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-all active:scale-[98%] hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </BorderButton>
              </InitialModel>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex-col justify-center items-center hidden lg:flex">
          <Globe />
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="section w-full mb-10">
        <div className="w-full flex flex-col p-4">
          <h2 className="text-xl lg:text-2xl font-semibold">Testimonials &ndash;</h2>
          <div className="min-h-[20rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="section w-full mb-10">
        <div className="w-full flex flex-col p-4">
          <h2 className="text-xl lg:text-2xl font-semibold">About &ndash;</h2>
          <div className="min-h-[20rem] w-full rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <div
              className="max-w-5xl mt-10 sm:mt-0 relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6"
              style={{
                background: "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
              }}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal italic">
                  &quot;Hi, I&apos;m Aadarsh Guru, and I created <span className="">{appName}</span> to provide users with a free and easy way to interact with people globally. This open house website allows you to video chat with anyone randomly in the entire world. The best part is that <span className="">{appName}</span> is open source, so you can read the code, contribute to it, and support the project. Join us in making global connections easier and more accessible for everyone.&quot;
                </span>
                <div className="relative z-20 mt-6 flex flex-col justify-center items-center gap-y-2 sm:flex-row sm:justify-between w-full">
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal italic">
                    - Aadarsh Guru {`(Founder)`}
                  </span>
                  <div className="flex items-center gap-4">
                    <TooltipContainer content="Twitter">
                      <Link target="_blank" href={`https://twitter.com/Aadarsh_guru`}>
                        <Twitter className="h-5 w-5 transition-all duration-300 hover:text-sky-600 hover:scale-110 active:scale-95" />
                      </Link>
                    </TooltipContainer>
                    <TooltipContainer content="LinkedIn">
                      <Link target="_blank" href={`https://www.linkedin.com/in/aadarshguru/`}>
                        <Linkedin className="h-5 w-5 transition-all duration-300 hover:text-sky-600 hover:scale-110 active:scale-95" />
                      </Link>
                    </TooltipContainer>
                    <TooltipContainer content="Github">
                      <Link target="_blank" href={`https://github.com/aadarsh-guru`}>
                        <Github className="h-5 w-5 transition-all duration-300 hover:text-sky-600 hover:scale-110 active:scale-95" />
                      </Link>
                    </TooltipContainer>
                    <TooltipContainer content="Website">
                      <Link target="_blank" href={`https://aadarshguru.vercel.app/`}>
                        <GlobeIcon className="h-5 w-5 transition-all duration-300 hover:text-sky-600 hover:scale-110 active:scale-95" />
                      </Link>
                    </TooltipContainer>
                  </div>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="section w-full mb-10">
        <div className="w-full flex flex-col p-4 gap-4">
          <h2 className="text-xl lg:text-2xl font-semibold">Contact &ndash;</h2>
          <div className="w-full flex justify-center items-center p-4">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;