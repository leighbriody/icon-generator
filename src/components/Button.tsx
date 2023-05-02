import clsx from "clsx";
import { Spinner } from "./Spinner";

export function Button(
  props: React.ComponentPropsWithoutRef<"button"> & {
    variant?: "primary" | "secondary" | "credits";
    isLoading?: boolean;
  }
) {
  let color =
    (props.variant ?? "primary") === "primary"
      ? "bg-blue-600 hover:bg-blue-500 text-white"
      : "bg-gray-400 hover:bg-gray-500";

  color =
    props.variant === "credits"
      ? "bg-green-600 hover:bg-green-600 text-white"
      : "bg-blue-400 hover:bg-blue-400";
  return (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center gap-2 rounded px-4 py-2 disabled:bg-gray-600",
        color
      )}
    >
      {props.isLoading && <Spinner />}
      {props.children}
    </button>
  );
}
