import styled from "styled-components";
import colors from "./colors";
const colorPalette = colors;
export const Container = styled.div`
    width:95%;
    max-width: 1440px;
    margin:auto;
    @media (max-width:768px){
        width: 98%;
    }
`
export const Form = styled.form`
	padding: 140px 40px;
	width: 50%;
	margin-left: auto;
	background-color: ${colorPalette.LIGHT_GREY};
	display: flex;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 100%;
	}
`;
export const Wrapper = styled.div`
	background-color: ${colorPalette.PRIMARY};
	width: 60%;
	margin: auto;
	@media (max-width: 768px) {
		width: 90%;
	}
	@media (max-width: 1200px) {
		width: 90%;
	}
`;
export const Input = styled.input`
	padding: 8px 16px;
	outline: none;
	margin-bottom: 10px;
`;
export const Button = styled.button`
	padding: 8px 16px;
	width: fit-content;
	background-color: ${colorPalette.PRIMARY};
	font-weight: 700;
	border: 1px solid ${colorPalette.DARK_GREY};
	cursor: pointer;
	transition: 0.1s ease;
	&:hover {
		background-color: ${colorPalette.PRIMARY + "aa"};
	}
`;