import CopyLoginCode from "components/CopyLoginCode";
import React from "react";
import { toast } from "react-toastify";

export default function useShowCode(): (code: string) => React.ReactText {
  const toastId = React.useRef<React.ReactText>(null);
  const update = () =>
    toast.update(toastId.current as string, {
      autoClose: 5000,
    });
  const notify = (code: string) =>
    ((toastId.current as React.ReactText) = toast(
      <CopyLoginCode code={code} onCopy={update} />,
      {
        position: "bottom-center",
        autoClose: false,
        closeOnClick: false,
      }
    ));
  return (code: string) => notify(code);
}
