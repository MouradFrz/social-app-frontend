import React from 'react';
import colors from '../ui/colors';
import {AiFillLike} from 'react-icons/ai'
import {AiOutlineLike} from 'react-icons/ai'
import {CgComment} from 'react-icons/cg'
function Post(props) {
    return (
        <div className="mb-2 border-primary p-5 border-4 bg-darkgrey/20 shadow-md rounded-lg">
            <div className='flex'>
                <img className='w-16 h-fit rounded-full' src="https://scontent.fczl2-1.fna.fbcdn.net/v/t39.30808-1/215416612_980794829413826_3462808855768098485_n.jpg?stp=dst-jpg_p160x160&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHfz-eRye4z1CQWmGvQ71fOPOxIk8qfTH487EiTyp9MfncvP8l020eRIJJZaxozIcMrWKI9y1Z4ksyj2YagKjuv&_nc_ohc=56HXqoptnhoAX_7S_cP&_nc_ht=scontent.fczl2-1.fna&oh=00_AfCgHsEV8bDsGkDYNY4az0jin3w6W6__KlnvoUZDRUk6sg&oe=63B8088F" alt="" />
                <div className='flex flex-col pt-3 pl-3'>
                    <h1 className='font-bold'>Mourad Yaou</h1>
                    <p>3 hours ago</p>
                </div>
            </div>
            <div className='mt-6'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, magnam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, cum delectus autem deserunt magni vitae harum dolore unde et at ipsa? Praesentium, debitis beatae. Dolores.</p>
            </div>
            <div className='flex gap-4 mt-4'>
                <span className='flex items-center gap-1 font-semibold'>
                    <AiOutlineLike/> <p >Like</p>
                </span>
                <span className='flex items-center gap-1 font-semibold'>
                    <CgComment/> <p >Comments</p>
                </span>
            </div>
        </div>
    );
}

export default Post;