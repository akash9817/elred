import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { icons } from "../../helpers/images";
import SearchBar from "components/Common/SearchBar";
import { request } from "services/axios";
import Card from "components/Common/Card";
import { useDispatch } from "react-redux";
import { setCategory } from "redux/actions/categoryAction";
import ProductCard from "./ProductCard";
import ProductDetail from "components/ProductDetail";


function ProductMenu() {
  const [isSubCategory, setIsSubCategory] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [activeCategory, setActiveCategory] = useState();
  const [cardClick, setCardClick] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      getSubCategories(activeCategory);
    }
  }, [activeCategory]);

  const getCategories = () => {
    request({
      url: "/getCategories.json",
      method: "GET",
    })
      .then((res) => {
        if (res.data.success) {
          setCategoriesData(res.data.result);
          setActiveCategory(res.data.result[0]?.categoryId);
          setIsSubCategory(true);
        }
      })
      .catch((err) => {
        console.log("Something went wrong", err)
      });
  };

  const getSubCategories = (categoryId) => {
    request({
      url: `/getSubCategory_${categoryId}.json`,
    })
      .then((res) => {
        if (res.data.success) {
          let data = res.data.result;
          setSubCategoriesData(data);
          dispatch(setCategory(data));
          setIsSubCategory(true);
        }
      })
      .catch((err) => {
        console.log("Something went wrong", err)
      });
  };

  const getProducts = (subCategoryId) => {
    request({
      url: `/getProduct_${subCategoryId}.json`,
    })
      .then((res) => {
        if (res.data.success) {
          let data = res.data.result;
          setProductsData(data);
         // dispatch(setAllProducts(data))
          setIsSubCategory(false);
        }
      })
      .catch((e) => {
        console.log("Something went wrong", e)
      });
  };

  const handleCategory = (i) => {
    setActiveCategory(i);
  };

  const openProductDetail = () => {
    setCardClick((Math.random() + 1).toString(36).substring(7))
  }

  return (
    <section className={style.productSection}>
      <div className={style.productTopBlock}>

        <div className={style.title}>
          {isSubCategory ? (
            <h4>Print Heads</h4>
          ) : (
            <div className="d-flex align-items-center">
              <img role="button" src={icons.leftArrow} alt="leftArrow" width={20} height={20} className="me-3" onClick={() => setIsSubCategory(true)}/>
              <h4 className="mb-0">All Products</h4>             
            </div>
          )}
          <SearchBar />
        </div>
    
        {isSubCategory && (
          <>
          <div className={style.categoryContainer}>
         
          <div className="d-flex">
            {categoriesData.length > 0 ? categoriesData.map((e, i) => (
              <Card
                key={e.categoryId}
                categoryName={e.categoryName}
                imageUrl={e.categoryImageURL}
                className={style.categoryImage}
                id={e.categoryId}
                activeCategory={activeCategory}
                onClick={handleCategory}
              />
            )) : <div>
              
                <h3>No Category Found</h3>
              </div>}
          </div>
          </div>
         <div className={style.line}></div>
         </>
        )}
      </div>
      {isSubCategory ? (
        <div className={style.subCategoryBlock}>
          {subCategoriesData.length > 0 ? subCategoriesData.map((e, i) => (
            <Card
              key={e.subCategoryId}
              categoryName={e.subCategoryName}
              imageUrl={e.subCategoryImageURL}
              className={style.subCategoryCard}
              id={e.subCategoryId}
              onClick={getProducts}
            />
          )) : <div>
            <h3 className="text-nowrap">No Sub Category Found</h3>
            </div>}
        </div>
      ) : (
        <div className={style.productsBlock}>
          {productsData.length > 0 ? productsData.map((e, i) => (
            <ProductCard  key={e.productId} data={e} onClick={openProductDetail}/>
          )) : (<div><h3 className="text-nowrap">No Products Found</h3></div>)}
        </div>
      )}
      <ProductDetail cardClick={cardClick} />
    </section>
  );
}

export default ProductMenu;
