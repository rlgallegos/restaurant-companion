

function MenuCard( {item} ) {
    return (
        <div className="menu-card">
            <h1>{item.name}</h1>
            <img src={item.img} alt="Delicious Food"/>
            <p>{item.description}</p>
        </div>
    )
}
export default MenuCard