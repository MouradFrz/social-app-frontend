import React from "react";
import PostForm from "../components/PostForm";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
import { Container } from "../ui/components";
import styled from "styled-components";
import FeedPosts from "../components/FeedPosts";
import { useState } from "react";
import axios from "axios";
const ThinContainer = styled(Container)`
	max-width: 1024px;
`;
function Homepage(props) {
	const dispatch = useDispatch();
	const [postDetails, setPostDetails] = useState({
		show: false,
		data: null,
	});
	return (
		<div className="relative">
			<Navbar />

			<ThinContainer className="flex  gap-3 max-w-[200px]">
				<UserCard />
				<div className="w-[70%]">
					<PostForm />
					<FeedPosts
						setPostDetails={setPostDetails}
						postDetails={postDetails}
					/>
				</div>
			</ThinContainer>
			<Footer />
		</div>
	);
}

export default Homepage;
