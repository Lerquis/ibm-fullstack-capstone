import React, { useState, useEffect } from "react";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  let [states, setStates] = useState([]);

  let dealer_url = "/djangoapp/get_dealers";

  let dealer_url_by_state = "/djangoapp/get_dealers/";

  const filterDealers = async (state) => {
    dealer_url_by_state = dealer_url_by_state + state;
    const res = await fetch(dealer_url_by_state, {
      method: "GET",
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      setDealersList(
        retobj.dealers?.dealerships
          ? retobj.dealers.dealerships
          : retobj.dealers
      );
    }
  };

  const get_dealers = async () => {
    const res = await fetch(dealer_url, {
      method: "GET",
    });
    const retobj = await res.json();
    if (retobj.status === 200) {
      let all_dealers = Array.from(retobj.dealers);
      let states = [];
      all_dealers.forEach((dealer) => {
        states.push(dealer.state);
      });

      setStates(Array.from(new Set(states)));
      setDealersList(all_dealers);
    }
  };
  useEffect(() => {
    get_dealers();
  }, []);

  let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
  return (
    <div>
      <Header />
      <div className="max-w-[90%] mx-auto mt-[20px] flex justify-center flex-col">
        <table className="min-w-full bg-white">
          <tr className="bg-gray-200 text-gray-600 uppercase !text-lg font-medium leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Dealer Name</th>
            <th className="py-3 px-6 text-left">City</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-left">Zip</th>
            <th className="py-3 px-6 text-left">
              <select
                className="bg-gray-200 text-gray-600 py-1 px-2 rounded outline-none"
                name="state"
                id="state"
                onChange={(e) => filterDealers(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  State
                </option>
                <option value="All">All States</option>
                {states.map((state) => (
                  <option value={state}>{state}</option>
                ))}
              </select>
            </th>
            {isLoggedIn ? (
              <th className="py-3 px-6 text-center">Review Dealer</th>
            ) : (
              <></>
            )}
          </tr>
          {dealersList.map((dealer) => (
            <tr className="border-b border-gray-200 hover:bg-gray-100 !text-sm">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {dealer["id"]}
              </td>
              <td className="py-3 px-6 text-left">
                <a href={"/dealer/" + dealer["id"]}>{dealer["full_name"]}</a>
              </td>
              <td className="py-3 px-6 text-left">{dealer["city"]}</td>
              <td className="py-3 px-6 text-left">{dealer["address"]}</td>
              <td className="py-3 px-6 text-left">{dealer["zip"]}</td>
              <td className="py-3 px-6 text-left">{dealer["state"]}</td>
              {isLoggedIn ? (
                <td className="py-3 px-6 text-left">
                  <a href={`/postreview/${dealer["id"]}`}>
                    <img
                      src={review_icon}
                      className="review_icon grayscale mx-auto"
                      alt="Post Review"
                    />
                  </a>
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </table>
      </div>
    </div>
    //      <div>
    //      <Header/>

    //     <table className='table'>
    //      <tr>
    //      <th>ID</th>
    //      <th>Dealer Name</th>
    //      <th>City</th>
    //      <th>Address</th>
    //      <th>Zip</th>
    //      <th>
    //      <select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
    //      <option value="" selected disabled hidden>State</option>
    //      <option value="All">All States</option>
    //      {states.map(state => (
    //          <option value={state}>{state}</option>
    //      ))}
    //      </select>

    //      </th>
    //      {isLoggedIn ? (
    //          <th>Review Dealer</th>
    //         ):<></>
    //      }
    //      </tr>
    //     {dealersList.map(dealer => (
    //        <tr>
    //          <td>{dealer['id']}</td>
    //          <td><a href={'/dealer/'+dealer['id']}>{dealer['full_name']}</a></td>
    //          <td>{dealer['city']}</td>
    //          <td>{dealer['address']}</td>
    //          <td>{dealer['zip']}</td>
    //          <td>{dealer['state']}</td>
    //          {isLoggedIn ? (
    //            <td><a href={`/postreview/${dealer['id']}`}><img src={review_icon} className="review_icon" alt="Post Review"/></a></td>
    //           ):<></>
    //          }
    //        </tr>
    //      ))}
    //     </table>;
    //  </div>
  );
};

export default Dealers;
