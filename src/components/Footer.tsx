export function Footer() {
  return (
    <footer className="w-full text-white py-6 mt-12 border-t border-white/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} MusicApp. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
