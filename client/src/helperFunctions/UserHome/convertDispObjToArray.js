const convertDispObjToArray = (obj,arr) => {
    if(obj["OtherAnimals"]){
        arr.push('"Good with other animals"')
    }
    if(obj["Children"]){
        arr.push('"Good with children"')
    }
    if(obj["Leashed"]){
        arr.push('"Animal must be leashed at all times"')
    }
    if(obj["Available"]){
        arr.push('"Available"')
    }
    if(obj["Pending"]){
        arr.push('"Pending"')
    }
    return ( arr );
}
 
export default convertDispObjToArray;