import { List, ListItem, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Main() {
  return (<>
    <Card className="w-96">
      <List>
        <Link to={"/auth"}><ListItem>Авторизация</ListItem></Link>
        <Link to={"/profile"}><ListItem>Профиль</ListItem></Link>
        <ListItem>Settings</ListItem>
      </List>
    </Card>
  </>);
}