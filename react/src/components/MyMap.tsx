import {
  Circle,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { Post } from "../classes/post";
import { Location } from "../classes/location";
import CustomModal from "../models/CustomModal";
import DisplayPost from "./DisplayPost";

interface Props {
  postsFromFather: Post[];
  radius: any;
  setUserLocation: any;
}

const MyMap = ({ postsFromFather, radius, setUserLocation }: Props) => {
  let userLocation = new Location(32.08088, 34.78057);
  const [posts, setPosts] = useState<any[]>([]); //{loc: number[], imgSrc: string}
  const [location, setLocation] = useState<Location>();
  const [position, setPosition] = useState(null);
  const [centerRadius, setCenterRadius] = useState<any>();

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const fillBlueOptions = { fillColor: "blue" };

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e: any) {
        setCenterRadius(e.lating);
        setPosition(e.latlng);
        setUserLocation({ lat: e.latitude, lon: e.longitude });
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <>
        {radius > 0 ? <Circle center={position} radius={radius * 1000} /> : ""}{" "}
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      </>
    );
  }

  useEffect(() => {
    const getPostsForMap = async () => {
      setPosts(postsFromFather);
    };
    getPostsForMap();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        userLocation = new Location(
          position.coords.longitude,
          position.coords.latitude
        );
        setLocation(userLocation);
      });
    } else {
      console.log("Not Avaliable");
    }
  }, [postsFromFather]);

  const openModal = async (post: any) => {
    await setSelectedPost(post);
    await setIsPostModalOpen(true);
  };

  const closeModal = async () => {
    await setIsPostModalOpen(false);
    await setSelectedPost(null);
  };

  return (
    <div className="leaflet-container">
      {location ? (
        <MapContainer
          center={[userLocation.lat, userLocation.lon]}
          zoom={8}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {posts?.map((post) => (
            <Marker position={[post.Lat, post.Lon]}>
              <Popup autoClose={false} closeOnClick={false}>
                <img
                  src={post.Image_Src}
                  width="50em"
                  height="50em"
                  onClick={() => openModal(post)}
                />
              </Popup>
              <LocationMarker />
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div>Please allow location</div>
      )}
      {isPostModalOpen && (
        <CustomModal
          modalOpen={isPostModalOpen}
          handleClose={() => closeModal()}
          text={
            <DisplayPost post={selectedPost} userId={selectedPost.User_Id} />
          }
        />
      )}
    </div>
  );
};

export default MyMap;
