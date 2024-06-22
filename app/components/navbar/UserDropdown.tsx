import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Session } from "@supabase/supabase-js";
import { FiHome, FiLogOut, FiShoppingCart, FiUser } from "react-icons/fi";
import { getInitialsFromEmail } from "../../utils";

interface UserDropdownProps {
  userSession: Session;
  handleSignOut: () => Promise<void>;
}

const UserDropdown = ({ userSession, handleSignOut }: UserDropdownProps) => {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
        {userSession.user.email ? (
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {getInitialsFromEmail(userSession.user.email)}
          </span>
        ) : (
          <svg
            className="size-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </MenuButton>
      <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="p-1 ">
          <MenuItem>
            {({ focus }) => (
              <a
                href="/dashboard"
                className={`${
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } group flex w-full items-center rounded-md p-2 text-sm`}
              >
                <FiHome className="mr-2 size-5" aria-hidden="true" />
                Dashboard
              </a>
            )}
          </MenuItem>

          <MenuItem>
            {({ focus }) => (
              <a
                href="/auth/profile"
                className={`${
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } group flex w-full items-center rounded-md p-2 text-sm`}
              >
                <FiUser className="mr-2 size-5" aria-hidden="true" />
                Profile
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="/payment/cart"
                className={`${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } group flex w-full items-center rounded-md p-2 text-sm`}
              >
                <FiShoppingCart className="mr-2 size-5" aria-hidden="true" />
                Cart
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={handleSignOut}
                className={`${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } group flex w-full items-center rounded-md p-2 text-sm`}
              >
                <FiLogOut className="mr-2 size-5" aria-hidden="true" />
                Logout
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default UserDropdown;
