import './header.scss'
import Settings from '../store/settings';
import {
    BrowserRouter,
    Link
  } from 'react-router-dom';

function Header() : JSX.Element {
    return (
        <div className="header">
            <BrowserRouter>
                <Link to="/"> {Settings.SiteName} </Link>
            </BrowserRouter>
        </div>
    )
}

export default Header;