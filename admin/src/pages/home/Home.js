import "./home.css";
import FeaturedInfo from "../featuresInfo/FeaturedInfo";

import Chart from "../../components/charts/Chart";
import { userData } from "../../dummydata";
import WidgetSm from "../../components/widgetSm/WidgetSm";

import WidgetLg from "../../components/widgetlg/WidgetLg";
import Topbar from "../../components/navbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("users/stats");
        res.data.map((item) =>
          setUserStats((preVal) => [
            ...preVal,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err) {}
    };
    getStats();
  }, [MONTHS]);
  console.log(userStats);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homewidget">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
