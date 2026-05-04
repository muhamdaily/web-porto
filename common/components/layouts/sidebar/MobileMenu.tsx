import { motion } from "framer-motion";

import { MENU_ITEMS } from "@/common/constants/menu";

import Breakline from "../../elements/Breakline";
import Copyright from "../../elements/Copyright";

import Menu from "./Menu";

const MobileMenu = () => {
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
  return (
    <motion.div
      className="mt-3 flex min-h-0 flex-1 flex-col overflow-y-auto pb-8"
      initial={{ y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Breakline />
        <Menu list={filteredMenu} />
      </div>
      <div className="mt-auto pt-6">
        <Breakline />
        <Copyright />
      </div>
    </motion.div>
  );
};

export default MobileMenu;
