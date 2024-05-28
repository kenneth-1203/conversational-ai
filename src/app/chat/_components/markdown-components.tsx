import React from "react";
import { Components } from "react-markdown";

export const markdownComponents: Components = {
  h1: ({ children }: any) => (
    <h1 className="font-semibold text-4xl pb-2 mb-8 mt-4 border-b">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="font-semibold text-2xl pb-2 mb-4 mt-8 border-b">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="font-semibold text-xl pb-2 mb-2 mt-4 border-b">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => <h4 className="mb-2 mt-4">{children}</h4>,
  h5: ({ children }: any) => <h5 className="font-semibold">{children}</h5>,
  ul: ({ children }: any) => (
    <ul className="list-disc ml-4 my-5">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal ml-4 my-5">{children}</ol>
  ),
  table: ({ children }: any) => (
    <table className="border-spacing-0 my-1 w-full text-sm rounded-md border-separate">
      {children}
    </table>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-zinc-500/20">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="rounded-b-md">{children}</tbody>
  ),
  th: ({ children }: any) => (
    <th className="py-1 px-3 text-start border border-r-0 first:rounded-tl-md last:border-r last:rounded-tr-md border-foreground">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="py-1 px-3 border border-r-0 border-t-0 last:border-r border-foreground">
      {children}
    </td>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-2 border-foreground/20 leading-6 py-2 pl-4">
      {children}
    </blockquote>
  ),
  p: ({ children }: any) => <p className="my-5">{children}</p>,
  a: ({ children, href }: any) => (
    <a href={href} target="_blank" className="text-sky-500 cursor-pointer">
      {children}
    </a>
  ),
};
