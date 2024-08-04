import React from 'react'
import { Card, CardBody, Typography, IconButton, CardFooter, Button } from "@material-tailwind/react";
import { Pagination } from '../components/Pagination';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { tt } from '../data/translate';
import ConfiguratorStore from '../store/configurator-store';
import { useNavigate } from 'react-router-dom';


export default function ComponentsListCard({ components }) {
  const { componentType } = useParams();


  return (
    <section className="mx-auto">
      <div className=' sticky top-28'>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {components?.map(({ _id, img, name, brand, desc, price, title }, index) => (
            <ComponentCard
              key={index}
              _id={_id}
              img={img}
              title={title}
              name={name}
              brand={brand}
              price={price}
              desc={desc}
              componentType={componentType}
            />
          ))}
        </div>
        <Pagination />
      </div>

    </section>
  );
}


export function ComponentCard({ _id, img, title, brand, name, desc, price, componentType }) {
  const navigate = useNavigate();

  const addToConfiguration = async (event) => {
    const { component, id } = event.currentTarget.dataset;

    const result = await ConfiguratorStore.addToConfiguration(component, id);
    if (result === 1) {
      navigate("/configurator");
    }
  }

  const removeConfiguration = async (event) => {
    const { component, id } = event.currentTarget.dataset;

    const result = await ConfiguratorStore.removeFromConfiguration(component, id);
    if (result === 1) {
      window.location.reload()
    }
  }

  const handleActionComponent = async (event) => {
    componentType
      ? addToConfiguration(event)
      : removeConfiguration(event);
  }


  return (
    <Card shadow={false} className="border border-gray-300 justify-between">
      <CardBody className='pb-0'>
        <div className=' h-52'>
          <img src={img ? "http://localhost:8080/images/" + img : "/public/img/image-not-found.png"} alt={img} className="h-full m-auto object-contain" />
        </div>
        {title &&
          <Typography className="my-2 text-center" color="blue-gray" variant="h6">
            {tt.components[title]}
          </Typography>
        }
        {brand &&
          <Typography className="mb-2 mt-5 text-sm !text-gray-500">
            {brand}
          </Typography>
        }
        {name &&
          <Typography className="mb-2" color="blue-gray" variant="paragraph">
            {name}
          </Typography>
        }

        {/* {desc &&
          <Typography className="mb-5 text-sm font-normal leading-[27px] !text-gray-500">
            {desc}
          </Typography>
        } */}
      </CardBody>
      <CardFooter className="flex items-center gap-3 justify-between pt-0">
        {price &&
          <>
            <Typography variant="h5" color="blue-gray">
              {price?.[0]}{price?.[1] ? " - " + price?.[1] : ""}{"₽"}
            </Typography>
          </>
        }
        {_id
          ? <IconButton onClick={handleActionComponent} data-id={_id} data-component={componentType ?? title} className="rounded-md"><i className="fas fa-plus" />{componentType ? "+" : "-"}</IconButton>
          : <Link to={title} className='w-full text-center'><Button className=''>Добавить</Button></Link>
        }
      </CardFooter>
    </Card>
  );
}