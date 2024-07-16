import React from "react";

import ChangePasswordDialog from "../../layouts/ChangePasswordDialog";
import ProfileCard from "../../layouts/ProfileCard";
import ProfileInformation from "../../layouts/ProfileInformation";
import LoadFiles from "../../layouts/LoadFiles";
import Mybuilds from "../Mybuilds/Mybuilds";
import { UserContext } from "../../context/UserContext";

export default function Profile() {
  const UserStore = React.useContext(UserContext);
  const [showDialogChangePassword, setShowDialogChangePassword] = React.useState(false);
  const [showDialogLoadFiles, setShowDialogLoadFiles] = React.useState(false);
  const [profileData, setProfileData] = React.useState(UserStore.user);

  const handleOpenDialogChangePassword = React.useCallback(() => {
    setShowDialogChangePassword(prevState => !prevState);
  }, []);

  const handleOpenDialogLoadFiles = React.useCallback(() => {
    setShowDialogLoadFiles(prevState => !prevState);
  }, []);

  const getImagePreview = (path) => {
    return <img className=" aspect-square object-cover max-w-md w-max mt-6 mx-auto rounded-xl" src={path ?? profileData?.img} alt="profile-picture" />
  }

  return (
    <div className="py-20 container mx-auto">
      <ChangePasswordDialog open={showDialogChangePassword} handleOpen={setShowDialogChangePassword} />
      <LoadFiles open={showDialogLoadFiles} previewContent={getImagePreview} handleOpen={setShowDialogLoadFiles} />

      <section className=" flex gap-8 justify-center flex-wrap">
        <ProfileCard profileData={profileData} setProfileData={setProfileData} handleOpenDialog={handleOpenDialogLoadFiles} />
        <ProfileInformation profileData={profileData} setProfileData={setProfileData} handleOpenDialog={handleOpenDialogChangePassword} />
      </section>

      <section className="py-20">
        <Mybuilds />
      </section>
    </div>
  );
}