import React, {useState, useEffect, EventHandler} from "react";
import ReactDOM from "react-dom";
import {ReactComponent as Bin} from "../icons/bin.svg";
import {ReactComponent as Checkmark} from "../icons/checkmark.svg";

import "../styles/css/modal.min.css";

type ModalProps = Readonly<{
    setId?: number
    onModalClose: () => void;
}>;

const Modal = function({ setId, ...props }: ModalProps) {
    const [newFriendName, setNewFriendName] = useState<string>("");
    const [friendsGoing, setFriendsGoing] = useState<Array<string>>([]);

    useEffect(() => {
        // Grab the data from the server
        fetch(`/setblock/${setId}`)
        .then(body => body.json())
        .then((jsonData: Array<string>) => {
            setFriendsGoing(jsonData);
        })
    }, [setId])

    function onNewFriendNameChange(e: React.FormEvent<HTMLInputElement>) {
        setNewFriendName(e.currentTarget.value);
    }

    function onAddFriend(e: React.FormEvent) {
        e.stopPropagation();
        e.preventDefault();

        fetch("/setblock/add", { 
            method: "PUT", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                settimeId: setId,
                name: newFriendName
            })
        })
        .then(body => body.json())
        .then((json: Array<string>) => {
            setFriendsGoing(json);
        })

        return false;
    }

    function onFriendRemove(index: number) {
        fetch("/setblock/delete", { 
            method: "DELETE", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                settimeId: setId,
                name: friendsGoing[index]
            })
        })
        .then(body => body.json())
        .then((json: Array<string>) => {
            setFriendsGoing(json);
        })
    }

    return ReactDOM.createPortal(
        (
            <>
                <div id="modal-background" onMouseDown={props.onModalClose} />
                <div id="modal-content">
                    <header>Who is going?</header>
                    {
                        friendsGoing.map((x, i) => {
                            return (
                                <div key={`friend-going-${x}`}>
                                    {x}
                                    <span onClick={() => onFriendRemove(i)}>
                                        <Bin />
                                    </span>
                                </div>
                            )
                        })
                    }
                    <form onSubmit={onAddFriend}>
                        Add Friend: 
                        <input 
                            type="text" 
                            onChange={onNewFriendNameChange} 
                            value={newFriendName}
                        />
                        <span onClick={onAddFriend}>
                            <Checkmark />
                        </span>
                    </form>
                </div>
                <div id="modal-buttons">
                    <button onClick={props.onModalClose}>Close</button>
                </div>
            </>
        ), document.querySelector("#modal")!
    )

}

export default Modal;