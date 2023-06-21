import { useRouter } from "next/router";
import { useState } from "react";
import NextApi from "../../lib/services/next-api";

const useLogin = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    loading: false,
  });

  const handleLoading = (status) => {
    setState((prevState) => ({
      ...prevState,
      loading: status,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    handleLoading(true);

    const { target } = event;
    const { email, password } = target;

    const data = {
      email: email.value,
      password: password.value,
      strategy: "local",
    };

    try {
      const { data: res } = await NextApi().post(`/api/login`, data);
      setColor("success");
      setMessage("Berhasil login");
      setOpen(true);
      handleLoading(false);

      if (res.role === "client" || res.role === "client3") {
        return router.replace("/client/all");
      }

      if (res.isLeader) {
        return router.replace("/leader/all");
      }

      if (res.role === "admin") {
        return router.replace("/management/user");
      }

      handleLoading(false);
      setColor("error");
      setOpen(true);
      setMessage("Unauthorized");

      await NextApi().post("/api/logout");
      return;
    } catch (error) {
      handleLoading(false);
      setColor("error");
      setOpen(true);
      setMessage(
        error?.response?.data.message ?? "Terjadi kesalahan pada server"
      );
      return;
    }
  };

  return {
    loading: state.loading,
    handleLogin,
    color,
    message,
    open,
    setOpen,
  };
};

export default useLogin;
