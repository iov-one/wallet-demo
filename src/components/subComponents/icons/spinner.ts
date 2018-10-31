import styled, { keyframes } from "styled-components";

 
const keyFrameSpin = keyframes`
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
    width: 30px;
    height: 30px;
    
    border: 3px solid #ffffff;
    border-top: 3px solid #b8bccc;
    border-radius: 100%;
    margin-left: 10px;
    margin-right: 10px;
    
    animation: ${keyFrameSpin} 0.55s infinite linear;
`;
