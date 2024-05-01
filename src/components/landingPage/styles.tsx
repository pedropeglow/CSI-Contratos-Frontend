import styled from 'styled-components';


export const Form = styled.form`
display: flex;
align-items: center;
flex-direction: column;
row-gap: 8px;

`;

export const Label = styled.label `
font-size: 20px;
`

export const Input = styled.input `
padding: 16px;
width: 250px;
height: 20px;
border-radius: 12px;
background-color: white;
color: black;
outline: none;
&:focus {
    border-color: black;
}
`

export const Button = styled.button `
  background-color: #1876F2;
  font-size: 14px;
  cursor: pointer;
  padding: 0.5rem 1.25rem;
  border-radius: 7px;
  text-transform: none;
  display: block;
  border: 2px solid transparent;
  &:hover {
    background-color: #fff; 
    border-color: #1876F2; 
    color: #1876F2; 
  }
`;


