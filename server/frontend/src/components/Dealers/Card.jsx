import React from "react";

const CardComponent = ({
  imgIconSrc,
  review,
  name,
  carMake,
  carModel,
  carYear,
  sentiment,
}) => {
  let status;
  switch (sentiment) {
    case "positive":
      status = "Positive";
      break;
    case "negative":
      status = "Negative";
      break;
    default:
      status = "Neutral";
  }

  return (
    <div className='className="bg-white rounded-lg shadow-md overflow-hidden"'>
      <div
        className={`p-4 flex justify-between w-full items-center ${
          (status === "Positive" && "bg-green-100") ||
          (status === "Negative" && "bg-red-100") ||
          (status === "Neutral" && "bg-yellow-100")
        }`}
      >
        <p
          className={`px-2 py-1 rounded-full text-sm font-semibold ${
            (status === "Positive" && "bg-green-200 text-green-800") ||
            (status === "Negative" && "bg-red-200 text-red-800") ||
            (status === "Neutral" && "bg-yellow-200 text-yellow-800")
          }`}
        >
          {status}
        </p>
        <img src={imgIconSrc} alt="imageIcon" className="emotion_icon" />
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4">{review}</p>
        <p className="text-sm text-gray-300 font-medium">
          - {name}, {carMake}, {carModel}, {carYear}
        </p>
      </div>
    </div>
  );
};

export default CardComponent;
