import Link from "next/link";
import Image from "next/image";
import {OrganizationSwitcher, SignedIn, SignOutButton} from "@clerk/nextjs";
import {dark} from "@clerk/themes";

function Topbar() {
    const isUserLoggedIn = true;
    return (
        <nav className={"topbar"}>
            <Link href={"/"} className={"flex items-center gap-4"}>
                <Image  src={"/logo.svg"} alt={"logo"} width={28} height={28} />
                <p className={"text-heading-3-bold text-light-1 max-xs:hidden"}>Threads</p>

            </Link>
            <div className={"flex items-center gap-1"}>
                 <div className={"block md:hidden"}>

                 </div>

                <OrganizationSwitcher
                    appearance={{
                        baseTheme:dark,
                        elements : {
                        organizationSwitcherTrigger: "py-2 px-4"
                        }
                    }}
                />

            </div>

        </nav>
    )
}

export default Topbar;
