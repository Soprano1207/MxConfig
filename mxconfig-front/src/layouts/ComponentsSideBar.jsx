import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
  Button
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";
import { t } from "../Global"
import { useNavigate } from "react-router-dom";
import { qsString } from '../Global';
import ConfiguratorStore from "../store/configurator-store";

const filterMain = [
  {
    name: "brand",
    multiselect: true,
    items: [
      "INTEL",
      "AMD"
    ]
  },
  // {
  //   name: "sort",
  //   items: [
  //     "По ролевантности",
  //     "По возрастанию",
  //     "По Убыванию"
  //   ]
  // },
];


let componentsFilter = [...filterMain];


export default function ComponentsSideBar({ componentStore, filterSecondary, componentType }) {
  if (filterSecondary) {
    componentsFilter = [...filterMain, ...filterSecondary];
  }

  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({});
  const filterRef = React.useRef(null);
  

  const handleSelectFilter = (event, field) => {
    const value = String(event.target.value);

    if (Array.isArray(field.value)) {
      event.target.checked
        ? field.onChange([...field.value, value])
        : field.onChange(field.value.filter(val => val !== value));
      return;
    }

    field.value === value
      ? field.onChange("")
      : field.onChange(value);
  }

  const onSubmit = (data) => {
    const queryString = qsString(data);
    componentStore.fetchComponentsAction(componentType, data);
    
    navigate(`?` + queryString);
  }

  return (
    <aside>
      <Card shadow={false} className="w-full max-w-[250px] p-4 border border-gray-300">
        <div className="mb-2 px-4 pt-4">
          <Typography variant="h5">{t(componentType, "pageTitle")}</Typography>
          <Typography className="opacity-90" variant="paragraph">Фильтры</Typography>
        </div>
        <form ref={filterRef} action="#" onSubmit={handleSubmit(onSubmit)}>
          <List className="min-w-full">
            {componentsFilter && componentsFilter.map((item, index) =>
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={item?.multiselect ? [] : ""}
                render={({ field }) => (
                  <Accordion open icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform cursor-default`}
                    />
                  }>
                    <ListItem className="p-0 hover:bg-inherit active:bg-inherit cursor-default" ripple={false}>
                      <AccordionHeader className="border-b-0 p-3">
                        <Typography className="mr-auto font-medium cursor-default">
                          {t(componentType, item.name)}
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className={`py-1`}>
                      <List className={`p-0 max-h-48 ${item?.items?.length > 4 && "overflow-y-auto"}`}>
                        {item?.items && item.items.map((name, indexItems) =>
                          <ListItem key={indexItems} className="p-0 hover:bg-inherit focus:bg-inherit active:bg-inherit" ripple={false}>
                            <label
                              htmlFor={`vertical-list-${index}-${indexItems}`}
                              className="flex w-full cursor-pointer items-center px-3 py-2"
                            >
                              <ListItemPrefix className="mr-3">
                                <Checkbox
                                  value={String(name)} // Преобразуем значение к строке
                                  checked={item?.multiselect ? field.value.includes(String(name)) : field.value === String(name)}
                                  id={`vertical-list-${index}-${indexItems}`}
                                  ripple={false}
                                  className="hover:before:opacity-0"
                                  containerProps={{
                                    className: "p-0",
                                  }}
                                  onChange={(event) => handleSelectFilter(event, field)}
                                />
                              </ListItemPrefix>
                              <Typography variant="paragraph">
                                {name}
                              </Typography>
                            </label>
                          </ListItem>
                        )}
                      </List>
                    </AccordionBody>
                  </Accordion>
                )}
              />
            )}
          </List>
          <Button size="sm" variant="outlined" color="gray" type="submit" className='block mx-auto content-fit m-auto'>
            Применить
          </Button>
        </form>
      </Card>
    </aside>
  );

}