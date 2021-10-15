const createIntro = (text) => {
    const paragraphs = text.split("\n").map((i, key)=>{
        return <p key={key}>{i}</p>;
    });
    return ( 
        paragraphs
     );
}
 
export default createIntro;