export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Coffee Shop. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
