import './navigation.scss'
import { Nav } from 'react-bootstrap';
  
function Navigation() : JSX.Element {
    return (
        <Nav className="navigation justify-content-center">
            <Nav.Item>
                <Nav.Link href="/"> Home </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/projects">Projects</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Navigation;