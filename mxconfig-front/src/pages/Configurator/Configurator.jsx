import { observer } from "mobx-react-lite";
import ComponentsListCard from "../../layouts/ComponentsListCard";
import React, { useEffect } from "react";
import Loading from "../../components/Loading";
import { tt } from "../../data/translate";
import configuratorStore from "../../store/configurator-store";
import { useNavigate } from "react-router-dom";

export function Configurator() {
  const navigate = useNavigate();
  const [loadin, setLoading] = React.useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }

    const fetchData = async () => {
      try {
        await configuratorStore.fetchUserConfigurationAction();

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    if (loadin) {
      return <Loading />;
    }

    const data = [];
    for (const key in tt.components) {
      data.push({ title: key, ...configuratorStore.userConfigurations[key] });
    }
    return <ComponentsListCard components={data} />;
  };

  return (
    <div className="flex py-10">
      <div className="px-8 container flex gap-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default observer(Configurator);
