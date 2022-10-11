import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IAlertProps {
  errorMessage: string | undefined;
  type: "success" | "info" | "error" | "warning";
}

export default function Alert({ errorMessage, type }: IAlertProps) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setHide(true);
    }, 10000);
    return () => clearInterval(timeout);
  }, []);

  return (
    <motion.div
      animate={{ x: 50 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={` fixed w-1/4 right-24 top-5 alert alert-${type} shadow-lg ${
        hide ? "hidden" : ""
      }`}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => setHide(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{errorMessage || "something went wrong"}</span>
      </div>
    </motion.div>
  );
}
