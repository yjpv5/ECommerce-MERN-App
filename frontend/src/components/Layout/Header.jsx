import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';
import { categoriesData, productData } from "../../static/data";
import { AiOutlineHeart,AiOutlineSearch, AiOutlineShoppingCart,} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import {BiMenuAltLeft} from "react-icons/bi";
import DropDown from "./DropDown";


const Header = () => {
    const [searchTerm, setSearchTerm] =useState("")
    const [searchData, setSearchData] =useState(null)
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    
        const filteredProducts =
        //   allProducts &&
        //   allProducts.filter((product) =>
        //     product.name.toLowerCase().includes(term.toLowerCase())
        //   );
        productData.filter((product)=>
            product.name.toLowerCase().includes(term.toLowerCase())
        )
        setSearchData(filteredProducts);
    };
    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
          setActive(true);
        } else {
          setActive(false);
        }
    });

    return (
        <>
        <div className={`${styles.section}`}>  {/*create container */}
            <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
              {/* icon links to Homepage */}
              <div>
                <Link to="/">
                  <img
                    src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                    alt=""
                  />
                </Link>
              </div>
              {/* search box */}
              <div className="w-[50%] relative">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                />
                <AiOutlineSearch
                  size={30}
                  className="absolute right-2 top-1.5 cursor-pointer"
                />
                {/* populate drop down list of typed results */}
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        return (
                          <Link to={`/product/${i._id}`}>
                            <div className="w-full flex items-start-py-3">
                              <img
                                // src={`${backend_url}${i.images[0]}`}
                                src={`${i.image_Url[0].url}`}
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
              <div className={`${styles.button}`}>
                 <Link to="/seller">  {/*{`${isSeller ? "/dashboard" : "/shop-create"}`}*/}
                    <h1 className="text-[#fff] flex items-center">
                    {/* {isSeller ? "Go Dashboard" : "Become Seller"}{" "} */}
                    Become Seller <IoIosArrowForward className="ml-1" />
                    </h1>
                </Link>
              </div>        
          
            </div>

            <div className = {`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}>
                <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
                    {/* categories */}
                    <div onClick={() => setDropDown(!dropDown)}>
                        <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                            <button
                                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                            >
                                All Categories
                            </button>
                            <IoIosArrowDown
                                size={20}
                                className="absolute right-2 top-4 cursor-pointer"
                                onClick={() => setDropDown(!dropDown)}
                            />
                            {dropDown ? (
                                <DropDown
                                categoriesData={categoriesData}
                                setDropDown={setDropDown}
                                />
                            ) : null}
                        </div>
                    </div>
                        
                </div>
            </div>
        </div>
        </>
    )
}

export default Header