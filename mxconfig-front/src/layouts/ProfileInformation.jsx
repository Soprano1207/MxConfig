import React, { useEffect } from 'react'

import {
  Input,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
  Card,
  CardBody,
  Button,
} from "@material-tailwind/react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form"

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import ErrorTypography from '../components/ErrorTypography';

/**
 * Проверить дату, а то как-то странно записывается
 */

const fieldsToWatch = ["login", "firstName", "lastName", "officepost"];


export default React.memo(function ProfileInformation({ profileData, setProfileData, handleOpenDialog }) {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm({ defaultValues: profileData })
  const [date, setDate] = React.useState();

  const watchedFields = fieldsToWatch.reduce((acc, field) => {
    acc[field] = watch(field);
    return acc;
  }, {});


  useEffect(() => {
    const hasChanged = fieldsToWatch.some(field => profileData[field] !== watchedFields[field]);
    if (hasChanged) {
      setProfileData({ ...profileData, ...watchedFields });
    }
  }, [...fieldsToWatch.map(field => watchedFields[field]), profileData]);



  const onSubmit = (data) => {
    if (date) {
      data.birthday = date;
    }
    console.log(data)
  }

  return (
    <Card className='md:col-span-4 lg:col-span-8'>
      <CardBody>
        <form action='#' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" color="blue-gray">
            Информация профиля
          </Typography>
          <Typography
            variant="small"
            className="text-gray-600 font-normal mt-1"
          >
            Ниже вы можете обновить информацию профиля.
          </Typography>
          <div className="flex flex-col mt-8">
            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Логин
                </Typography>
                <Input
                  size="lg"
                  placeholder="PolinaIlinichna"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  value={profileData?.login ?? ""}
                  {...register("login")}
                />
                <Typography
                  variant="small"
                  color="gray"
                  className="!mt-2 font-normal cursor-pointer underline w-fit"
                  onClick={handleOpenDialog}
                >
                  Изменить пароль
                </Typography>
              </div>
            </div>

            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Имя
                </Typography>
                <Input
                  size="lg"
                  placeholder="Полина"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  {...register("firstName", { required: true, minLength: 5 })}
                />
                {errors?.firstName &&
                  <ErrorTypography type={errors?.firstName.type}></ErrorTypography>
                }
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Фамилия
                </Typography>
                <Input
                  size="lg"
                  placeholder="Ильинична"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  {...register("lastName", { required: true, minLength: 5 })}
                />
                {errors?.lastName &&
                  <ErrorTypography type={errors?.lastName.type}></ErrorTypography>
                }
              </div>
            </div>
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Дата рождения
                </Typography>
                <Popover placement="bottom">
                  <PopoverHandler>
                    <Input
                      size="lg"
                      onChange={() => null}
                      placeholder="Выберите дату"
                      value={date ? format(date, "PPP") : ""}
                      labelProps={{
                        className: "hidden",
                      }}
                      className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                      {...register("birthday")}
                    />
                  </PopoverHandler>
                  <PopoverContent>
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      showOutsideDays
                      className="border-0"
                      classNames={{
                        caption:
                          "flex justify-center py-2 mb-4 relative items-center",
                        caption_label: "text-sm !font-medium text-gray-900",
                        nav: "flex items-center",
                        nav_button:
                          "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                        nav_button_previous: "absolute left-1.5",
                        nav_button_next: "absolute right-1.5",
                        table: "w-full border-collapse",
                        head_row: "flex !font-medium text-gray-900",
                        head_cell: "m-0.5 w-9 !font-normal text-sm",
                        row: "flex w-full mt-2",
                        cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 !font-normal",
                        day_range_end: "day-range-end",
                        day_selected:
                          "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                        day_today: "rounded-md bg-gray-200 text-gray-900",
                        day_outside:
                          "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                        day_disabled: "text-gray-500 opacity-50",
                        day_hidden: "invisible",
                      }}
                      components={{
                        IconLeft: ({ ...props }) => (
                          <ChevronLeftIcon
                            {...props}
                            className="h-4 w-4 stroke-2"
                          />
                        ),
                        IconRight: ({ ...props }) => (
                          <ChevronRightIcon
                            {...props}
                            className="h-4 w-4 stroke-2"
                          />
                        ),
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="poly@mail.com"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  {...register("email", { required: true, minLength: 5 })}
                />
                {errors?.email &&
                  <ErrorTypography type={errors?.email.type}></ErrorTypography>
                }
              </div>
            </div>
            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Телефон
                </Typography>
                <Input
                  size="lg"
                  placeholder="+7 123 456 78 99"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  {...register("phone")}
                />
              </div>
            </div>
            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Должность
                </Typography>
                <Input
                  size="lg"
                  placeholder="Business-woman"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  {...register("officepost")}
                />
              </div>
            </div>
            <div className="flex flex-col items-end gap-4 md:flex-row mb-6">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Язык
                </Typography>
                <Input
                  size="lg"
                  placeholder="Русский"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  {...register("language")}
                />
              </div>
            </div>
            <Button variant="gradient" color="gray" type="submit" className=' content-fit m-auto' onClick={onSubmit}>
              Сохранить
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
})