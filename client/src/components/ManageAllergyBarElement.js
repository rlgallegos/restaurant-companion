

function ManageAllergyBarElement({allergy}){ 
    return (
        <div className="w-full aspect-w-1 aspect-h-1 text-m text-gray-800 border border-gray-100 rounded-sm px- py-2 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 ease-in-out">
            <li>{allergy.removable ? (allergy.name + '- (removable)') : allergy.name + '- (not removable)'}</li>
        </div>
    )
}
export default ManageAllergyBarElement