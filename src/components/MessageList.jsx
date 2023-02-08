import React, { useRef } from "react";
import { MdMessage } from "react-icons/md";
import {
	useLoadAllConversationsQuery,
	useLoadEmptyConvosQuery,
} from "../store/chatApi";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import Dropdown from "./Dropdown";
function MessageList(props) {
	const { data: messages } = useLoadAllConversationsQuery();
	const { data: emptyConvos } = useLoadEmptyConvosQuery();
	const navigate = useNavigate();
	const ActionList = messages && emptyConvos
		? messages.concat(emptyConvos).map((el) => ({
				title: <Message data={el} />,
				onClick: () => {
					navigate(`/messages/${el.convoid}`);
				},
		  }))
		: [];
	return (
		<Dropdown
			title={
				<div className="relative">
					<MdMessage className="text-xl hover:text-black/60 transition-all" />
				</div>
			}
			className="relative"
			list={ActionList}
			listWidth={"400px"}
			emptyMessage={"No messages yet!"}
		></Dropdown>
	);
}

export default MessageList;
