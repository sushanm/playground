import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import Products from "./components/Products";

function App() {
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchProducts = async (skip) => {
    const res = await fetch(
      "https://dummyjson.com/products?limit=10&skip=" + skip
    );
    const data = await res.json();
    console.log(data);
    if (data && data.products) {
      setTotalPage(Math.floor(data.total / 10));
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts(0);
  }, []);

  const handlePageHandler = (selectedPage) => {
    setPage(selectedPage);
    fetchProducts(selectedPage * 10);
  };
  return (
    <>
      {products && (
        <>
          <div className="products">
            {products &&
              products.map((product, i) => {
                return (
                  <Products
                    key={i}
                    title={product.title}
                    thumbnail={product.thumbnail}
                  />
                );
              })}
          </div>
          <div className="pagination">
            <span
              onClick={() => handlePageHandler(page - 1)}
              style={{ display: page === 1 ? "none" : "block" }}
            >
              ⏮️
            </span>
            {[...Array(totalPage)].map((_, i) => {
              return (
                <span
                  className={`pagination__page ${
                    page === i + 1 ? "pagination__active__page" : ""
                  }`}
                  key={i}
                  onClick={() => handlePageHandler(i + 1)}
                >
                  {i + 1}
                </span>
              );
            })}
            <span
              onClick={() => handlePageHandler(page + 1)}
              style={{
                display: page === totalPage ? "none" : "block",
              }}
            >
              ⏭️
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default App;
