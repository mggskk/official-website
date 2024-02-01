import { MapPinIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="footer px-4  py-10 bg-base-300 text-base-content">
      <nav>
        <header className="footer-title">Important links</header>
        <a
          href="https://rajeduboard.rajasthan.gov.in/"
          className="link link-hover"
          target="_blank"
        >
          RBSE
        </a>
        <a
          href="https://ncert.nic.in/textbook.php"
          className="link link-hover"
          target="_blank"
        >
          NCERT Books
        </a>
      </nav>
      <nav>
        <header className="footer-title">School</header>
        <Link to={"/contact"} className="link link-hover">
          Contact us
        </Link>
      </nav>
      <nav>
        <header className="footer-title">Social</header>
        <div className="grid grid-flow-col gap-4">
          <a href="https://maps.app.goo.gl/gdkebmv9ZC8qrTQk6" target="_blank">
            <MapPinIcon className="w-6 h-6 text-neutral" />
          </a>
        </div>
      </nav>
    </footer>
  )
}
