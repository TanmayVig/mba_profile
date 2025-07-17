import Link from "next/link";
const Navbar: React.FC = () => {
    return (
      <nav className="w-full px-6 py-4 flex items-center justify-between bg-teal-600">
        <Link href="/" className="text-white font-bold text-5xl">
          🏡
        </Link>
        <Link
          href={"/kya-khaye"}
          rel="noopener noreferrer"
          className="text-white font-medium hover:text-gray-300"
        >
          <section className="text-white font-bold text-3xl">😋</section>
        </Link>
      </nav>
    );
};

export default Navbar;