import React from 'react'
import LoginPopUp from './LoginPopUp';
import { AvatarDemo } from './Avtar';
import { useUser } from '@/Utils/Hooks/User';
import { useMyContext } from '@/context/CodeAgeContext';
import { Loader2Icon } from 'lucide-react';

function Signin() {
  const { open, setOpen, loginLoading } = useMyContext();
  const closedialog = (value: boolean) => setOpen(value);

  const { user } = useUser()

  return (
    <div>
      {loginLoading ?
        <div className="h-10 w-[77px] px-4 py-2 text-white flex items-center justify-center"><Loader2Icon className='animate-spin'/></div>
        :
        user ?
          <AvatarDemo image={user.image} />
          :
          <LoginPopUp opendialog={open} closedialog={closedialog} />
      }
    </div>
  )
}

export default Signin
