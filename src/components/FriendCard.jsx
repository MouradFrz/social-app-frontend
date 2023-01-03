import React from 'react';

function FriendCard(props) {
    return (
        <div className='w-40'>
            <img className='rounded-lg aspect-square w-full' src="https://scontent.fczl2-2.fna.fbcdn.net/v/t1.6435-9/52987181_380989309394384_7544456929867726848_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_eui2=AeH9MEAlQcTM5ZIbhUbWzSv9ry9-lMzZ-GCvL36UzNn4YErpRtkDiVioWKxkU80u9ZPz5RmcTgLUUSOsmv63A8Dt&_nc_ohc=nje8Rd91A9YAX-ocopR&_nc_ht=scontent.fczl2-2.fna&oh=00_AfDRHJLcgZyL79cyB-nnTdPADE1gLJb6Bc1hy4oJyRXgag&oe=63DA882D" alt="" />
            <p className='font-bold text-xl'>John Dough</p>
        </div>
    );
}

export default FriendCard;