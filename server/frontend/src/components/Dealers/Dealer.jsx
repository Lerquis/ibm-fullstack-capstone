import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from "../Header/Header";
import Card from "./Card";

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("dealer"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let reviews_url = root_url + `djangoapp/reviews/dealer/${id}`;
  let post_review = root_url + `postreview/${id}`;

  const get_dealer = async () => {
    const res = await fetch(dealer_url, {
      method: "GET",
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer);
      setDealer(dealerobjs[0]);
    }
  };

  const get_reviews = async () => {
    const res = await fetch(reviews_url, {
      method: "GET",
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      if (retobj.reviews.length > 0) {
        setReviews(retobj.reviews);
      } else {
        setUnreviewed(true);
      }
    }
  };

  const senti_icon = (sentiment) => {
    let icon =
      sentiment === "positive"
        ? positive_icon
        : sentiment === "negative"
        ? negative_icon
        : neutral_icon;
    return icon;
  };

  useEffect(() => {
    get_dealer();
    get_reviews();
    if (sessionStorage.getItem("username")) {
      setPostReview(
        <a
          className="px-4 py-2 bg-black text-white text-lg rounded-full transition-all ease hover:scale-[1.1]"
          href={post_review}
        >
          Write a review
        </a>
      );
    }
  }, []);

  return (
    <div>
      <Header />

      <div className="max-w-[90%] mx-auto mt-[20px] flex justify-center flex-col">
        {Object.keys(dealer).length > 0 && (
          <div class="flex flex-col space-y-2 items-center">
            <h1 class="text-5xl font-bold font-sans tracking-tight">
              {dealer.full_name}
            </h1>
            <p class="text-xl sm:text-2xl font-serif text-gray-600">
              {dealer["city"]},{dealer["address"]}, Zip - {dealer["zip"]},{" "}
              {dealer["state"]}{" "}
            </p>
            {postReview}
          </div>
        )}

        <div>
          {reviews.length === 0 && unreviewed === false ? (
            <LoadingSpinner />
          ) : unreviewed === true ? (
            <div className="text-2xl font-bold font-sans tracking-tight mt-[20px]">
              No reviews yet!
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 mt-[20px]">
              {reviews.map((review, index) => (
                <Card
                  key={index}
                  carMake={review.car_make}
                  carModel={review.car_model}
                  carYear={review.car_year}
                  sentiment={review.sentiment}
                  imgIconSrc={senti_icon(review.sentiment)}
                  name={review.name}
                  review={review.review}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Dealer;
