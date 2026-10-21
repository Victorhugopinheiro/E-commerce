import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets"
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";


function SearchMobile() {

    const { setShowSearch, setSearch, showSearch, search } = useContext(ShopContext)!;
    const [visibleSearch, setVisibleSearch] = useState<boolean>(true);
    const path = useLocation()


    return (
        <>
            {showSearch ? (
                <div className="w-full flex mx-auto     max-w-10/12 my-6 py-6  bg-opacity-40 md:hidden items-center justify-center z-10">
                    <div className="bg-white  shadow-lg    flex justify-between
                              gap-4 border border-gray-300 w-full rounded px-4  focus:outline-none focus:ring-2 
                             focus:ring-green-700">
                        <input
                            value={search}
                            onChange={(e) => setSearch!(e.target.value)}
                            type="text"
                            placeholder="Buscar produtos..."
                            className="w-full p-2 outline-none"
                        />
                        <button className="text-white rounded px-4 py-2">
                            <img src={assets.search_icon} alt="Search" className="w-5 " />
                        </button>
                    </div>


                </div>
            ) : null}
        </>
    );
}

export default SearchMobile