import React, { useState, useRef } from "react";
import { BsImageFill } from "react-icons/bs";
import { Input, Button } from "../ui/components";
import { nanoid } from "@reduxjs/toolkit";
import { useCreatePostMutation } from "../store/userApi";
import userApi from "../store/userApi";
import { useDispatch } from "react-redux";
function PostForm(props) {
    const dispatch = useDispatch()
	const postImageInput = useRef(null);
	const [postText, setPostText] = useState("");
	const [postImages, setPostImages] = useState([]);
	const [createUser] = useCreatePostMutation();
	const appendToLoadedImages = (ev) => {
		let reader = new FileReader();
		reader.onload = function (e) {
			setPostImages((prev) => [
				...prev,
				{ id: nanoid(), src: e.target.result, object: ev.target.files[0] },
			]);
		};
		reader.readAsDataURL(ev.target.files[0]);
	};
	const addNewPost = () => {
		const fd = new FormData();
		fd.append("text", postText);
		for (let i = 0; i <= postImages.length - 1; i++) {
			fd.append("images[]", postImages[i].object);
		}
		createUser(fd);
		setPostImages([]);
		setPostText("");
		dispatch(userApi.util.invalidateTags(["Posts"]));
	};
	return (
		<div className="p-3 border-4 border-primary mb-2 shadow-lg">
			<h2>New Post</h2>
			<textarea
				value={postText}
				onChange={(ev) => {
					setPostText(ev.target.value);
				}}
				placeholder="What's on your mind?"
				className="w-full rounded-sm outline-none p-4 resize-none h-fit"
			></textarea>
			<Input
				type="file"
				accept="image/*"
				className="hidden"
				ref={postImageInput}
				onChange={(ev) => {
					appendToLoadedImages(ev);
				}}
			/>
			<div className="flex flex-wrap gap-3 mb-2">
				{postImages &&
					postImages.map((img, i) => {
						return (
							<img
								src={img.src}
								key={img.src + i}
								className="w-20 aspect-square object-cover"
								onClick={(ev) => {
									setPostImages((prev) => {
										return prev.filter((el) => el.id !== img.id);
									});
								}}
							/>
						);
					})}
			</div>
			<span
				className="inline-block p-2 border-primary border-2 cursor-pointer"
				onClick={() => {
					postImageInput.current.click();
				}}
			>
				<BsImageFill />
			</span>
			<Button className="block" onClick={addNewPost}>
				Publish
			</Button>
		</div>
	);
}

export default PostForm;
