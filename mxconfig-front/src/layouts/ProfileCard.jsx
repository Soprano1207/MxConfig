import React from 'react'

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

import {
  ArrowDownTrayIcon
} from "@heroicons/react/24/solid";

export default React.memo(function ProfileCard({ profileData, setProfileData, handleOpenDialog }) {

  return (
    <Card className=' max-w-md'>
      <CardHeader floated={false}>
        {/* <img className=" aspect-square object-cover max-w-md" src="/img/20240521_225819.jpg" alt="profile-picture" /> */}
        <img className=" aspect-square object-cover max-w-md w-max" src="public/img/image-not-found.png" alt="profile-picture" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton variant="gradient" className="!absolute top-4 right-4" onClick={handleOpenDialog}>
          <ArrowDownTrayIcon className="h-5 w-5" />
        </IconButton>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" >
          {profileData?.firstName} {profileData?.lastName}
        </Typography>
        <Typography color="blue-gray" className="font-normal" textGradient>
          @{profileData?.login}
        </Typography>
        <Typography color="blue-gray" className="font-medium mt-2" textGradient>
          {profileData?.officepost}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  )
})
