import styled from 'styled-components';
import { TextField } from '@mui/material';

export const Form = styled.form`
display: flex;
align-items: center;
flex-direction: column;
row-gap: 8px;

input {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 16px;
    width: 250px;
    height: 20px;
    border-radius: 12px;
    background-color: white;
    &:focus {
        border-color: black;
    }
}
`;