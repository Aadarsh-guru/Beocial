import Link from "next/link";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full h-max lg:h-16 flex flex-col gap-5 lg:flex-row justify-between items-start lg:items-center px-5 py-5 lg:py-0 md:px-10" >
            <Link href={"/"} className="text-xs text-gray-500 font-semibold" >© {currentYear} {process.env?.NEXT_PUBLIC_APP_NAME} All rights reserved.</Link>
            <div className="flex gap-5 flex-col lg:flex-row items-start lg:items-center gap-x-5">
                <Link className="text-xs text-gray-500 font-semibold hover:underline" href={'/disclaimer'} >Disclaimer</Link>
                <Link className="text-xs text-gray-500 font-semibold hover:underline" href={'/terms-and-conditions'} >Terms of Service</Link>
                <Link className="text-xs text-gray-500 font-semibold hover:underline" href={'/privacy-policy'} >Privacy Policy</Link>
            </div>
        </div>
    );
};

export default Footer;