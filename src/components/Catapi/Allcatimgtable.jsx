import React, { useState } from "react";
// import "./alldogimgtable.css";

// npm install --save react-jsx
export const Allcatimgtable = ({ apicatData }) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [isPress, setPress] = useState(false);
  const [show, setShow] = useState(false);

  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const pageNumberLimit = 5;
  const itemsPerPage = 5;

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(apicatData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apicatData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }
  const handleApibtn = () => {
    setPress(!isPress);
  };

  const mouseOver = () => {
    setShow(true);
  };
  const mouseOut = () => {
    setShow(false);
  };
  return (
    <>
      <button className="dogbtn" onClick={handleApibtn}>
        {isPress ? "All images" : "Names"}
      </button>

      <table className="dml_table" cellPadding={0} cellSpacing={0}>
        <thead className="sticky-thc">
          <tr>
            <th>Id</th>
            {isPress ? null : <th>Image</th>}

            {isPress ? <th>Name & Image</th> : <th>Name</th>}

            <th>Origin</th>

            <th>Life_span</th>
            <th>Description</th>
            <th>Temperament</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, url) => (
            <tr key={url}>
              <td>{row.id}</td>
              {isPress ? null : (
                <td>
                  <img src={row.url} alt="cat" />
                </td>
              )}

              {isPress ? (
                <td onMouseOver={mouseOver} onMouseOut={mouseOut}>
                  <p href="#">
                    {row.name} {show ? <img src={row.url} alt="cat" /> : null}
                  </p>
                </td>
              ) : (
                <td>{row.name} </td>
              )}

              <td>{row.origin}</td>

              <td>{row.Life_span}</td>
              <td>{row.Description}</td>
              <td>{row.Temperament}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pageControler">
        <ul className="pageNumbers">
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              Prev
            </button>
          </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage === pages[pages.length - 1] ? true : false}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
