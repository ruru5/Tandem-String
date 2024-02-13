import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Alert({
  message,
  color,
}: {
  message: string;
  color: string;
}) {
  return (
    <div
      className={classNames(
        [`rounded-md p-4`],
        color == "red" ? `bg-red-300` : `bg-green-200`
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {color == "red" && (
            <XMarkIcon
              className={classNames([`h-5 w-5 text-red-400`])}
              aria-hidden="true"
            />
          )}
          {color == "green" && (
            <CheckCircleIcon
              className={classNames([`h-5 w-5 text-green-400`])}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <p className={classNames([`text-sm font-medium text-black-800`])}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
