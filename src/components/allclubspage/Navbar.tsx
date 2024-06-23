import SortIcon from '@mui/icons-material/Sort';

interface navbarProps {
    onSortClick: () => void;
}

const Navbar = (props: navbarProps) => {
    const {onSortClick} = props;


    return (
        <div style={{
            position:'sticky',
            width:'100dvw',
            height:'6dvh',
            top:0,
            left:0,
            backgroundColor:'#01C13B',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            padding: 24,
            color:'white',
            fontWeight:'500'
        }}>
            <span>all about clubs</span>


            <SortIcon onClick={onSortClick} style={{cursor:'pointer'}}/>
        </div>
    )
}

export default Navbar