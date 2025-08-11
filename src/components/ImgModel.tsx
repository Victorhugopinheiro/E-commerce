import { Link } from "react-router-dom";


interface ImgModelProps {
    url: string;
    title: string;
    price: string;
    currency?: string;
}

function ImgModel({ price, title, url, currency }: ImgModelProps) {
    return (
        <Link to={`/product/${title}`} className="flex flex-col items-center justify-between gap-2 bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="overflow-hidden">
                <img className="hover:scale-110 transition ease-in-out" src={url} />
            </div>

            <div className="flex flex-col items-center justify-center">
                <h2 className="text-sm pb-1 pt-2 ">{title}</h2>
                <p className="text-gray-800 text-sm font-medium ">{currency}{price}</p>
            </div>

        </Link>
    )
}

export default ImgModel