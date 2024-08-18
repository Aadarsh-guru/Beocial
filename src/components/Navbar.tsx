import Link from "next/link";
import { ArrowRight, Github, Menu } from "lucide-react";
import Logo from "@/components/Logo";
import InitialModal from "@/components/InitialModel";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const Navbar = () => {
    return (
        <nav className="z-10 w-full container mx-auto">
            <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-5 md:gap-0 relative">
                <input aria-hidden="true" type="checkbox" name="toggle_nav" id="toggle_nav" className="hidden peer" />
                <div className="relative z-40 w-full flex justify-between lg:w-max md:px-0">
                    <Link href="/" aria-label="logo" className="flex space-x-2 items-center">
                        <Logo />
                    </Link>
                    <div className="relative flex items-center lg:hidden max-h-10">
                        <label role="button" htmlFor="toggle_nav" aria-label="humburger" id="hamburger" className="relative p-6 -mr-6">
                            <Menu className="h-6 w-6 text-slate-400 transition duration-300" />
                        </label>
                    </div>
                </div>
                <div aria-hidden="true" className="fixed z-30 inset-0 h-screen w-screen backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden"></div>
                <div className="flex-col z-40 flex-wrap gap-6 p-8 rounded-3xl border shadow-2xl justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none dark:shadow-none">
                    <div className="hidden lg:flex lg:pr-4 lg:w-auto w-full lg:pt-0">
                        <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                            <li>
                                <Link href="/#about" className="block md:px-4 transition hover:text-slate-300">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="block md:px-4 transition hover:text-slate-300">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                        <Link href={"https://github.com/Aadarsh-guru/Beocial.git"} >
                            <HoverBorderGradient
                                as="button"
                                containerClassName="rounded-full w-full"
                                className="flex items-center space-x-2 transition-all active:scale-95"
                            >
                                <span>Github</span>
                                <Github className="h-5 w-5" />
                            </HoverBorderGradient>
                        </Link>
                        <InitialModal>
                            <HoverBorderGradient
                                as="button"
                                containerClassName="rounded-full w-full"
                                className="flex items-center space-x-2 transition-all active:scale-95"
                            >
                                <span>Get Stated</span>
                                <ArrowRight className="h-5 w-5" />
                            </HoverBorderGradient>
                        </InitialModal>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;