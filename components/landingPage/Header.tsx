import Link from "next/link";

import Image from "next/image";
import Button from "../common/Button";

const Header = () => {

  return (
    <div className="bg-lilacWhite w-full p-8 rounded-md shadow-md">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <Image src="/logo.png" width={120} height={120} alt="logo" />

        <div className="flex gap-6">
          <Button variant="primary"><Link href={"/auth/login"}>Login</Link></Button>
          <Button variant="secondary"><Link href={"/auth/register"}>Register</Link></Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
