import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthButton from "@/components/auth/AuthButton";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );

  const [loading, setLoading] =
    useState(false);

  const [timer, setTimer] =
    useState(60);

  const inputRefs = useRef<
    Array<HTMLInputElement | null>
  >([]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (
    index: number,
    value: string
  ) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (
      value &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const newOtp = [...otp];

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    inputRefs.current[
      Math.min(
        pasted.length,
        OTP_LENGTH
      ) - 1
    ]?.focus();
  };

  const resendOtp = () => {
    setTimer(60);

    console.log("Resend OTP");
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      alert("Please enter OTP.");
      return;
    }

    setLoading(true);

    try {
      console.log({
        otp: code,
      });

      // Backend Verify OTP

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      // navigate("/reset-password");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the 6-digit OTP sent to your email."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        <div className="flex justify-center gap-3">

          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              maxLength={1}
              inputMode="numeric"
              onPaste={handlePaste}
              onKeyDown={(e) =>
                handleKeyDown(index, e)
              }
              onChange={(e) =>
                handleChange(
                  index,
                  e.target.value
                )
              }
              className="h-16 w-14 rounded-2xl border border-slate-700 bg-slate-950 text-center text-2xl font-bold text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          ))}

        </div>
                {/* Verify Button */}

        <AuthButton loading={loading}>
          Verify OTP
        </AuthButton>

        {/* Resend OTP */}

        <div className="text-center">

          {timer > 0 ? (
            <p className="text-sm text-slate-400">
              Resend OTP in{" "}
              <span className="font-semibold text-white">
                {timer}s
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={resendOtp}
              className="font-semibold text-blue-500 transition hover:text-blue-400"
            >
              Resend OTP
            </button>
          )}

        </div>

        {/* Back */}

        <div className="text-center">

          <Link
            to="/login"
            className="font-semibold text-blue-500 transition hover:text-blue-400"
          >
            ← Back to Login
          </Link>

        </div>

        {/* Info */}

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">

          <h3 className="font-semibold text-white">
            OTP Verification
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Enter the verification code sent to your registered
            email address. The OTP is valid for a limited time.
          </p>

        </div>

      </form>

    </AuthLayout>
  );
};

export default VerifyOtp;