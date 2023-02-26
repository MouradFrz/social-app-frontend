import React from "react";
import { Container, Input } from "../ui/components";
import { useUserDataQuery } from "../store/userApi";
import { useSelector, useDispatch } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import RequestsList from "./RequestsList";
import { FiLogOut } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { logout } from "../store/userSlice";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import MessageList from "./MessageList";
function Navbar(props) {
	const userid = useSelector((state) => state.user.user.id);
	const apiUrl = useSelector((state) => state.user.apiUrl);
	const dispatch = useDispatch();
	const { data } = useUserDataQuery(userid);
	const ActionList = [
		{
			title: (
				<h1 className="font-semibold text-left">
					<FiLogOut className="inline" /> Logout
				</h1>
			),
			onClick: () => {
				dispatch(logout());
			},
		},
		{
			title: (
				<h1 className="text-left">
					<Link to={`/profile/${userid}`} className="font-semibold">
						<ImProfile className="inline" /> My profile
					</Link>
				</h1>
			),
		},
	];
	return (
		<div>
			<Container className="flex items-center justify-between fixed z-30 bg-secondary left-[50%] translate-x-[-50%]">
				<div>
					<Link className="font-bold text-2xl ml-10 inline-block py-5" to="/">
						Socialz
					</Link>
				</div>
				<SearchBar />

				{data && (
					<div className="flex gap-5 items-center">
						<MessageList />
						<RequestsList />
						<Dropdown
							title={
								<div className="flex gap-4 items-center">
									<img
										src={
											data && data.pfpurl
												? `${apiUrl}profile-images/${
														data && data.pfpurl
												  }?t=${new Date().getTime()}`
												: "/pfp-placeholder.jpg"
										}
										alt="profile image"
										className="w-10 h-10 aspect-square rounded-full"
									/>
									<h1>
										{data.firstname} {data.lastname}{" "}
										<IoMdArrowDropdown className="inline" />
									</h1>
								</div>
							}
							list={ActionList}
							className="relative"
						></Dropdown>
					</div>
				)}
			</Container>
			<div className="h-[75px]"></div>
		</div>
	);
}

export default Navbar;
