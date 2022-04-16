import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardGroup, CardSubtitle, CardText, CardTitle, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { movieService } from '../../API/services/movieService';
import { range } from "range";

function Index() {
    const [moviesData, setMoviesData] = useState();
    const [curPage, setCurPage] = useState(1);
    const {push} = useHistory();
  
    const getData = useCallback((page) => {
      movieService.getMovies(`?page=${page}&per_page=8`)
      .then((res) => {
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
      [push,maxPageCount]
    );

  return (
    <div className="container mt-3 mb-5">
    <CardGroup className="gap-3">
      {moviesData?.data.map((item) => (
        <Card key={item.id}>
          {/* <CardImg
            alt="Card image cap"
            src="https://picsum.photos/318/180"
            top
            width="100%"
          /> */}
          <CardBody>
            <CardTitle tag="h5">{item.name}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Year: {item.ageLimit}
            </CardSubtitle>
            <CardText>Pantom Value: {item.detail.country}</CardText>
          </CardBody>
        </Card>
      ))}
    </CardGroup>
    <div className="d-flex justify-content-center mt-5">
      <Pagination>
        <PaginationItem>
          <PaginationLink onClick={() => handlePagePrev(curPage)} previous />
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
  )
}

export default Index