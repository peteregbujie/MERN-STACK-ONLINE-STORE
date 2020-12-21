import { Link } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
 } 

 body {
 margin: 20px;
 overflow: scroll;
 font-family: 'Kumbh Sans', sans-serif;
 background-color: white;
 color: black;
}
`;

export const Container = styled.div`
 height: 90vh;
 width: 90vw;
 background-color: white;
 display: flex;
 flex-direction: row;
 place-items: center;
 margin: 2rem;
 @media screen and (max-width: 991px) {
  padding-right: 30px;
  padding-left: 30px;
 }
 @media (max-width: 400px) {
  width: 100%;
 }
`;

export const Title = styled.h1`
 display: inline-block;
 font-size: 2rem;
 font-weight: 700;
 color: black;
 margin: 2rem;
 place-items: center;
`;

export const Subtitle = styled.span`
 font-size: 1.3rem;
 font-weight: 500;
`;

export const Products = styled.div`
 display: flex;
 flex-wrap: wrap;
 justify-content: space-between;
`;

export const ProductCard = styled.div`
 flex: 0 1 auto;
 display: flex; /* so child elements can use flexbox stuff too! */
 border-radius: 15px;
 padding: 1.5rem 2rem;
 box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
 place-items: center;

 @media (max-width: 920px) {
  flex: 1 25%;
 }

 @media (max-width: 600px) {
  flex: 1 50%;
 }
`;

export const ProductImg = styled.img`
 display: block;
 border: 0.5px solid #ddd;
 border-radius: 2px;
 padding: 10px;
 max-width: 100%;
 height: 200px;
`;

export const ProductInfo = styled.div`
 margin-top: auto;
 font-size: 16px;
 font-weight: bold;
 text-align: center;
 display: flex;
 color: black;
`;

export const NavLink = styled(Link)`
 padding: 5px;
 text-decoration: none;
 text-align: center;
 font-size: 1.3rem;
 padding: 10px 30px;
 &:hover {
  color: red;
 }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0);
  }
  
  to{
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
 height: 100px;
 width: 100px;
 border-radius: 50%;
 border: 5px solid black;
 border-top-color: transparent;
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 animation: ${rotate360} 1s linear infinite;
`;

export const Select = styled.select`
 width: 100%;
 height: 35px;
 background: white;
 color: gray;
 padding-left: 5px;
 font-size: 14px;
 border: none;
 margin-left: 10px;

 option {
  color: black;
  background: white;
  display: flex;
  white-space: pre;
  min-height: 20px;
  padding: 0px 2px 1px;
 }
`;

export const List = styled.ul`
 display: flex;
 padding: 0;
 margin: 0;
 list-style-type: none;
 flex-direction: row;
 flex: 0 1 auto;
`;

export const ListItem = styled.li`
 display: flex;
 padding: 5%;
 flex-direction: column;
 align-items: center;
 justify-content: space-around;
 border-bottom: 1px solid rgba(221, 221, 221, 0.493);
`;

export const Button = styled.button`
 font-size: 14px;
 text-transform: uppercase;
 letter-spacing: 2.5px;
 font-weight: 500;
 background-color: black;
 border: none;
 border-radius: 45px;
 padding: 1rem;
 box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
 transition: all 0.3s ease 0s;
 cursor: pointer;
 outline: none;
 hover {
  background-color: #464646;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
 }
`;

export const Form = styled.form`
 background: white;
 border: 1px solid #dedede;
 display: flex;
 flex-direction: column;
 justify-content: space-around;
 margin: 5rem auto;
 max-width: 70%;
 padding: 5rem;
`;

export const FormInput = styled.input`
 padding: 1rem;
 margin: 5px;
 font-family: inherit;
 color: inherit;
 outline: 2px solid #dedede;
 border: #464646;
 border-radius: 10px;

 ::placeholder {
  color: black;
  font-weight: bold;
 }
`;

export const Info = styled.p`
 font-size: 1.2rem;
 padding: 10px;
 text-align: center;
 margin: 5px, 0px;
 color: inherit;
`;

export const AddressButton = styled.button`
 font-family: inherit;
 background: black;
 color: #ffffff;
 cursor: pointer;
 font-size: 2em;
 padding: 1.5rem;
 border: 0;
 transition: all 0.5s;
 border-radius: 10px;
 width: auto;
 margin: 2rem;
`;

export default GlobalStyle;
