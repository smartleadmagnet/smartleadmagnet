"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";

type MagicLinkFormProps = {
  id: string;
  callbackUrl: string;
  buttonTitle: string;
  buttonClass: string;
  inputClass: string;
  placeholder?: string;
};

type EnterEmailProps = {
  id: string;
  onSuccess: (email: string) => void;
  buttonTitle: string;
  buttonClass: string;
  inputClass: string;
  placeholder?: string;
};

const emailFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type EmailFormValues = z.infer<typeof emailFormSchema>;

const EnterEmail: React.FC<EnterEmailProps> = ({
  buttonTitle,
  buttonClass,
  inputClass,
  placeholder = "Email address",
  onSuccess,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
  });

  const onSubmit = async (data: EmailFormValues) => {
    try {
      const res = await signIn("email-code", { email: data.email, redirect: false });
      console.log({ res });
      if (res?.error) {
        if (res?.url) {
          router.replace(res.url);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: res.error,
          });
          router.replace(`/login?error=${encodeURIComponent(res.error)}`);
        }
      } else {
        toast({
          title: "Success",
          description: "Check your inbox (and spam folder)! Your SmartEReply login code is waiting.",
        });
        onSuccess(data.email);
      }
    } catch (e) {
      setLoading(false);
      // @ts-ignore
      setError(e?.message || "An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder={placeholder} className={inputClass} />
        {(errors?.email || error) && <p>{errors?.email?.message || error}</p>}
        <button className={buttonClass} disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <svg
                className="-ml-2 size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">{buttonTitle}</span>
            </>
          )}
        </button>
        <h3 className="mt-5 max-w-[250px] text-base">
          SmartLeadMagnet will email you a code to create your account or login to your existing account.
        </h3>
      </form>
    </div>
  );
};

type VerifyCodeProps = {
  callbackUrl: string;
  email: string;
  buttonClass: string;
  inputClass: string;
  onError: () => void;
};

const loginCodeFormSchema = z.object({
  code: z.string().min(5, "Code must be at least 5 characters"),
});

export type LoginCodeFormValues = z.infer<typeof loginCodeFormSchema>;

const VerifyCode: React.FC<VerifyCodeProps> = ({ email, onError, buttonClass, inputClass, callbackUrl }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCodeFormValues>({
    resolver: zodResolver(loginCodeFormSchema),
  });

  const onSubmit = async (data: LoginCodeFormValues) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/auth/callback/email-code?email=${encodeURIComponent(email)}&token=${encodeURIComponent(
          data.code
        )}&callbackUrl=${encodeURIComponent(callbackUrl)}`
      );
      const redirectUrl = res.url;
      // this is hacky, but the alternative leads to a terrible UX of multiple reloads before we land on the user page
      if (redirectUrl.includes(callbackUrl)) {
        location.href = redirectUrl;
      } else {
        onError();
        toast({
          variant: "destructive",
          title: "Error",
          description: "This verification token has expired.",
        });
      }
    } catch (e) {
      setLoading(false);
      // @ts-ignore
      setError(e?.message || "An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("code")}
          placeholder="Verification code"
          autoComplete="one-time-code"
          className={inputClass}
        />
        {(errors?.code || error) && <p>Enter the valid code</p>}
        <button className={buttonClass} disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <svg
                className="-ml-2 size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">Verify</span>
            </>
          )}
        </button>
        <h3 className="mt-5 max-w-[250px] text-base">
          {"Enter the code you received in your email (and don't forget to check your "}
          <b>spam folder</b>).
        </h3>
      </form>
    </div>
  );
};

const MagicLinkForm: React.FC<MagicLinkFormProps> = ({
  id,
  callbackUrl,
  buttonTitle,
  buttonClass,
  inputClass,
  placeholder = "Email address",
}) => {
  const [verifyingEmail, setVerifyingEmail] = React.useState("");
  if (verifyingEmail) {
    return (
      <VerifyCode
        onError={() => setVerifyingEmail("")}
        email={verifyingEmail}
        callbackUrl={callbackUrl}
        inputClass={inputClass}
        buttonClass={buttonClass}
      />
    );
  }
  return (
    <EnterEmail
      id={id}
      onSuccess={(email) => setVerifyingEmail(email)}
      buttonTitle={buttonTitle}
      buttonClass={buttonClass}
      inputClass={inputClass}
      placeholder={placeholder}
    />
  );
};

export default MagicLinkForm;
