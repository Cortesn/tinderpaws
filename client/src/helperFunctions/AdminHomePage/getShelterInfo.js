import axios from 'axios';

const getShelterInfo = async (employeeId) => {
    // axios request to our server
    let url = 'https://localhost:3001/shelters/employees/' + employeeId;
    try{
        let data = await axios.get(url);
        console.log(data)
        return ( data );
    }catch(error){
        console.error(error)
    }
}
 
export default getShelterInfo;