import clsx from "clsx";

type PlateProps = {
  className?: string;
  title?: string;
};

const Plate: React.FC<PlateProps> = ({ title, children, className }) => (
  <div
    className={clsx(
      "rounded bg-white py-3 px-5 border shadow-sm w-full",
      className
    )}
  >
    {title && (
      <>
        <h1 className="text-center text-brand-600 text-4xl font-medium">
          {title}
        </h1>
        <hr />
      </>
    )}
    {children}
  </div>
);

export default Plate;
