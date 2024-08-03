import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums, loadAlbumsRequest } from "../../../redux/albumsRedux";
import { Col, Row } from 'react-bootstrap';
import AlbumSummary from "../AlbumSummary/AlbumSummary";

const Albums = () => {
  const dispatch = useDispatch();
  const albums = useSelector(getAlbums);

  useEffect(() => {
    dispatch(loadAlbumsRequest());
  }, [dispatch]);
  
  return(
    <Row>
      {albums.map(album => (
        <Col key={album.id} lg={4} md={6} xs={12} className="mb-4">
          <AlbumSummary album={album} />
        </Col>
      ))}
    </Row>
  );
};

export default Albums;