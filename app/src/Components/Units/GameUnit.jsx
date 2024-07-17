import { Link } from "react-router-dom";

export default function GameUnit(props){

    const game = props.game;

    return (
        <Link to={`${game.name}`} className="flex flex-col 2xl:w-[19%] xl:w-[24%] w-[32%] h-[460px] gap-2">
            <div className='w-full h-[80%] rounded-3xl overflow-hidden`'>
                <img className="w-full h-full object-cover" src={game.cover} alt="" />
            </div>
            <div>
                <p className=" font-bold">{game.name}</p>
            </div>
        </Link>
    )
}