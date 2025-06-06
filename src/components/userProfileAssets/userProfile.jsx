import React from 'react';

export function ProfilePicture({ image }) {
    return (
        <div className="profile-picture">
            <img className="w-[190px] h-[190px] rounded-[8px]" src={image} alt="User Profile" />
        </div>
    );
}

export function UserName({ name }) {
    return (
        <div className="user-name w-[420px] max-w-full leading-none break-words">
            <h1 className="text-[2rem] font-[500] truncate-3-lines">{name}</h1>
        </div>
    );
}

export function UserBio({ bio }) {
    return (
        <div className=" user-bio w-[420px] max-w-full leading-none break-words leading-none">
            <p className='truncate-3-lines'>{bio}</p>
        </div>
    );
}