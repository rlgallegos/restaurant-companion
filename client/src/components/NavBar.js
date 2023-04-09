import LanugageSelectMenu from './LangageSelectMenu';


function NavBar({handleSetLanguage}) {
    return (
    <nav id='nav-bar'>
        <a href='/'>Home</a>
        <a href='/filter'>Filter</a>
        <a href='/order'>Order</a>
        <LanugageSelectMenu onSetLanguage={handleSetLanguage} />
    </nav>
    )
}
export default NavBar