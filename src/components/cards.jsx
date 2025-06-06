import React, { useState } from "react";


export function CardsGrid({ cards, onDelete }) {

    const [selectedCard, setSelectedCard] = useState(null);

   if (!Array.isArray(cards)) return null; // or show a loading/error message

  const [liked, setLiked] = useState(() => {
    const stored = localStorage.getItem("likedCards");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleLike = (id) => {
    setLiked((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((lid) => lid !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem("likedCards", JSON.stringify(updated));
      return updated;
    });
  };

  // Inside CardsGrid component


return (
  <>
    <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 py-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex flex-col w-full group relative cursor-pointer"
          onClick={() => setSelectedCard(card)}
        >
          <div className="relative">
            <img
              src={card.imgSrc}
              alt={card.imgAlt}
              className="cards-grid-image w-[413px] h-[413px] object-cover rounded-md mb-2"
            />
            <button
              className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition"
              style={{
                zIndex: 10,
                padding: 0,
                background: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "5px",
                width: "30px",
                height: "30px",
              }}
              onClick={e => {
                e.stopPropagation();
                if (window.confirm("Are you sure you want to delete this image?")) {
                  onDelete(card.id);
                }
              }}
            >
              x
            </button>
          </div>
          <div className="flex flex-row justify-between items-center mb-2">
            <p className="text-left font-medium">{card.description}</p>
            <i
              className={`heart-icon w-[20px] h-[18px] cursor-pointer ${
                liked.includes(card.id)
                  ? "ri-heart-fill text-red-500 liked"
                  : "ri-heart-line"
              }`}
              onClick={e => {
                e.stopPropagation();
                toggleLike(card.id);
              }}
            ></i>
          </div>
        </div>
      ))}
    </div>

    {selectedCard && (
      <div className="card-onclick-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="shadow-white rounded-lg p-0 max-w-md w-full h-auto relative"> 
          <button
            className="close-card-onclick-modal absolute right-22 top-2"
            onClick={() => setSelectedCard(null)}
          >
            x
          </button>
          <img
            src={selectedCard.imgSrc}
            alt={selectedCard.imgAlt}
            className=" w-full  object-cover rounded mb-4"
          />
          <p className="text-lg text-white text-center">{selectedCard.description}</p>
        </div>
      </div>
    )}
  </>
);
}
