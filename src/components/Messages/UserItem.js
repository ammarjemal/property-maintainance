// import { useState } from "react";
const UserItem = (props) => {
    let hours = new Date(props.date).getHours();
    let minutes = new Date(props.date).getMinutes();
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    const AMPM = hours >= 12 ? 'PM' : 'AM';
    hours = (hours % 12) || 12;
    const date = hours + ':' + minutes+' '+AMPM;
    // const date = props.date;
    return (
        <button onClick={props.onClick} style={{backdropFilter: `blur(0px)`}} className={`hover:bg-opacity-90 focus:bg-opacity-100 bg-opacity-0 bg-[whitesmoke] active:bg-opacity-70 researcher group w-full p-2 border-b border-slate-300 flex`}>
            <img className="object-cover w-10 h-10 rounded-full" src={props.photoURL} alt='User profile'/>
            <div className="ml-2 w-full flex flex-col items-start text-sm text-slate-600">
                <p className="flex justify-between w-full font-semibold group-hover:text-slate-800">
                    <span className="whitespace-nowrap">{props.displayName}</span>
                    {props.date && <span className="whitespace-nowrap font-normal ml-2 text-[13px]">{date}</span>}
                </p>
                <p className="whitespace-nowrap">{props.lastMessage}</p>
            </div>
        </button>
    )
}
export default UserItem;