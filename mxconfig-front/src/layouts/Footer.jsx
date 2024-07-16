import { Typography, IconButton, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const currentYear = new Date().getFullYear();

function Footer({mainNav}) {
  return (
    <footer className="px-8 py-28 bg-gray-900">
      <div className="container mx-auto  border-b border-white/50">
        <div className="mx-auto flex flex-col !w-full max-w-6xl !items-center justify-center rounded-2xl bg-gray-900 px-5 md:mb-16 mb-5">
          <Typography
            className="text-center text-2xl font-bold md:text-3xl "
            color="white"
          >
            Мы всегда с вами!
          </Typography>
          <Typography
            color="white"
            className="mt-8 max-w-xl text-center !text-base"
          >
            Если у вас возникли какие-либо вопросы по работе с сервисом, напишите нам и мы вам ответим.
          </Typography>
          <div className="mt-6 flex w-full flex-col gap-3 md:w-fit md:flex-row">
            <Button color="white" size="md" className="flex-shrink-0">
              Задать вопрос
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center md:mt-16 mt-5">
        <div className="flex flex-wrap items-center justify-center gap-8 pb-8">
          {mainNav.map(({label, link}) => (
            <ul key={label}>
              <li>
                <Link to={link}>
                </Link>
                <Typography
                  as="a"
                  href="#"
                  color="white"
                  className="font-medium !text-gray-500 transition-colors hover:!text-gray-900"
                >
                  {label}
                </Typography>
              </li>
            </ul>
          ))}
        </div>
        <div className="flex gap-2">
          <a href="#buttons-with-link">
            <IconButton variant="text" size="sm">
              <i className="fa-brands fa-twitter text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
            </IconButton>
          </a>
          <a href="#buttons-with-link">
            <IconButton variant="text" size="sm">
              <i className="fa-brands fa-youtube text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
            </IconButton>
          </a>
          <a href="#buttons-with-link">
            <IconButton variant="text" size="sm">
              <i className="fa-brands fa-instagram text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
            </IconButton>
          </a>
          <a href="#buttons-with-link">
            <IconButton variant="text" size="sm">
              <i className="fa-brands fa-github text-lg text-gray-500 transition-colors hover:text-blue-gray-900" />
            </IconButton>
          </a>
        </div>
        <Typography
          color="blue-gray"
          className="mt-8 !text-sm !font-normal text-gray-500"
        >
          Copyright &copy; {currentYear} Material Tailwind
        </Typography>
      </div>
    </footer>
  );
}
export default Footer;