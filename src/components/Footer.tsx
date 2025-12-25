export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded-t-3xl mt-10">
      <aside>
        <p className="font-bold text-lg">
          Made with ❤️ for Piper Grace
        </p>
        <p>Copyright © {new Date().getFullYear()} - Keep on riding! 🐎</p>
      </aside>
    </footer>
  );
}