import { MailIcon } from "@heroicons/react/solid";
import Button from "components/Button";
import FormInput from "components/FormInput";
import Plate from "components/Plate";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import useShowCode from "utils/showCode";
import { useRouter } from "next/router";
import { useAuth } from "hooks/auth";
import { useSendLoginCode } from "hooks/auth";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import StyledGroup from "components/StyledGroup";
import Link from "next/link";

export default function Home(): JSX.Element {
  useAuth(false);

  const { t } = useTranslation();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm();
  const showCode = useShowCode();
  const router = useRouter();
  const [sendLoginCode, sendingCode] = useSendLoginCode();

  return (
    <>
      <Plate className="max-w-sm py-5">
        <Head>
          <title>Rays ansökningsportal</title>
        </Head>
        <div className="h-24 relative">
          <Image src="/rays.png" layout="fill" objectFit="contain" alt="Rays" />
        </div>
        <form
          className="w-full py-8"
          onSubmit={handleSubmit(
            async ({ email }) =>
              await sendLoginCode(email)
                .then((res) => {
                  console.log(res);
                  router.push(`/login/${btoa(email)}`);
                  res && showCode(res as string);
                })
                .catch((err) => {
                  if (err.status == "FETCH_ERROR")
                    setError("dummy", { message: "Network error." });
                  else
                    setError("email", {
                      type: "value",
                      message: err.data.errors[0].message,
                    });
                })
          )}
        >
          <StyledGroup controlId="form-email" style={{ marginTop: 50 }}>
            <FormControl
              type="email"
              placeholder="E-mail"
              autoFocus
              required
              {...register("email", {
                required: true,
              })}
              isInvalid={!!errors.email}
              disabled={isSubmitting}
            />
            <FormLabel>E-mail</FormLabel>
            <FormControl.Feedback type="invalid">
              {errors.email && t(errors.email.message)}
            </FormControl.Feedback>
          </StyledGroup>
          {/* <FormInput
            type="email"
            prependIcon={<MailIcon />}
            className="w-full"
            placeholder="Email"
            error={errors.email}
            disabled={isSubmitting}
            {...register("email")}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <label className="text-red-600">{message}</label>
            )}
          />
          <ErrorMessage
            errors={errors}
            name="dummy"
            render={({ message }) => (
              <label className="text-red-600">{message}</label>
            )}
          /> */}
          <Button className="mt-8" disabled={isSubmitting}>
            Sign in
          </Button>
        </form>
      </Plate>
      <Plate className="max-w-sm mt-6">
        <span>
          No account?{" "}
          <Link href="/register">
            <a>Register here!</a>
          </Link>
        </span>
      </Plate>
    </>
  );
}
