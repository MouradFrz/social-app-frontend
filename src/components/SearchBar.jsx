import React from "react";
import { useState } from "react";
import { Input } from "../ui/components";
import userApi, { useLazySearchUsersQuery } from "../store/userApi";
import { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProgressBar } from "react-loader-spinner";
function SearchBar(props) {
	const [searchText, setSearchText] = useState("");
	const apiUrl = useSelector((state) => state.user.apiUrl);
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const [userSearch, { data, isFetching }] = useLazySearchUsersQuery();
	const timeout = useRef(null);
	const fetchUsers = () => {
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			userSearch(searchText);
		}, 500);
	};
	useEffect(() => {
		if (searchText.length >= 2) {
			fetchUsers();
		}
	}, [searchText]);
	return (
		<div className="w-[40%] relative">
			<Input
				ref={inputRef}
				style={{ marginBottom: 0 }}
				type="text"
				placeholder="Search ...."
				className="w-[100%]"
				value={searchText}
				onChange={(ev) => {
					setSearchText(ev.target.value);
				}}
			/>
			{searchText.length >= 2 &&
				(isFetching || data === undefined ? (
					<div className="absolute bg-primary w-full flex justify-center">
						<ProgressBar
						  borderColor = '#19a32d'
						  height="80px"
						  barColor = '#fdfdfd'/>
						  
					</div>
				) : (
					<ul className="bg-primary absolute top-[100%] w-full max-h-[400px] overflow-y-scroll">
						{data?.length ? (
							data.map((el) => (
								<Link
									to={`/profile/${el.id}`}
									className="items-center bg-primary hover:bg-secondary/50 p-5 flex gap-2"
									onClick={()=>{
										setSearchText("")
									}}
								>
									<img
										src={
											el && el.pfpurl
												? `${apiUrl}profile-images/${
														el && el.pfpurl
												  }?t=${new Date().getTime()}`
												: "/pfp-placeholder.jpg"
										}
										alt="profile image"
										className="w-10 h-10 aspect-square rounded-full"
									/>
									<h1>
										{el.firstname} {el.lastname}
									</h1>
								</Link>
							))
						) : (
							<h1 className="p-5">No users found!</h1>
						)}
					</ul>
				))}
		</div>
	);
}

export default SearchBar;
