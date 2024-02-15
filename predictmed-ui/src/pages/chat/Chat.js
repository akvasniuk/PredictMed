import React, {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "../../components/chat/ChatContainer";
import Contacts from "../../components/chat/Contacts";
import Welcome from "../../components/chat/Welcome";
import {useAuth} from "../../hooks/useAuth";
import {host} from "../../configs";
import {userService} from "../../services";

export default function Chat() {
    const currentUser = useAuth().getUser();

    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }

        const getAdmins = async () => {
            try {
                const {data} = await userService.getAdmins(currentUser._id, currentUser.role === "ADMIN");
                setContacts(data);
            } catch (e) {
                console.log(e);
            }
        }

        getAdmins();
    }, []);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <>
            <Container>
                <div className="container">
                    <Contacts contacts={contacts} changeChat={handleChatChange}/>
                    {currentChat === undefined ? (
                        <Welcome/>
                    ) : (
                        <ChatContainer currentChat={currentChat} socket={socket}/>
                    )}
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;
