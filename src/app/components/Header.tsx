// "use client";

// import { useEffect, useState } from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import Link from "next/link";
// import { Session } from "next-auth";

// function Header() {
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const sessionData = await getServerSession(authOptions);
//         setSession(sessionData); // Set the fetched session data
//       } catch (error) {
//         console.error("Error fetching session:", error);
//         setSession(null); // Handle error state if session cannot be fetched
//       }
//     };

//     fetchSession();
//   }, []);

//   console.log("Session:", session);

//   const logoutHandler = async () => {
//     // Implement logout logic here
//   };

//   return (
//     <Navbar expand="lg" variant="dark">
//       <Container>
//         <Navbar.Brand>RCE System</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto me-3">
//             {session?.user ? (
//               <>
//                 {/* Example Dropdown Menu */}
//                 {/* <NavDropdown title={session.user.username} id="username">
//                   <NavDropdown.Item onClick={logoutHandler}>
//                     Logout
//                   </NavDropdown.Item>
//                 </NavDropdown> */}
//               </>
//             ) : (
//               <Link href="/log-in">
//                 <span className="nav-link">Login</span>
//               </Link>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header;

// import Link from "next/link";
// import { HandMetal } from "lucide-react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { SignoutHandler } from "./SignoutHandler";

// const Navbar = async () => {
//   const session = await getServerSession(authOptions);
//   return (
//     <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
//       <div className="container flex items-center justify-between">
//         <Link href="/">
//           <HandMetal />
//         </Link>
//         {session?.user ? (
//           <SignoutHandler />
//         ) : (
//           <Link href="/sign-in">Sign in</Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

/** @format */
"use client";

import Image from "next/image";
import { useState } from "react";

// import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

// import todoImage from "@/assets/images/icon-todo.svg";
// import calendarImage from "@/assets/images/icon-calendar.svg";
// import remindersImage from "@/assets/images/icon-reminders.svg";
// import planningImage from "@/assets/images/icon-planning.svg";

import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
  iconImage?: string;
};

const navItems: NavItem[] = [
  {
    label: "Features",
    link: "#",
    children: [
      {
        label: "Todo list",
        link: "#",
      },
      {
        label: "Calendar",
        link: "#",
      },
      {
        label: "Reminders",
        link: "#",
      },
      {
        label: "Planning",
        link: "#",
      },
    ],
  },
  {
    label: "Questions",
    link: "#",
    children: [
      {
        label: "Solved Questions",
        link: "#",
      },
      {
        label: "Recent Interview Problems",
        link: "#",
      },
    ],
  },

  {
    label: "About",
    link: "#",
  },
];

export default function Navbar() {
  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenue] = useState(false);
  const router = useRouter();
  function openSideMenu() {
    setSideMenue(true);
  }
  function closeSideMenu() {
    setSideMenue(false);
  }

  const { data: session } = useSession();

  return (
    <div className="mx-auto flex  w-full max-w-7xl justify-between px-2 py-1 text-sm">
      {/* left side  */}
      <section ref={animationParent} className="flex items-center gap-10">
        {/* logo */}
        {/* <Image src={logo} alt=" logo" /> */}
        {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
        <div className="hidden md:flex items-center gap-4 transition-all">
          {navItems.map((d, i) => (
            <Link
              key={i}
              href={d.link ?? "#"}
              className="relative group  px-2 py-3 transition-all no-underline"
            >
              <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
                <span>{d.label}</span>
                {d.children && (
                  <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0" />
                )}
              </p>

              {/* dropdown */}
              {d.children && (
                <div className="absolute   right-0   top-10 hidden w-auto  flex-col gap-1   rounded-lg bg-white py-3 shadow-md  transition-all group-hover:flex ">
                  {d.children.map((ch, i) => (
                    <Link
                      key={i}
                      href={ch.link ?? "#"}
                      className=" flex cursor-pointer items-center  py-1 pl-6 pr-8  text-neutral-400 hover:text-black no-underline "
                    >
                      {/* image */}
                      {ch.iconImage && (
                        <Image src={ch.iconImage} alt="item-icon" />
                      )}
                      {/* item */}
                      <span className="whitespace-nowrap   pl-3 ">
                        {ch.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
        {/* navitems */}
      </section>

      {/* right side data */}
      {session?.user ? (
        <section className=" hidden md:flex   items-center gap-2 ">
          <button
            className="w-full  max-w-[200px]  rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90"
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/log-in`,
              })
            }
          >
            Signout
          </button>
        </section>
      ) : (
        <section className=" hidden md:flex   items-center gap-2 ">
          <button
            className="h-fit rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90"
            onClick={() => {
              router.push("/log-in");
            }}
          >
            Login
          </button>

          <button
            className="h-fit rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90"
            onClick={() => {
              router.push("/sign-up");
            }}
          >
            Register
          </button>
        </section>
      )}

      <FiMenu
        onClick={openSideMenu}
        className="cursor-pointer text-4xl md:hidden"
      />
    </div>
  );
}

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
      <div className=" h-full w-[65%] bg-white px-4 py-4">
        <section className="flex justify-end">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor-pointer text-4xl "
          />
        </section>
        <div className=" flex flex-col text-base  gap-2 transition-all">
          {navItems.map((d, i) => (
            <SingleNavItem
              key={i}
              label={d.label}
              iconImage={d.iconImage}
              link={d.link}
            >
              {d.children}
            </SingleNavItem>
          ))}
        </div>

        {session?.user ? (
          <section className="  flex  flex-col   gap-8  mt-4 items-center">
            <button
              className="w-full  max-w-[200px]  rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90"
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: `${window.location.origin}/log-in`,
                })
              }
            >
              Signout
            </button>
          </section>
        ) : (
          <section className="  flex  flex-col   gap-8  mt-4 items-center">
            <button
              className="w-full  max-w-[200px]  rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90"
              onClick={() => {
                router.push("/log-in");
                closeSideMenu();
              }}
            >
              Login
            </button>

            <button
              className="w-full  max-w-[200px]  rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90"
              onClick={() => {
                router.push("/sign-up");
                closeSideMenu();
              }}
            >
              Register
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

function SingleNavItem(d: NavItem) {
  const [animationParent] = useAutoAnimate();
  const [isItemOpen, setItem] = useState(false);

  function toggleItem() {
    return setItem(!isItemOpen);
  }

  return (
    <Link
      ref={animationParent}
      onClick={toggleItem}
      href={d.link ?? "#"}
      className="relative   px-2 py-3 transition-all no-underline"
    >
      <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
        <span>{d.label}</span>
        {d.children && (
          // rotate-180
          <IoIosArrowDown
            className={`text-xs transition-all  ${isItemOpen && " rotate-180"}`}
          />
        )}
      </p>

      {/* dropdown */}
      {isItemOpen && d.children && (
        <div className="  w-auto  flex-col gap-1   rounded-lg bg-white py-3   transition-all flex ">
          {d.children.map((ch, i) => (
            <Link
              key={i}
              href={ch.link ?? "#"}
              className=" flex cursor-pointer items-center  py-1 pl-6 pr-8  text-neutral-400 hover:text-black  no-underline"
            >
              {/* image */}
              {ch.iconImage && <Image src={ch.iconImage} alt="item-icon" />}
              {/* item */}
              <span className="whitespace-nowrap   pl-3 ">{ch.label}</span>
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
}
