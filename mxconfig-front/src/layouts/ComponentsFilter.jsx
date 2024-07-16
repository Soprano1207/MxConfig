import React from 'react'
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Select,
  IconButton,
  Option,
  Input
} from "@material-tailwind/react";
import MultiSelect from "../components/MultiSelect";

export default function ComponentsFilter({filterMain, filterSecondary}) {
  return (
    <div className="mx-auto container flex flex-col justify-center px-2 ">
      <Card shadow={false} className="border border-gray-300 mb-10">
        <CardHeader
          shadow={false}
          floated={false}
          className="flex items-center justify-between"
        >
          <Typography color="blue-gray" variant="h5" className="font-bold">
            Фильтр
          </Typography>
          <IconButton variant="text">
            <ArrowPathIcon
              className="w-5 h-5 text-gray-900"
              strokeWidth={2}
            />
          </IconButton>
        </CardHeader>
        <CardBody className=" flex flex-col gap-8">
          <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4">
            {filterMain && filterMain.map(el =>
              el.multiselect
                ? <MultiSelect name={el.name} items={el.items} />
                : <Select key={el.name} label={el.name} menuProps={{ className: "p-0" }}>
                  {el.items.map(item => <Option key={item}>{item}</Option>)}
                </Select>
            )}

            <Input variant="standard" label="Цена от" />
            <Input variant="standard" label="до" />
          </div>
          <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4">
            {filterSecondary && filterSecondary.map(el =>
              el.multiselect
                ? <MultiSelect name={el.name} items={el.items} />
                : <Select key={el.name} label={el.name} menuProps={{ className: "p-0" }}>
                  {el.items.map(item => <Option key={item}>{item}</Option>)}
                </Select>
            )}
          </div>

        </CardBody>
        <CardFooter className="pt-0 pl-3 flex gap-6 flex-wrap">

        </CardFooter>
      </Card>
    </div>
  )
}
