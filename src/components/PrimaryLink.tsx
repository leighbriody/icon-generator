import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";

export function PrimaryLink(props: LinkProps & { children: ReactNode }) {
  return (
    <Link className="text-black-500 hover:text-blue-700" {...props}>
      {props.children}
    </Link>
  );
}
