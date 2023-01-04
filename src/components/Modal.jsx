import React from "react";

function Modal({ children, show, setShow, title, onConfirm, onCancel }) {
	return (
		<div
			className={`w-full h-[100vh] ${
				show ? "z-20" : " z-[-10]"
			} fixed  flex justify-center`}
		>
			<div
				className={`w-[450px] shadow-lg mt-20 ${
					show ? "opacity-100 z-10" : "opacity-0"
				} transition-all bg-secondary rounded-sm p-10 h-fit`}
			>
				<h1 className="text-xl font-bold">{title}</h1>
				<hr />
				<div className="py-4">{children}</div>
				<div className="flex gap-2">
					<button
						onClick={() => {
							setShow(false);
                            onCancel()
						}}
						className="bg-red-400 py-2 hover:bg-red-400/90 transition-all  w-[50%] text-white"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="bg-green-300 hover:bg-green-300/90 text-white transition-all py-2 w-[50%]"
					>
						Confirm
					</button>
				</div>
			</div>
			<div
				className={`absolute w-full ${
					show ? "opacity-100" : "opacity-0 z-[-10]"
				} transition-all ease-linear duration-100 bg-gray-300/40 h-full`}
				onClick={(e) => {
					e.stopPropagation();
					setShow(false);
                    onCancel()
				}}
			></div>
		</div>
	);
}

export default Modal;
