import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let review_url = root_url + `djangoapp/add_review`;
  let carmodels_url = root_url + `djangoapp/get_cars`;

  const get_dealer = async () => {
    const res = await fetch(dealer_url, {
      method: "GET",
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer);
      if (dealerobjs.length > 0) setDealer(dealerobjs[0]);
    }
  };

  const get_cars = async () => {
    const res = await fetch(carmodels_url, {
      method: "GET",
    });
    const retobj = await res.json();

    let carmodelsarr = Array.from(retobj.CarModels);
    setCarmodels(carmodelsarr);
  };
  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let name =
      sessionStorage.getItem("firstname") +
      " " +
      sessionStorage.getItem("lastname");
    if (name.includes("null")) {
      name = sessionStorage.getItem("username");
    }

    let body = {
      name,
      dealership: id,
      purchase: true,
    };

    const values = ["review", "purchase_date", "car_make", "car_year"];
    for (let i = 0; values.length > i; i++) {
      const formValue = e.target[values[i]]?.value;
      if (!formValue) return alert("Missing Values");
      else if (values[i] === "car_make") {
        let model_split = formValue.split(" ");
        let make_chosen = model_split[0];
        let model_chosen = model_split[1];
        body["car_make"] = make_chosen;
        body["car_model"] = model_chosen;
      } else body[values[i]] = formValue;
    }

    const res = await fetch(review_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const json = await res.json();
      if (json.status === 200) {
        window.location.href = window.location.origin + "/dealer/" + id;
      }else return alert('Something went wrong!')

  };

  return (
    <div>
      <Header />
      <div className="max-w-[90%] mx-auto mt-[20px] flex justify-center flex-col">
        <div class="flex flex-col space-y-2 items-center">
          <h1 class="text-5xl font-bold font-sans tracking-tight">
            Your opinion is important to us
          </h1>
          <p class="text-xl sm:text-2xl font-serif text-gray-600">
            {dealer.full_name}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-[600px] mx-auto w-full mt-[20px]"
        >
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700"
            >
              Review
            </label>
            <textarea
              id="review"
              required
              rows={4}
              className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="purchase_date"
              className="block text-sm font-medium text-gray-700"
            >
              Purchase Date
            </label>
            <input
              type="date"
              id="purchase_date"
              required
              className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="car_make"
              className="block text-sm font-medium text-gray-700"
            >
              Car Make
            </label>
            <select
              id="car_make"
              required
              className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">--Select--</option>
              {carmodels.map((carmodel) => (
                <option value={carmodel.CarMake + " " + carmodel.CarMode}>
                  {carmodel.CarMake} {carmodel.CarMode}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="car_year"
              className="block text-sm font-medium text-gray-700"
            >
              Car Year
            </label>
            <input
              type="number"
              id="car_year"
              required
              min="2015"
              max={new Date().getFullYear()}
              className="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center py-2 px-4 w-fit mx-auto border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:!gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ease "
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
      {/* <div  style={{margin:"5%"}}>
      <h1 style={{color:"darkblue"}}>{dealer.full_name}</h1>
      <textarea id='review' cols='50' rows='7' onChange={(e) => setReview(e.target.value)}></textarea>
      <div className='input_field'>
      Purchase Date <input type="date" onChange={(e) => setDate(e.target.value)}/>
      </div>
      <div className='input_field'>
      Car Make 
      <select name="cars" id="cars" onChange={(e) => setModel(e.target.value)}>
      <option value="" selected disabled hidden>Choose Car Make and Model</option>
      {carmodels.map(carmodel => (
          <option value={carmodel.CarMake+" "+carmodel.CarModel}>{carmodel.CarMake} {carmodel.CarModel}</option>
      ))}
      </select>        
      </div >

      <div className='input_field'>
      Car Year <input type="int" onChange={(e) => setYear(e.target.value)} max={2023} min={2015}/>
      </div>

      <div>
      <button className='postreview' onClick={postreview}>Post Review</button>
      </div>
    </div> */}
    </div>
  );
};
export default PostReview;
