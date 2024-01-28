import { toast } from "react-toastify";
const notify = (message) => {
  toast.error(message);
};

export default notify;
