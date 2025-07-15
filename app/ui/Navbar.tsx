import Link from "next/link";
const Navbar: React.FC = () => {
    return (
      <nav className="w-full px-6 py-4 flex items-center justify-between bg-teal-900">
        <Link href="/" className="text-white font-bold text-xl">
          Home page pr chien?
        </Link>
        <Link
          href={"/kya-khaye"}
          rel="noopener noreferrer"
          className="text-white font-medium hover:text-gray-300"
        >
          <section className="italic">Kya khana hai?</section>
        </Link>
      </nav>
    );
};

export default Navbar;