import { ElNotification } from "element-plus";
import type { NotificationParams } from "element-plus";

export const handleError = (
  msg: unknown,
  type: "error" | "warning" | "info" = "error",
) => {
  const options: NotificationParams = {
    message: String(msg),
    type: type,
    duration: 3000,
  };
  ElNotification(options);
};
