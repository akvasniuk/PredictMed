import React from "react";
import styled from "styled-components";
import Robot from "../../assets/images/robot.gif";
import {useAuth} from "../../hooks/useAuth";

export default function Welcome() {
    const user = useAuth().getUser();
    const userName = `${user.firstname} ${user.lastname}`;

    return (
        <Container>
            <img src={Robot} alt="" />
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a admin to Start messaging.</h3>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;