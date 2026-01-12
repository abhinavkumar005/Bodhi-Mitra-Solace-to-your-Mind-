// src/components/layout/Layout.jsx
// src/components/layout/Layout.jsx
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />        {/* ✅ Updated */}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}