import LanugageSelectMenu from './LangageSelectMenu';
import { Link } from "react-router-dom";

function NavBar({handleSetLanguage}) {

    return (
    <nav className='nav-bar'>
        <Link to='menu-display'>Menu Page</Link>
        <Link to='order'>Current Order</Link>
        <Link to='../manage'><b>Manager Portal</b></Link>
        <LanugageSelectMenu onSetLanguage={handleSetLanguage} />
    </nav>
    )
}
export default NavBar