import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardTitle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { movieService } from "../../API/services/movieService";
import { range } from "range";
import "./movie.scss";
import { Link } from "react-router-dom";

function Movie() {
  const [moviesData, setMoviesData] = useState();
  const [curPage, setCurPage] = useState(1);
  const [option, setOption] = useState(false);
  const { push } = useHistory();

  const getData = useCallback((page) => {
    movieService.getMovies(`?page=${page}&per_page=8`).then((res) => {
      setMoviesData(res.data);
    });
  }, []);

  useEffect(() => {
    getData(curPage);
  }, [getData, curPage]);

  const handlePageChange = useCallback(
    (ev) => {
      const val = ev.target.value;
      push(`?page=${val}`);
      setCurPage(val);
    },
    [push]
  );

  const handlePagePrev = useCallback(
    (curPage) => {
      const prevPage = curPage - 1;
      if (prevPage >= 1) {
        push(`?page=${prevPage}`);
        setCurPage(prevPage);
      }
    },
    [push]
  );

  const maxPageCount = useMemo(
    () => !!moviesData && moviesData.totalPage,
    [moviesData]
  );

  const handlePageNext = useCallback(
    (curPage) => {
      const nextPage = Math.round(curPage) + 1;
      if (nextPage <= maxPageCount) {
        push(`?page=${nextPage}`);
        setCurPage(nextPage);
      }
    },
    [push, maxPageCount]
  );

  const handleOpenOption = useCallback(() => {
    setOption(true);
  }, []);

  const handleCloseOption = useCallback(() => {
    setOption(false);
  }, []);

  return (
    <>
      <div className="header-filter d-flex justify-content-center align-items-center gap-5">
        <select
          onMouseDown={() => handleOpenOption()}
          onMouseLeave={() => handleCloseOption()}
          style={
            option
              ? { borderRadius: "20px 20px 0 0" }
              : { borderRadius: "20px" }
          }
        >
          <option value="0" defaultValue>
            Kinoteatrlar
          </option>
          <option value="1">28 Mall</option>
          <option value="2">Ganclik Mall</option>
          <option value="2">Deniz Mall</option>
          <option value="2">Azerbaijan Cinema</option>
        </select>
        <select
          onMouseDown={() => handleOpenOption()}
          onMouseLeave={() => handleCloseOption()}
          style={
            option
              ? { borderRadius: "20px 20px 0 0" }
              : { borderRadius: "20px" }
          }
        >
          <option value="0">Bütün dillərdə</option>
          <option value="1800">Azərbaycanca</option>
          <option value="1798">На русском</option>
          <option value="1797">In English</option>
          <option value="1799">Türkçe</option>
        </select>
        <div className="in-english d-flex justify-content-center align-items-center"><Link>Movies in English</Link></div>
      </div>
      <div className="container mt-3 mb-5">
        <CardGroup className="row justify-content-center">
          {moviesData?.data.map((item) => (
            <Card key={item.id} className="p-3 d-flex justify-content-center align-items-center col-md-3">
              <CardImg
                alt="Card image cap"
                src="https://picsum.photos/318/180"
                top
                width="100%"
              />
              <CardBody>
                <CardTitle tag="h5" className="d-flex justify-content-center align-items-center">
                  <img src="" alt=""></img>
                  <img src="" alt=""></img>
                  <img src="" alt=""></img>
                  </CardTitle>
                <CardSubtitle className="d-flex justify-content-center align-items-center">
                <div>
                  <Link>seanslar</Link>
                </div>
                <div>
                  <span>6+</span>
                </div>
                </CardSubtitle>
              </CardBody>
            </Card>
          ))}
        </CardGroup>
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePagePrev(curPage)}
                previous
              />
            </PaginationItem>
            {!!maxPageCount &&
              range(1, maxPageCount + 1).map((i) => (
                <PaginationItem key={i}>
                  <PaginationLink value={i} onClick={handlePageChange}>
                    {i}
                  </PaginationLink>
                </PaginationItem>
              ))}
            <PaginationItem>
              <PaginationLink onClick={() => handlePageNext(curPage)} next />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default Movie;
