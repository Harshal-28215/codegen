import React from 'react'
import LoginPopUp from '../LoginPopUp';
import { AvatarDemo } from './Avtar';
import { useUser } from '@/Utils/Hooks/User';

function Signin() {
  const [open, setOpen] = React.useState(false);
  const closedialog = (value:boolean) => setOpen(value);

  const {user} = useUser()

  return (
    <div>
      {
        user ?
        <AvatarDemo image={user.image}/>
        :
        <LoginPopUp opendialog={open} closedialog={closedialog}/>
      }
    </div>
  )
}

export default Signin
