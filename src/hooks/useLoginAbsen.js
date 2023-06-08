import { useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import BaseModal from "../components/modal/baseModal/BaseModal";
import { UAParser } from "ua-parser-js";

const useLoginAbsen = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    loading: false,
  });
  const [showOsModal, setShowOsModal] = useState(false);

  const handleLoading = (status) => {
    setState((prevState) => ({
      ...prevState,
      loading: status,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const device = window.navigator.userAgent;
    const parser = new UAParser(device);

    // if (parser.getOS().name !== "iOS") {
    //   setShowOsModal(true);
    //   return;
    // }

    handleLoading(true);
    setOpen(false);

    const { target } = event;
    const { email, password } = target;

    const data = {
      email: email.value,
      password: password.value,
      strategy: "local",
    };

    try {
      const { data: res } = await Axios.post("/api/login", data);
      if (res.role === "admin") {
        await Axios.post("/api/logout");
        handleLoading(false);
        setColor("error");
        setMessage("Unauthorized");
        setOpen(true);
        return;
      }
      setColor("success");
      setMessage("Berhasil login");
      setOpen(true);
      handleLoading(false);
      if (res.role === "client" || res.role === "client3") {
        return router.replace("/apps/client");
      }
      return router.replace("/apps/absent");
    } catch (error) {
      handleLoading(false);
      setColor("error");
      setMessage(
        error?.response?.data.message ?? "Terjadi kesalahan pada server"
      );
      setOpen(true);
      return;
    }
  };

  const closeOsModal = () => {
    setShowOsModal(false);
  };

  return {
    loading: state.loading,
    handleLogin,
    color,
    message,
    open,
    setOpen,
    showOsModal,
    closeOsModal,
  };
};

export default useLoginAbsen;
