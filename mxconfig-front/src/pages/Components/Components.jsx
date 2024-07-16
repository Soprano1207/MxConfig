
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import ComponentsListCard from "../../layouts/ComponentsListCard";
import ComponentsSideBar from "../../layouts/ComponentsSideBar";
import componentStore from "../../store/component-store";
import React from "react";
import Loading from "../../components/Loading";
import configuratorStore from "../../store/configurator-store";



export function Components() {
  const { componentType } = useParams();
  
  // const getComponents

  React.useEffect(() => {
    console.log(componentType);
    const {pathname} = window.location;
  
    componentStore.fetchFilterComponentAction(componentType);

    if (pathname.includes("configurator")) {
      componentStore.fetchConfigurationComponentsAction(componentType);
    } else {
      componentStore.fetchComponentsAction(componentType);
    }

      
  }, [componentType]);

  if (!componentStore.components || !componentStore.filterComponents) {
    return <Loading />;
  }

  const renderFilter = () => {
    return componentStore.filterComponents.case({
      pending: () => <Loading />,
      rejected: (error) => <div>Ошибка: {error.message}</div>,
      fulfilled: ({ data }) => {
        return (
          <ComponentsSideBar componentStore={componentStore} filterSecondary={data} componentType={componentType}/>
        )
      },
    });
  }

  const renderContent = () => {
    return componentStore.components.case({
      pending: () => <Loading />,
      rejected: (error) => <div>Ошибка: {error.message}</div>,
      fulfilled: ({ data }) => {
        return (
          <ComponentsListCard components={data} />
        )
      },
    });
  }

  return (
    <div className="flex py-10">
      <div className="px-8 container flex gap-8">
        {renderFilter()}
        {renderContent()}
      </div>
    </div>
  );
}

export default observer(Components);