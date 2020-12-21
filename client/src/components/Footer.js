import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.h2`
 left: 0;
 bottom: 0;
 width: 100%;
 background-color: black;
 color: white;
 padding: 1rem 2rem;
 text-align: center;
 margin-top: 20px;
`;

const Footer = () => {
 return <FooterStyle>FashionMall @ 2020. All Rights Reserved</FooterStyle>;
};

export default Footer;
