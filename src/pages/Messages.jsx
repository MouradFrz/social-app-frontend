import React, { useRef } from "react";
import { Container } from "../ui/components";
import Navbar from "../components/Navbar";
import Message from "../components/Message";
import { IoMdSend } from "react-icons/io";
import {
	useLoadAllConversationsQuery,
	useLoadMessagesQuery,
	useLoadConvoContactQuery,
	useLoadEmptyConvosQuery,
	useSendMessageMutation,
	useLazyLoadMessagesQuery,
} from "../store/chatApi";
import chatApi from "../store/chatApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import { useMemo } from "react";
import { useState } from "react";
import { ref } from "yup";
function Messages(props) {
	const { convoid } = useParams();
	const { data: messages } = useLoadAllConversationsQuery();
	const { data: emptyConvos } = useLoadEmptyConvosQuery();
	const [sendMessage] = useSendMessageMutation();
	const { data: conversationMessages } = useLoadMessagesQuery(convoid);

	const { data: contactInfo } = useLoadConvoContactQuery(convoid);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const messageInputRef = useRef(null);
	const messagesContainer = useRef(null);
	const [refresh, setRefresh] = useState(false);
	const userId = useSelector((state) => state.user.user.id);
	const token = useSelector((state) => state.user.user.token);
	const apiUrl = useSelector((state) => state.user.apiUrl);
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	const sendMessageFunction = () => {
		sendMessage({
			convoid,
			text: messageInputRef.current.value,
		});
		messageInputRef.current.value = "";
	};
	useEffect(() => {
		messagesContainer.current.scrollTo(
			0,
			messagesContainer.current.scrollHeight
		);
	}, [conversationMessages]);
	useEffect(() => {
		const refreshFunction = setTimeout(() => {
			setRefresh((prev) => !prev);
		}, 29000);
		return () => {
			clearTimeout(refreshFunction);
		};
	}, [refresh]);
	useEffect(() => {
		axios
			.get(`http://localhost:3000/canAccessConvo?convoid=${convoid}`)
			.then(({ data }) => {
				if (!data) {
					console.log("cant access");
					navigate("/");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
	}, [convoid]);
	useEffect(() => {
		const handler = () => {
			dispatch(
				chatApi.util.invalidateTags([{ type: "Conversation", id: convoid }])
			);
		};
		const pusher = new Pusher("0eea2cdb4546d917675d", {
			cluster: "eu",
			encrypted: true,
			channelAuthorization: {
				endpoint: "http://localhost:3000/pusher-auth",
				headers: { Authorization: `Bearer ${token}` },
			},
		});
		const channel = pusher.subscribe(`conversation-${convoid}`);
		channel.bind("new-message", handler);
		return () => {
			channel.unbind("new-message", handler);
		};
	}, [convoid, refresh]);
	const handleEnter = (event) => {
		if (event.keyCode === 13) {
			sendMessageFunction();
		}
	};
	return (
		<div className="relative">
			<Navbar />
			<Container className="flex  gap-3 max-w-[200px]">
				<div className="w-[30%]">
					{emptyConvos &&
						messages?.concat(emptyConvos).map((el) => (
							<div
								key={el.convoid}
								className={`py-2 pl-2 transition-all cursor-pointer ${
									parseInt(convoid) === el.convoid && "bg-black/10"
								} hover:bg-black/10`}
								onClick={() => {
									navigate(`/messages/${el.convoid}`);
								}}
							>
								<Message data={el} />
							</div>
						))}
				</div>
				<div className="w-[70%]">
					<div className="flex gap-5">
						<img
							src={
								contactInfo && contactInfo.pfpurl
									? `${apiUrl}profile-images/${
											contactInfo && contactInfo.pfpurl
									  }?t=${new Date().getTime()}`
									: "/pfp-placeholder.jpg"
							}
							className="w-14 rounded-full h-14 object-cover"
							alt="pfp"
						/>
						<div>
							<h1 className="font-semibold">
								{contactInfo &&
									`${contactInfo.firstname} ${contactInfo.lastname}`}
							</h1>
						
						</div>
					</div>
					<div
						className="h-[calc(100vh-180px)] flex flex-col overflow-y-scroll"
						ref={messagesContainer}
					>
						{conversationMessages && conversationMessages.length === 0 && (
							<p className="font-semibold text-center mt-2">
								Say hi to {contactInfo && contactInfo.firstname}!
							</p>
						)}
						{conversationMessages?.map((el, i) => (
							<div
								key={i}
								className={`p-1 w-fit ${
									userId === el.userid ? "self-end" : "self-start"
								}`}
							>
								<p
									className={`bg-primary ${
										userId === el.userid ? "bg-primary" : "bg-gray-400/50"
									} px-3 py-1 rounded-md`}
								>
									{el.text}
								</p>
							</div>
						))}
						<p className="text-xs invisible">Is typing ...</p>
					</div>
					<div className="p-1 flex gap-1">
						<input
							type="text"
							className="w-full p-1 outline-none"
							ref={messageInputRef}
							onKeyDown={handleEnter}
						/>
						<button
							className="rounded-full p-2 hover:bg-slate-300"
							onClick={sendMessageFunction}
						>
							<IoMdSend />
						</button>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Messages;
