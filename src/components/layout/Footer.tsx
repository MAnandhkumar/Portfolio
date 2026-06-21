export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-6 ">
      <div className="max-w-[90%] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">
          &copy; {currentYear} Anandhkumar. All rights reserved.
        </p>
        <p className="text-gray-400 text-sm">Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
