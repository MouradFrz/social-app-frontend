import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
	AiOutlineLike,
	AiFillLeftCircle,
	AiFillLike,
	AiFillRightCircle,
} from "react-icons/ai";
function PostDetails({ postDetails, setPostDetails }) {
	const apiUrl = useSelector((state) => state.user.apiUrl);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	return (
		<div
			className={`bg-black/30 ${
				postDetails.show ? "" : "hidden"
			} fixed z-50 left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center top-[50%] w-full h-full `}
		>
			<div className="w-[95%] h-[95%] flex bg-white shadow-lg rounded-md">
				<div className="w-[calc(100%-500px)] relative flex justify-center items-center bg-black">
					<span className="absolute right-4 top-4 bg-black inline-block text-white z-20 px-3 rounded-xl">
						{currentImageIndex + 1}/{postDetails.myImages?.length}
					</span>
					<img
						className="max-h-full max-w-full"
						src={`${apiUrl}/post-images/${
							postDetails.myImages && postDetails.myImages[currentImageIndex]
						}`}
						alt=""
					/>
					{postDetails.myImages?.length > 1 ? (
						<>
							<span
								onClick={() => {
									setCurrentImageIndex((prev) => {
										return (
											(prev - 1 + postDetails.myImages.length) %
											postDetails.myImages.length
										);
									});
								}}
								className="absolute top-0 left-0 h-full cursor-pointer opacity-5 hover:opacity-80 bg-gradient-to-r transition-all duration-100 from-slate-600 p-10 flex items-center"
							>
								<AiFillLeftCircle className="text-4xl" />
							</span>
							<span
								onClick={() => {
									setCurrentImageIndex((prev) => {
										return (prev + 1) % postDetails.myImages.length;
									});
								}}
								className="absolute top-0 right-0 h-full cursor-pointer opacity-5 hover:opacity-80 bg-gradient-to-l transition-all duration-100 from-slate-600 p-10 flex items-center "
							>
								<AiFillRightCircle className="text-4xl" />
							</span>
						</>
					) : (
						""
					)}
				</div>
				<div className="w-[500px] relative">
					<button
						className="absolute right-2 top-3"
						onClick={() => {
							setPostDetails({
								show: false,
							});
						}}
					>
						<AiOutlineClose className="text-2xl" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default PostDetails;
