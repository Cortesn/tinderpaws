const createAnimalTypeArray = (obj, arr) => {
    for(const animal in obj){
        if(obj[animal]&&animal==="Dog"){
            arr.push(1)
        }else if(obj[animal]&&animal==="Cat"){
            arr.push(2)
        }else if(obj[animal]&&animal==="Other"){
            arr.push(3)
        }
    }
    return arr;
}
 
export default createAnimalTypeArray;