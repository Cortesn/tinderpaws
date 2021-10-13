import { ListItem, ListItemText } from "@mui/material";

const flowchartItems = (text) => {
    const items = text.split("\n").map((i, key)=>{
        return <ListItem key={key} sx={{ width:"50%", border: 1, borderRadius:"12px", borderColor:"grey.500",padding:"0%", marginTop:"2%"}}>
            <ListItemText sx={{textAlign:"center", padding:"0%"}}>{i}</ListItemText>
        </ListItem>;
    });
    return ( 
        items
     );
}
 
export default flowchartItems;