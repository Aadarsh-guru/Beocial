import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StaticLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="h-20 inset-y-0 w-full z-50" >
                <Navbar />
            </header>
            <main className="min-h-full w-full container mx-auto" >
                {children}
            </main>
            <footer className="w-full relative bottom-0 border-t" >
                <Footer />
            </footer>
        </>
    );
};
