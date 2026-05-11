import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";

const EXTERNAL = /^(?:https?:)?\/\//i;
const PROTOCOLS = /^(?:mailto|tel):/i;

export function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href = "", children, ...rest } = props;

  if (EXTERNAL.test(href) || PROTOCOLS.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  );
}
