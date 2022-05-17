
import { MouseEvent, useEffect, useState } from "react";
import Modal from "./Modal";

import "../styles/css/schedule.min.css";
type ScheduleProps = Readonly<{
    showFriendsOnly: boolean,
    setDay: number
}>;

type SetData = {
    [k: number]: Array<string>
}

type SetDay = {
    image?: string,
    name: string,
    timeFrame: string,
    dataTime: number
    setTimeId: number
}

const Schedule = function ({setDay, showFriendsOnly}: ScheduleProps) {
    const [setSchedule, setSetSchedule] = useState<{[stageName: string]: Array<SetDay>}>({})
    const [setId, setSetId] = useState<number>(-1);
    const [friendsInSets, setFriendsInSets] = useState<SetData>({})

    useEffect(() => {
        // Grab the data from the server
        fetch(`/setblock/day/${setDay}`)
        .then(body => body.json())
        .then((json) => {
            setSetSchedule(json)
        })
    }, [setDay])

    useEffect(() => {
        // Grab the friend data from the server
        fetch("/setblock")
        .then(body => body.json())
        .then((json: SetData) => {
            // Object.entries(json).map(([id, names]) => {
            //     setFriendsInSets(json);
            //     const element = document.querySelector(`[data-settime-id="${id}"] .friends`)
    
            //     if (element) {
            //         element.textContent = names.join(", ");
            //     }
            // })
            setFriendsInSets(json);
        })
    }, [setId])

    function onSetBlockClicked(setId: number) {
        console.log(setId);
        setSetId(Number(setId));
    }

    function onModalClose() {
        setSetId(-1);
    }

    return (
        <div className="schedule-wrapper">
            <div className="schedule">
                <div className="schedule__sidebar">
                    {
                        Object.keys(setSchedule).map((x) => {
                            return (
                                <div key={`stage-${x}`} className="schedule__label">{x}</div>
                            )
                        })
                    }
                </div>
                <div className="schedule__scrollable">
                    <div className="schedule__row">
                        <div className="schedule__header" data-time="60">05:00 PM</div>
                        <div className="schedule__header" data-time="60">06:00 PM</div>
                        <div className="schedule__header" data-time="60">07:00 PM</div>
                        <div className="schedule__header" data-time="60">08:00 PM</div>
                        <div className="schedule__header" data-time="60">09:00 PM</div>
                        <div className="schedule__header" data-time="60">10:00 PM</div>
                        <div className="schedule__header" data-time="60">11:00 PM</div>
                        <div className="schedule__header" data-time="60">12:00 AM</div>
                        <div className="schedule__header" data-time="60">01:00 AM</div>
                        <div className="schedule__header" data-time="60">02:00 AM</div>
                        <div className="schedule__header" data-time="60">03:00 AM</div>
                        <div className="schedule__header" data-time="60">04:00 AM</div>
                        <div className="schedule__header" data-time="30">05:00 AM</div>
                    </div>
                    {
                        Object.entries(setSchedule).map(([k, v], i) => {
                            return (
                                <div key={`stage-${k}-row-${i}`} className="schedule__row">
                                    {
                                        v.map((data: SetDay) => {
                                            return !data.name || (showFriendsOnly && !friendsInSets[data.setTimeId]?.length) ? (
                                                <div data-time={data.dataTime} />
                                            ) : (
                                                <div 
                                                    className="clickable set-block" 
                                                    data-settime-id={data.setTimeId} 
                                                    data-time={data.dataTime}
                                                    onClick={() => onSetBlockClicked(data.setTimeId)}
                                                >
                                                    <img src={data.image} alt="" />
                                                    <div className="set-block__text">
                                                        <span>{data.name}</span>
                                                        <span>{data.timeFrame}</span>
                                                        <span className="friends">
                                                            {
                                                                friendsInSets[data.setTimeId]?.join(", ")
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            { setId === -1 ? null : (
                <Modal 
                    setId={setId}
                    onModalClose={onModalClose}
                />
            )}
        </div>
    )
}

export default Schedule;