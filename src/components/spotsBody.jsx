import React, { useState } from 'react';
import { CardsGrid } from './cards';
import { ProfilePicture, UserName, UserBio } from './userProfileAssets/userProfile';
import { EditProfileButton, EditProfileModal } from './userProfileAssets/editProfie';
import { NewPostButton, NewPostModal } from './userProfileAssets/newpost';


export function SpotsBody() {
  const [name, setName] = useState("Aliaune Damala Bouga Time Bongo Puru Nacka Lu Lu Lu Badara Akon...");
  const [bio, setBio] = useState("Known mononymously as Akon (/ˈeɪkɒn/), is a Senegalese-American singer, record producer, and entrepreneur. An influential figure in modern world...");
  const [image, setImage] = useState("/src/assets/image 2.png");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  //InitialCards
 const initialCards = [
  {
    id: 1,
    imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/val-thorens.jpg",
    imgAlt: "Post Image 1",
    description: "Val Thorens",
    heartId: "post1"
  },
  {
    id: 2,
    imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/restaurant-terrace.jpg",
    imgAlt: "Post Image 2",
    description: "Restaurant terrace",
    heartId: "post1"
  },
  {
    id: 3,
    imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/outdoor-cafe.jpg",
    imgAlt: "Post Image 3",
    description: "An outdoor cafe",
    heartId: "post1"
  },
  {
    id: 4,
    imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/long-bridge.jpg",
    imgAlt: "Post Image 4",
    description: "A very long bridge, over the forest...",
    heartId: "post1"
  },
  {
    id: 5,
    imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/tunnel-morning-light.jpg",
    imgAlt: "Post Image 5",
    description: "Tunnel with morning light",
    heartId: "post1"
  },
  {
    id: 6,
    imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/mountain-house.jpg",
    imgAlt: "Post Image 1",
    description: "Mountain house",
    heartId: "post1"
  }
]

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards");
    const newCards = saved ? JSON.parse(saved) : [];
     // Filter out initial cards that are already in newCards (by id)
    const initialNotInNew = initialCards.filter(
      ic => !newCards.some(nc => nc.id === ic.id)
    );
    return [...newCards, ...initialNotInNew];
    });

  const handleSaveProfile = ({ name, bio, image }) => {
    setName(name);
    setBio(bio);
    setImage(image);
  };

  const handleAddCard = (newCard) => {
    // Only add to localStorage (new cards)
    const saved = localStorage.getItem("cards");
    const newCards = saved ? JSON.parse(saved) : [];
    const updatedNewCards = [newCard, ...newCards];
    setCards([newCard, ...cards]);
    localStorage.setItem("cards", JSON.stringify(updatedNewCards));
  };

  const handleDeleteCard = (id) => {
    const isInitial = initialCards.some(card => card.id === id);
    if (isInitial) {
      // Remove from UI only
      setCards(cards.filter(card => card.id !== id));
    } else {
      // Remove from UI and localStorage
      const saved = localStorage.getItem("cards");
      const newCards = saved ? JSON.parse(saved) : [];
      const updatedNewCards = newCards.filter(card => card.id !== id);
      setCards(cards.filter(card => card.id !== id));
      localStorage.setItem("cards", JSON.stringify(updatedNewCards));
    }
  };

  return (
    <>
      <div className="user-profile w-full py-[34px] relative">
        <section className="user-profile-flex flex flex-row gap-[20px] h-[190px]">
          <ProfilePicture image={image} />
          <div className="user-profile-name-bio flex flex-col w-full h-full justify-between ">
            <div className="user-profile-name-bio-wrapper flex flex-col w-[420px] gap-[12px] self-start">
                <UserName name={name} />
                <UserBio bio={bio} />
            </div>
            <div className="user-profile-button flex flex-row w-full items-end">
              <EditProfileButton onClick={() => setIsEditModalOpen(true)} />
              <div className="new-post-wrapper flex mt-2">
                <NewPostButton onClick={() => setIsNewPostModalOpen(true)} />
              </div>
            </div>
          </div>
        </section>

        
      </div>
    
        <CardsGrid
          cards={cards}
          onDelete={handleDeleteCard}
        />
     

      {isEditModalOpen && (
        <EditProfileModal
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
          name={name}
          bio={bio}
          image={image}
        />
      )}

      {isNewPostModalOpen && (
        <NewPostModal
          onClose={() => setIsNewPostModalOpen(false)}
          onAdd={handleAddCard}
        />
      )}
    </>
  );
}