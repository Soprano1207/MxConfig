import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  DialogFooter,
} from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";

function ImageCard({ img, name, size }) {
  return (
    <div className="border p-3 rounded-lg w-full">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={img}
            alt="dark"
            className="w-[70px] h-[50px] rounded-lg"
          />
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="!font-bold mb-1"
            >
              {name}
            </Typography>
            <Typography
              variant="small"
              className="!font-normal text-gray-600"
            >
              {size} MB
            </Typography>
          </div>
        </div>
        <IconButton size="sm" variant="text">
          <TrashIcon className="w-5 h-5 text-gray-500" />
        </IconButton>
      </div>
    </div>
  );
}

export default function LoadFiles({ open = false, multiple = true, previewContent = null, handleOpen = () => { }, }) {

  // const [src, setSrc] = React.useState(null);
  const [dataFiles, setDataFiles] = React.useState([]);

  const openFilePicker = (event) => {
    if (event.target.files?.length > 0) {
      const files = Array.from(event.target.files); // Преобразуем FileList в массив
      const pickerFilesPromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const fileData = { name: "", size: "", path: "" };
          const reader = new FileReader();

          reader.readAsDataURL(file);
          reader.onloadend = function (ev) {
            const base64data = ev.target.result;
            fileData.name = file.name;
            fileData.size = (file.size / 1024 / 1024).toFixed(2); // Размер в мегабайтах
            fileData.path = base64data;
            resolve(fileData);
          };
          reader.onerror = function (error) {
            reject(error);
          };
        });
      });

      Promise.all(pickerFilesPromises).then(pickerFiles => {
        setDataFiles(pickerFiles);
      }).catch(error => {
        console.error("Error reading files:", error);
      });

      event.target.value = null;
    }
  };

  return (
    <Dialog className="p-4" open={open} handler={handleOpen}>
      <DialogHeader className="justify-between pb-0">
        <Typography color="blue-gray" className="mb-1 font-bold">
          Загрузка файлов
        </Typography>
        <IconButton
          color="gray"
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
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody className="overflow-y-scroll pt-0">
        <Typography
          variant="small"
          className="font-normal text-gray-600"
        >
          Легко загружайте файлы всего за несколько кликов.
        </Typography>
        {previewContent && previewContent(dataFiles[0]?.path)}
        <label
          htmlFor="upload"
          className="grid place-items-center py-10 rounded-lg border border-dashed border-gray-300 mt-6"
        >
          <input type="file" id="upload" className="hidden" onChange={openFilePicker} multiple />
          <IconButton variant="text" className="mb-4">
            <ArrowUpTrayIcon
              className="h-8 w-8 text-gray-900"
              strokeWidth={2}
            />
          </IconButton>
          <Typography color="blue-gray" className="mb-1 font-bold">
            Drag and Drop или{" "}
            {/* <a className=" underline"> */}
            <span href="#" id="upload" className=" underline cursor-pointer">Выберите файл</span>
            {/* <input type="file" id="upload" className="hidden" onChange={openFilePicker} multiple/> */}
            {/* </a> */}
          </Typography>
          <Typography
            variant="small"
            className="font-normal text-gray-600"
          >
            Поддерживаемые форматы: .png, .jpg, .heic
          </Typography>
        </label>
        <div className="!mt-4 flex flex-col md:flex-row justify-between gap-4">
          {dataFiles.map(({ path, name, size }) => (
            <ImageCard key={name} img={path} name={name} size={size} />
          ))}
        </div>
      </DialogBody>
      <DialogFooter className="gap-2">
        <Button onClick={() => handleOpen()} variant="outlined">
          Отмена
        </Button>
        <Button>Отправить</Button>
      </DialogFooter>
    </Dialog>
  );
}