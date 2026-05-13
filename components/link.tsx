import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";

const EXTERNAL = /^(?:https?:)?\/\//i;
const PROTOCOLS = /^(?:mailto|tel):/i;

export function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href = "", children, className, ...rest } = props;
  const cls = ["prose-link", className].filter(Boolean).join(" ");

  if (EXTERNAL.test(href) || PROTOCOLS.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={cls} {...rest}>
      {children}
    </NextLink>
  );
}
