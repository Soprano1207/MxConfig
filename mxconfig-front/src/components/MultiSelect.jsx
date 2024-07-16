import React from 'react'
import { Select, Typography, Checkbox, List, ListItem, ListItemPrefix, } from '@material-tailwind/react'

export default function MultiSelect({ name, items }) {

  return (
    <Select
      key={name}
      label={name}
      animate={{ mount: { y: 0 }, unmount: { y: 25 }, }}
      containerProps={{
        className: "",
      }}
      menuProps={{
        className: " p-0",
      }}
      children={
        <List className="p-0 gap-0 ">
          {items.map((item, index) =>
            <ListItem key={item} className="p-0">
              <label
                htmlFor={`vertical-list-${index}`}
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id={`vertical-list-${index}`}
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  {item}
                </Typography>
              </label>
            </ListItem>
          )}
        </List>
      }
    />
  )
}
