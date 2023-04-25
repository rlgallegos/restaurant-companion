import LanugageSelectMenu from './LangageSelectMenu';
import { useNavigate } from "react-router-dom";


function NavBar({handleSetLanguage}) {
    const navigate = useNavigate()

    function handleNav(e) {
        switch(e.target.textContent) {
            case 'Home':
                navigate('/')
                break;
            case 'Manager Portal':
                navigate('/manage')
                break;
            case 'Order':
                navigate('/order')
                break;
        }
    }

    return (
    <nav id='nav-bar'>
        <div onClick={handleNav}>Home</div>
        <div onClick={handleNav}>Manager Portal</div>
        <div onClick={handleNav}>Order</div>
        <LanugageSelectMenu onSetLanguage={handleSetLanguage} />
    </nav>
    )
}
export default NavBar