import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Header from "@/components/ui/Header"

type Props = {
  children: React.ReactNode
  showhero: boolean
}

const Layouts = ({ children, showhero = false }: Props) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        {showhero && <Hero />}
        <div className="container mx-auto flex-1 py-10">{children}</div>
        <Footer />
      </div>
    </>
  )
}

export default Layouts
