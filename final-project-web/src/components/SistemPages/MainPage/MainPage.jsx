import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import {
  getEquipmentsByBrand,
  countEquipments,
} from "../../../services/equipment-service";
import {
  countReservations,
  countReservationsByPeriod,
} from "../../../services/reservation-service";
import { getUserById } from "../../../services/user-service";
import { LeftMenu } from "../LeftMenu/LeftMenu";
import { Chart } from "react-google-charts";
import Logo from "../../../images/logo.png";
import "./styles.css";

export default function MainPage() {
  const [equipments, setEquipments] = useState();
  const [reservationPeriod, setReservationPeriod] = useState();
  const [reservations, setReservations] = useState();
  const [equipmentsByBrand, setEquipmentsByBrand] = useState([]);
  const [user, setUser] = useState("");

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const user = jwt_decode(token);
      const result = await getUserById(user.id);
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getEquipments = async () => {
    try {
      const result = await countEquipments();
      setEquipments(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReservations = async () => {
    try {
      const result = await countReservations();
      setReservations(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEquipmentsBranded = async () => {
    try {
      const result = await getEquipmentsByBrand();
      const chartData = result.data;
      const header = [["Marca", "Quantidade de Equipamentos"]];

      setEquipmentsByBrand([
        ...header,
        ...chartData.map((chartData, index) => {
          return [chartData.marca, parseInt(chartData.quantidade)];
        }),
      ]);

    } catch (error) {
      console.log(error);
    }
  };

  const getReservationByPeriod = async () => {
    try {
      const result = await countReservationsByPeriod();
      const chartData = result.data;
      const header = [["Mês", new Date().getFullYear().toString()]];

      const months = [
        "",
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];

      setReservationPeriod([
        ...header,
        ...chartData.map((chartData, index) => {
          return [months[chartData.mes], parseInt(chartData.count)];
        }),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEquipmentsBranded();
    getEquipments();
    getReservations();
    getReservationByPeriod();
    getUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="full-page">
      <div className="top-bar">
        <div className="logo-component">
          <img className="logo-image-main" src={Logo} alt="Logo do sistema" />
          <div className="logo-text-component">
            <h1>SIGED MT</h1>
          </div>
        </div>
      </div>
      <div className="main-page">
        <LeftMenu className="left-menu" />
        <div className="dashboard-page">
          <div className="dashboard-area">
            <div className="main-page-title">
              <h1 className="main-page-welcome-text">
                {`Olá, ${user.nome_completo
                  ?.split(" ")
                  .shift()}. Dê uma olhada em nosso dashboard.`}
              </h1>
            </div>
            <div className="card-charts-container">
              <div className="card-chart-content-equipments">
                <h1>Equipamentos cadastrados:</h1>
                <p>{equipments}</p>
              </div>
              <div className="card-chart-content-reservations">
                <h1>Quantidade de reservas:</h1>
                <p>{reservations}</p>
              </div>
            </div>
            <div className="down-charts-container">
              <div className="donut-chart-container">
                <h1>Top 5 marcas mais presentes: </h1>
                <Chart
                  chartType={"PieChart"}
                  data={equipmentsByBrand}
                  options={{
                    legend: "none",
                    pieHole: 0.4,
                    backgroundColor: "transparent",
                    colors: ["#1D3557", "#E63946", "#457B9D", "#A8DADC"],
                  }}
                  style={{ display: "flex", width: "100%", height: "100%" }}
                />
              </div>
              <div className="bar-chart-container">
                <h1>Reservas por mês: </h1>
                <Chart
                  chartType={"Bar"}
                  data={reservationPeriod}
                  options={{
                    title: "Quantidade de reservas por mês",
                    legend: "none",
                    backgroundColor: "transparent",
                    colors: ["#1D3557", "#E63946"],
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
