import { ListItem, ListItemText} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const flowchartItems = (text) => {
    const content = text.split("\n")
    const items = content.map((i, key)=>{
        return <div key={key}  >
                    {/* <ListItem key={key} sx={{ width:"50%", border: 1, borderRadius:"12px", borderColor:"grey.500",padding:"0%", marginTop:"2%"}}>
                    //     <ListItemText sx={{textAlign:"center", padding:"0%"}}>{i}</ListItemText>
                    // </ListItem>; */}

                    <ListItem sx={{ border: 1, borderRadius:"12px", borderColor:"grey.500",paddingLeft:3, paddingRight:3, paddingTop:"0%", paddingBottom:"0%"}}>
                        <ListItemText sx={{textAlign:"center", padding:"0%"}}>{i}</ListItemText>
                    </ListItem>
                    <ListItem sx={{paddingTop:"0%", paddingBottom:"0%"}}>
                        <ListItemText sx={{textAlign:"center", padding:"0%"}}><ArrowDownwardIcon/></ListItemText>
                    </ListItem>
                </div>;
    });
    return ( 
        items
     );
}
 
export default flowchartItems;