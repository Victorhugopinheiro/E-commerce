import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets"
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";


function Search() {

    const { setShowSearch, setSearch, showSearch, search } = useContext(ShopContext)!;
    const [visibleSearch, setVisibleSearch] = useState<boolean>(false);
    const path = useLocation()

    useEffect(() => {

        if (path.pathname.includes("collection")) {
            setVisibleSearch(true);
        } else {
            setVisibleSearch(false);
        }

    }, [path])

    return (
        <>
            {showSearch && visibleSearch ? (
                <div className=" bg-gray-50 my-6 py-6 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white  shadow-lg p-6 w-full max-w-1/2 flex justify-between
                   gap-4 border border-gray-300 rounded px-4 py-1 focus:outline-none focus:ring-2 
                focus:ring-black">
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

                    <button>
                        <img
                            onClick={() => {
                                setShowSearch!(false);
                                setSearch!("");
                            }}
                            className="w-4 h-4 ml-4 cursor-pointer"
                            src={assets.cross_icon}
                            alt="Close Search"
                        />
                    </button>
                </div>
            ) : null}
        </>
    );
}

export default Search