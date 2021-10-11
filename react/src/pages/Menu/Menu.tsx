import MyMap from "../../components/MyMap";
import Options from "../../components/Options";
import { useState, useEffect } from "react";
import "./Menu.css";
import { User } from "../../classes/user";
import { Post } from "../../classes/post";
import { Location } from "../../classes/location";
import { getAllPostsForUser } from "../../services/posts/posts.axios";
import {
  emitPostAdded,
  socketStart,
} from "../../services/socket-io-client/socket";
import {
  axiosGetPersonalInfo,
  axiosUpdateUser,
} from "../../services/authentication/authentication.axios";
import { refreshAccessToken, refreshToken } from "../../services/tokens";

const Menu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>();
  const [userLocation, setUserLocation] = useState<any>();
  const [minimizedPosts, setMinimizedPosts] = useState<any[]>([]);
  const [selectedMinimizedPosts, setSelectedMinimizedPosts] = useState<any[]>(
    []
  );
  const [radius, setRadius] = useState<number>(0);
  const [dates, setDates] = useState<{ minDate: Date; maxDate: Date }>({
    minDate: new Date(),
    maxDate: new Date(),
  });
  // on first join, load stuff (later describe)
  useEffect(() => {
    const setUsersFunction = async () => {
      const userInfoRes = await axiosGetPersonalInfo();

      if (!userInfoRes) {
        window.location.href = "/";
        return;
      }
      await setUserInfo(userInfoRes);
      if (
        userInfoRes.Firstname === null ||
        userInfoRes.lastname === null ||
        userInfoRes.Age === null ||
        userInfoRes.Address === null ||
        userInfoRes.Place_Of_Work === null
      ) {
        window.location.href = "/userdetails";
      }

      await setUserInfo(userInfoRes);
      const posts = await getAllPostsForUser();

      await setMinimizedPosts(posts);
      //TODO make the logic for 100+
      await setSelectedMinimizedPosts(posts);

      setIsLoading(false);
      //socketStart();
    };

    setUsersFunction();
  }, []);

  useEffect(() => {
    const setPostsToMatchFilters = async () => {
      if (!userLocation) {
        return;
      }
      let inFilteredPosts = [];
      let currentDistance = 0;
      let currentDate;

      inFilteredPosts = minimizedPosts.filter((post) => {
        let isInRadiusRange = false;
        let isInDateRange = false;
        currentDate = new Date(post.CreatedAt);
        currentDistance = distanceKM(
          userLocation.lat,
          post.Lat,
          userLocation.lon,
          post.Lon
        );
        if (Number(radius) && radius > 0) {
          if (currentDistance <= radius) {
            isInRadiusRange = true;
          }
        }
        if (!isInRadiusRange) {
          return false;
        }

        // getting incorect dates so for now all match dates
        isInDateRange =
          dates.minDate.getTime() <= currentDate.getTime() &&
          dates.maxDate.getTime() >= currentDate.getTime();
        isInDateRange = true;

        return isInDateRange;
      });

      await setSelectedMinimizedPosts([...inFilteredPosts]);
    };

    setPostsToMatchFilters();
  }, [radius, dates.minDate, dates.maxDate]);

  function distanceKM(lat1: number, lat2: number, lon1: number, lon2: number) {
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 3956;

    // calculate the result
    return Math.floor(c * r);
  }

  if (isLoading) {
    return <div>"loading....";</div>;
  }
  return (
    <div className="grid-container">
      <div className="grid-item">
        <Options
          setRadius={(radius: number) => {
            setRadius(radius);
          }}
          setDates={setDates}
        ></Options>
      </div>

      <div className="grid-item">
        {/*convert posts from server to usable posts later  */}
        <MyMap
          radius={radius}
          postsFromFather={selectedMinimizedPosts}
          setUserLocation={setUserLocation}
        ></MyMap>
      </div>
    </div>
  );
};

export default Menu;
