import { useEffect } from "react"

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = "Contact | MGGS Kunchalwara Kalan"
  }, [])
  return (
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLScIqF_opAtPTZUGlYv7uOmzoFR-pj4lINa8Qo3Lnoo2KV-NFw/viewform?embedded=true"
      className="m-auto w-full min-h-screen google-form"
    >
      Loading…
    </iframe>
  )
}
