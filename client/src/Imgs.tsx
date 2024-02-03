import logoImg from "./assets/logo.png"

type imgProps = {
  className: string
}

export function Logo({ className }: imgProps) {
  return <img src={logoImg} alt="Logo" className={className} />
}
