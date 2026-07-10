import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";

export const Header = ({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (value: boolean) => void }) => {
    return (

        <nav className="fixed top-0 w-full z-50 glass ghost-border border-x-0 border-t-0 py-4 px-6 md:px-12 flex justify-between items-center transition-colors duration-300">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center transition-colors bg-primary">
                    <img src="/images/logo.jpeg" alt="Cambridge Academy Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-on-surface hidden sm:block transition-colors">Cambridge Scholars</span>
            </div>

            <div className="hidden md:flex items-center gap-8 font-medium text-on-surface-variant">
                <Link to="/" className="hover:text-primary transition-colors">Public Landing</Link>
                <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                <Link to="/login" className="btn-primary">Apply Now</Link>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />
                <button className="md:hidden text-on-surface" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>
    )
}