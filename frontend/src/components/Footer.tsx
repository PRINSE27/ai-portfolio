import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      Designed and built by Prince Kumar · {new Date().getFullYear()}
    </footer>
  )
}

export default Footer