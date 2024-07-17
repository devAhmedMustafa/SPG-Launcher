import GridContainer from "../Components/Containers/GridContainer"
import GameUnit from "@Components/Units/GameUnit"
import useFetch from "@Hooks/useFetch"
import Loading from "../Components/Animated/Loading"

export default function Main(){

    const {data, loading} = useFetch("https://starplus.onrender.com/games/")

    return (
        <>
            {
                loading? <Loading/> :
                <GridContainer title="Games">
                    {data.map((e)=> <GameUnit game={e} key={e._id}/>)}
                </GridContainer>
            }
            
        </>
    )
}