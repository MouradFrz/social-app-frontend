import React from "react";

function Dropdown({ title, list, className, listWidth = "", emptyMessage }) {
	const displayedList = list.map((el, key) => {
		return (
			<li className="hover:bg-primary/40 w-full" key={key}>
				<button className=" w-full py-2 px-4 inline-block" onClick={el.onClick}>
					{el.title}
				</button>
			</li>
		);
	});
	return (
		<div className={className + " absolute group"}>
			<h1 className="w-fit ">{title}</h1>
			<div
				className={`hidden bg-secondary z-40 w-[${
					listWidth || "200px"
				}] group-hover:block py-2  shadow-xl  right-0 absolute`}
			>
				<ul
					style={{
						width: listWidth ? listWidth : "200px",
					}}
				>
					{displayedList.length ? (
						displayedList
					) : emptyMessage ? (
						<li className="py-2 text-center">{emptyMessage}</li>
					) : (
						<li className="py-2 text-center">No data to display</li>
					)}
				</ul>
			</div>
		</div>
	);
}

export default Dropdown;
