const createSheltersNameArray = (objectList, arr) => {
    for(const idx in objectList){
        for(const key in objectList[idx]){
            arr.push(`"${objectList[idx][key]}"`)
        }
    }
    return ( arr );
}
 
export default createSheltersNameArray;