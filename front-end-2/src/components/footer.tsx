import './footer.scss';
import Settings from '../store/settings';

function Footer() : JSX.Element {
    return (
        <footer>
            { Settings.Copyright } © { new Date().getFullYear() }
        </footer>
    )
}

export default Footer;