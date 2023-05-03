

function ManageAllergyBarElement({allergy}){ 
    return (
        <div className="w-full aspect-w-1 aspect-h-1 text-m text-gray-900 border border-blue-400 rounded-sm px- py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
            <li>{allergy.removable ? (allergy.name + '- (removable)') : allergy.name + '- (not removable)'}</li>
        </div>
    )
}
export default ManageAllergyBarElement