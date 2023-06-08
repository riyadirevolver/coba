import Image from "next/image";
import photo from "../../../assets/images/users/3.jpg";

const IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

export const UserImage = ({ path }) => {
  return (
    <>
      <Image
        onLoad={() => <>loading</>}
        src={`${IMAGE_URL}/${path}` ?? photo}
        alt="user"
        // layout="responsive"
        objectFit="cover"
        width={"80px"}
        height={"80px"}
        className="roundedCircle"
      />
    </>
  );
};
