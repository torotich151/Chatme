import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Phone } from "lucide-react";

type Step = "login" | "forgot" | "otp" | "reset";

export function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    setStep("otp");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStep("reset");
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStep("login");
  };

  const handleOtpChange = (value: string, index: number) => {
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const Logo = () => (
    <div className="flex flex-col items-center mb-6">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E91E63] to-[#FF5722] flex items-center justify-center shadow-lg mb-3">
        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="0.5" fill="currentColor" strokeWidth="0" />
          <circle cx="12" cy="10" r="0.5" fill="currentColor" strokeWidth="0" />
          <circle cx="15" cy="10" r="0.5" fill="currentColor" strokeWidth="0" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent">
        ChatMe
      </h1>
      <p className="text-gray-500 text-sm mt-1">Share your moments. Connect with vibes.</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        <Logo />

        {/* LOGIN STEP */}
        {step === "login" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-1">Welcome Back!</h2>
            <p className="text-center text-gray-600 text-sm mb-6">Login to continue</p>
            <form onSubmit={handleLogin} className="space-y-4 mb-6">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setStep("forgot")}
                  className="text-sm font-semibold bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent"
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-semibold py-3.5 rounded-xl shadow-lg"
              >
                Login
              </button>
            </form>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <Link
              to="/signup"
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50"
            >
              <span className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent">
                Create New Account
              </span>
            </Link>
          </>
        )}

        {/* FORGOT PASSWORD STEP */}
        {step === "forgot" && (
          <>
            <button onClick={() => setStep("login")} className="flex items-center gap-2 text-gray-500 mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Login</span>
            </button>
            <h2 className="text-2xl font-bold text-center mb-1">Reset Password</h2>
            <p className="text-center text-gray-600 text-sm mb-6">
              Enter your phone number to receive an OTP
            </p>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-semibold py-3.5 rounded-xl shadow-lg disabled:opacity-70"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <button onClick={() => setStep("forgot")} className="flex items-center gap-2 text-gray-500 mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <h2 className="text-2xl font-bold text-center mb-1">Verify OTP</h2>
            <p className="text-center text-gray-600 text-sm mb-2">
              We sent a 6-digit code to
            </p>
            <p className="text-center font-semibold text-gray-800 mb-6">{phone}</p>
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    className="w-11 h-12 text-center text-xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#E91E63]"
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={otp.join("").length < 6 || loading}
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-semibold py-3.5 rounded-xl shadow-lg disabled:opacity-70"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Didn't receive it?{" "}
              <button
                onClick={() => handleSendOtp({ preventDefault: () => {} } as React.FormEvent)}
                className="font-semibold bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent"
              >
                Resend
              </button>
            </p>
          </>
        )}

        {/* RESET PASSWORD STEP */}
        {step === "reset" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-1">New Password</h2>
            <p className="text-center text-gray-600 text-sm mb-6">Choose a strong password</p>
            <form onSubmit={handleReset} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || newPassword.length < 6}
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-semibold py-3.5 rounded-xl shadow-lg disabled:opacity-70"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
