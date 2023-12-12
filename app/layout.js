import './globals.css'
import Navbar from './../components/layout/Navbar';
import Footer from './../components/layout/Footer';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='font-sans bg-[#E7E7E3] '>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
