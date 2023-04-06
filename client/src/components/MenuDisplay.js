import MenuCards from './MenuCards';

function MenuDisplay( {items} ) {
    return (
        <div>
            <h1>This is the Menu Display</h1>
            <MenuCards items={items} />
        </div>
    )
}

export default MenuDisplay