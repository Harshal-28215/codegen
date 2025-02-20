import Image from "next/image"
  
  export function AvatarDemo({ image }: { image: string }) {
    
    return (
      <Image className="rounded-full" src={image} alt="User" width={50} height={50}/>
    )
  }

  