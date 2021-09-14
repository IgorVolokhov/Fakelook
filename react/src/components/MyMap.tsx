import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { Post } from "../classes/post";

// lat long
// const locations1: any[] = [
//   [32.08088, 34.78057],
//   [31.66926, 34.57149],
//   [32.276683, 34.911891],
//   [32.321457, 34.853195],
// ];

// const imageUrl =
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/1024px-Sydney_Opera_House_-_Dec_2008.jpg";

interface Props {
  postsFromFather: Post[];
}

const MyMap = ({ postsFromFather }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]); //{loc: number[], imgSrc: string}

  // useEffect(() => {
  //   const getPostsForMap = async () => {
  //     const postsForMapFromServer = await axiosGetPostsForMap(
  //       "not implemented"
  //     );
  //     setPosts(postsForMapFromServer);
  //   };
  //   getPostsForMap();
  // }, []);

  useEffect(() => {
    const getPostsForMap = async () => {
      setPosts(postsFromFather);
      console.log("posts from father:");

      console.log(postsFromFather);
    };
    getPostsForMap();
  }, [postsFromFather]);

  return (
    <div className="leaflet-container">
      <MapContainer
        center={[32.08088, 34.78057]}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posts.map((post) => (
          <Marker position={[post._location.lat, post._location.lon]}>
            <Popup autoClose={false} closeOnClick={false}>
              <img src={post._imageSrc} width="50em" height="50em" />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;
