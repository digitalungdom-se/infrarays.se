/* This example requires Tailwind CSS v2.0+ */
import Button from "components/Button";
import Link from "next/link";

export default function LoginBanner(): JSX.Element {
  return (
    <div className="bg-white border-t-2 shadow-md fixed w-full left-0 bottom-0 z-50">
      <div className="max-w-3xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <p className="ml-3 font-medium truncate">
              <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">
                Innan du kan ladda upp filer och skapa din ansökan behöver du
                logga in.
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link href="/login" passHref>
              <Button
              // className="bg-slate-200 border-slate-300 hover:bg-slate-200 focus:outline-slate-500"
              >
                Logga in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
