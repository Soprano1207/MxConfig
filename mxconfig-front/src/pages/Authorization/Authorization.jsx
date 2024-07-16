import React from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

import { Typography, Input, Button, Alert } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import ErrorTypography from "../../components/ErrorTypography";
import { UserContext } from "../../context/UserContext";

export default function Authorization({ }) {
  const UserStore = React.useContext(UserContext);

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const [isSigin, setIsSignin] = React.useState(true);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [error, setError] = React.useState(null)

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const onSubmit = async (data) => {
    try {
      if (isSigin) {
        await UserStore.signIn(data);
        return;
      }

      await UserStore.signUp(data)

    } catch (error) {
      setError(error.message)
    } finally {
      console.log(UserStore.user);
    }
  }
  console.log("User", UserStore.user);
  // console.log("Ошибки", errors);

  React.useEffect(() => {
    if (UserStore.user?.token) {
      console.log("redirect...");
      navigate('/');
    }
  }, [UserStore.user]);



  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        {isSigin ?
          <>
            <Typography variant="h3" color="blue-gray" className="mb-2">
              Авторизация
            </Typography>
            <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
              Введите email и пароль для входа
            </Typography>

            <form action="#" className="mx-auto max-w-[24rem] text-left" onSubmit={handleSubmit(onSubmit)}>
              {error &&
                <Alert color="red" className=" mb-6">{error}.</Alert>
              }
              <div className="mb-6">
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Email
                  </Typography>
                </label>
                <Input
                  id="email"
                  color="gray"
                  size="lg"
                  type="email"
                  name="email"
                  placeholder="name@mail.com"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                  {...register("email", { required: true, minLength: 5 })}
                />
                {errors?.email &&
                  <ErrorTypography type={errors?.email.type}></ErrorTypography>}
              </div>
              <div className="mb-6">
                <label htmlFor="password">
                  <Typography variant="small" className="mb-2 block font-medium text-gray-900">Пароль</Typography>
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
              <Button color="gray" size="lg" className="mt-6" fullWidth type="submit">войти</Button>
              <div className="!mt-4 flex justify-end">
                <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  variant="small"
                  className="font-medium"
                >
                  Восстановить пароль
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="!mt-4 text-center font-normal"
              >
                Еще не зарегистрированы?{" "}<a href="#" className="font-medium text-gray-900 underline" onClick={() => setIsSignin(false)}>Создать аккаунт</a>
              </Typography>
            </form>
          </>


          :


          <>
            <Typography variant="h3" color="blue-gray" className="mb-2">
              Регистрация
            </Typography>
            <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
              Заполните все необходимые поля
            </Typography>

            <form action="#" className="mx-auto max-w-[24rem] text-left" onSubmit={handleSubmit(onSubmit)}>
              {error &&
                <Alert color="red" className=" mb-6">{error}.</Alert>
              }
              {/* <div className="mb-6">
                <label htmlFor="lastname">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Фамилия
                  </Typography>
                </label>
                <Input
                  size="lg"
                  placeholder="Иванов"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  type={"text"}
                  {...register("lastname", { required: true, minLength: 2 })}
                />
                {errors?.lastname &&
                  <ErrorTypography type={errors?.lastname.type}></ErrorTypography>}
              </div>
              <div className="mb-6">
                <label htmlFor="firstname">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Имя
                  </Typography>
                </label>
                <Input
                  size="lg"
                  placeholder="Иван"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  type={"text"}
                  {...register("firstname", { required: true, minLength: 2 })}
                />
                {errors?.firstname &&
                  <ErrorTypography type={errors?.firstname.type}></ErrorTypography>}
              </div> */}
              <div className="mb-6">
                <label htmlFor="login">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Логин
                  </Typography>
                </label>
                <Input
                  size="lg"
                  placeholder="Ivan"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  type={"text"}
                  {...register("login", { required: true, minLength: 4 })}
                />
                {errors?.login &&
                  <ErrorTypography type={errors?.login.type}></ErrorTypography>}
              </div>
              <div className="mb-6">
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Email
                  </Typography>
                </label>
                <Input
                  id="email"
                  color="gray"
                  size="lg"
                  type="email"
                  name="email"
                  placeholder="name@mail.com"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                  {...register("email", { required: true, minLength: 5 })}
                />
                {errors?.email &&
                  <ErrorTypography type={errors?.email.type}></ErrorTypography>}
              </div>
              <div className="mb-6">
                <label htmlFor="password">
                  <Typography variant="small" className="mb-2 block font-medium text-gray-900">Пароль</Typography>
                </label>
                <Input
                  size="lg"
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
                <label htmlFor="password">
                  <Typography variant="small" className="mb-2 block font-medium text-gray-900">Подтвердите пароль</Typography>
                </label>
                <Input
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  type="password"
                  {...register("confirmpassword", { required: true, minLength: 8 })}
                />
                {errors?.confirmpassword &&
                  <ErrorTypography type={errors?.confirmpassword.type}></ErrorTypography>}
              </div>
              <Button color="gray" size="lg" className="mt-6" fullWidth type="submit">Регистрация</Button>
              <Typography
                variant="small"
                color="gray"
                className="!mt-4 text-center font-normal"
              >
                У вас уже есть аккаунт?{" "}<a href="#" className="font-medium text-gray-900" onClick={() => setIsSignin(true)}>Войти</a>
              </Typography>
            </form>
          </>
        }
      </div>
    </section>
  );
}