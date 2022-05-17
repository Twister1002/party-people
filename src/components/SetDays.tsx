import React, {useState, useEffect} from "react";

type SetDaysProps = Readonly<{

}>;

const SetDays = function(props: SetDaysProps) {

    return (
        <div>
            <ul>
                <li>May 20 (Friday)</li>
                <li>May 21 (Saturday)</li>
                <li>May 22 (Sunday)</li>
            </ul>
        </div>
    )

}

export default SetDays;