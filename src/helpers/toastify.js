import { toast } from "react-toastify";
const notify = (message, type) => {
  if (type == "error") {
    toast.error(message,{
      theme : "dark"
    });
  } else {
    toast.warning(message,{
      theme : "dark"
    });
  }
};

export default notify;
