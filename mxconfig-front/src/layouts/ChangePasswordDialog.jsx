import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, Button, Typography, Input  } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import ErrorTypography from "../components/ErrorTypography";


export default function ChangePasswordDialog({ open = false, handleOpen = () => { } }) {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const { register, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = (data) => {
    try {
      
    } catch (error) {

    } finally {
      console.log(data);
    }
  }

  return (
    <Dialog open={open} size="sm" handler={handleOpen}>
      <form className="flex flex-col items-center justify-between" onSubmit={handleSubmit(onSubmit)}>
        <input value="changePassword" className="hidden" {...register("action", { required: true })}></input>

        <DialogHeader className="w-full flex items-start justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Изменение пароля
            </Typography>
            <Typography color="gray" variant="paragraph">
              Заполните все поля для изменения пароля.
            </Typography>
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={() => handleOpen()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>

        <DialogBody className="w-full">
          <div className="mb-6">
            <label htmlFor="password">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">Текущий пароль</Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                </i>
              }
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors?.password &&
              <ErrorTypography type={errors?.password.type}></ErrorTypography>}
          </div>
          <div className="mb-6">
            <label htmlFor="newpassword">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">Новый пароль</Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                </i>
              }
              {...register("newpassword", { required: true, minLength: 8 })}
            />
            {errors?.newpassword &&
              <ErrorTypography type={errors?.newpassword.type}></ErrorTypography>}
          </div>
          <div >
            <label htmlFor="confirmpassword">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">Подтверждение пароля</Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                </i>
              }
              {...register("confirmpassword", { required: true, minLength: 8 })}
            />
            {errors?.confirmpassword &&
              <ErrorTypography type={errors?.confirmpassword.type}></ErrorTypography>}
          </div>
        </DialogBody>

        <DialogFooter className="w-full space-x-2">
          <Button variant="text" color="gray" onClick={() => handleOpen()}>
            Отмена
          </Button>
          <Button variant="gradient" color="gray" type="submit">
            ОТправить
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
